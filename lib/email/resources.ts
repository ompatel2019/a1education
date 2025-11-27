import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFromAddress = process.env.EMAIL_FROM;

const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

interface Resource {
  title: string;
  asset_url: string;
}

interface ResourcesEmailPayload {
  email: string;
  name: string;
  blogTitle: string;
  resources: Resource[];
}

export async function sendResourcesEmail({
  email,
  name,
  blogTitle,
  resources,
}: ResourcesEmailPayload): Promise<
  | { success: true; data: unknown }
  | { success: false; error: string; details?: unknown }
> {
  if (!resendClient || !emailFromAddress) {
    console.error("Email service not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const attachments = resources.map((r) => {
      // Extract extension from URL (ignoring query params)
      const urlPath = r.asset_url.split("?")[0];
      const extension = urlPath.split(".").pop();
      
      let filename = r.title;
      // If title doesn't already have the extension, append it
      if (extension && extension.length < 5 && !filename.toLowerCase().endsWith(`.${extension.toLowerCase()}`)) {
        filename = `${filename}.${extension}`;
      }

      return {
        filename: filename,
        path: r.asset_url,
      };
    });

    const { data, error } = await resendClient.emails.send({
      from: emailFromAddress,
      to: [email],
      subject: `${blogTitle} resources ready to download`,
      attachments: attachments,
      html: `
        <div style="background-color:#f5f7ff;padding:32px 0;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:32px;overflow:hidden;box-shadow:0 30px 60px rgba(70,104,247,0.18);">
                  <tr>
                    <td style="padding:48px 48px 36px;background:linear-gradient(135deg,#6366f1,#818cf8);color:#ffffff;">
                      <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;font-weight:700;">Resource Delivery</p>
                      <h1 style="margin:16px 0 0;font-size:32px;line-height:40px;font-weight:700;">
                        ${blogTitle} - A1 Education ready to download
                      </h1>
                      <p style="margin:12px 0 0;font-size:14px;opacity:0.9;">
                        HSC Economics 2025 Solutions Released
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px 48px;">
                      <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:#1f2937;">
                        Hi ${name || "there"},
                      </p>
                      <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:#4b5563;">
                        You unlocked <strong>${blogTitle} - A1 Education</strong> from HSC Economics 2025 Solutions Released. We've attached every supporting file so you can revisit the lesson whenever you like.
                      </p>
                      <p style="margin:0 0 32px;font-size:16px;line-height:26px;color:#4b5563;">
                        The files are attached below—save them so you always have the playbook handy.
                      </p>

                      <div style="background:#f9fafb;border-radius:16px;padding:24px;border:1px solid #e5e7eb;margin-bottom:32px;">
                        <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#111827;text-transform:uppercase;letter-spacing:0.05em;">Included resources</p>
                        <ul style="margin:0;padding:0;list-style:none;">
                          ${resources
                            .map(
                              (resource) => `
                            <li style="margin-bottom:12px;padding-left:20px;position:relative;">
                              <span style="position:absolute;left:0;top:8px;width:6px;height:6px;background:#6366f1;border-radius:50%;"></span>
                              <span style="color:#4b5563;font-size:15px;line-height:24px;">
                                ${resource.title}
                              </span>
                            </li>
                          `
                            )
                            .join("")}
                        </ul>
                      </div>

                      <p style="margin:0 0 32px;font-size:15px;line-height:24px;color:#6b7280;">
                        Need help applying them? Reply to this email and we'll guide you.
                      </p>

                      <p style="margin:0 0 8px;font-size:16px;line-height:26px;color:#111827;">
                        Enjoy!
                      </p>
                      <p style="margin:0;font-size:16px;line-height:26px;color:#111827;font-weight:700;">
                        The A1 Education Team
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending resources email:", error);
      return { success: false, error: "Failed to send resources email", details: error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error sending resources email:", error);
    return { success: false, error: "Unexpected error", details: error };
  }
}
