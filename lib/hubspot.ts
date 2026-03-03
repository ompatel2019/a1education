type HubSpotField = {
  name: string;
  value: string;
};

type HubSpotContext = {
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
};

type SubmitHubSpotParams = {
  /**
   * Name of the env var that contains the HubSpot form GUID,
   * e.g. "HUBSPOT_CONTACT_FORM_ID" or "HUBSPOT_NEWSLETTER_FORM_ID".
   */
  formIdEnvKey: string;
  fields: HubSpotField[];
  context?: HubSpotContext;
};

export async function submitHubSpotForm({
  formIdEnvKey,
  fields,
  context,
}: SubmitHubSpotParams) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const privateToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  const formId = process.env[formIdEnvKey];

  if (!portalId || !privateToken || !formId) {
    console.warn(
      "HubSpot submission skipped: HUBSPOT_PORTAL_ID, HUBSPOT_PRIVATE_APP_TOKEN, or form ID env var is missing."
    );
    return;
  }

  const cleanedFields = fields
    .filter((field) => typeof field.value === "string" && field.value.trim() !== "")
    .map((field) => ({
      name: field.name,
      value: field.value.trim(),
    }));

  if (cleanedFields.length === 0) {
    console.warn("HubSpot submission skipped: no fields with values provided.");
    return;
  }

  const payload: Record<string, unknown> = {
    fields: cleanedFields,
  };

  if (context && (context.pageName || context.pageUri || context.ipAddress)) {
    payload.context = {
      pageUri: context.pageUri,
      pageName: context.pageName,
      ipAddress: context.ipAddress,
    };
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${privateToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("HubSpot form submission failed:", response.status, text);
    }
  } catch (error) {
    console.error("HubSpot form submission error:", error);
  }
}

