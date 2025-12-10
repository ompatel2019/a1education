import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFromAddress = process.env.EMAIL_FROM;
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

type Subscriber = { email: string; name?: string | null };

export type BlogRecord = {
  id: number;
  slug: string;
  blog_header: string;
  blog_subheading?: string | null;
  blog_text?: string | unknown;
  blog_hero?: string | null;
};

type SendResult =
  | { success: true; data: unknown }
  | { success: false; error: string; details?: unknown };

const MAX_SNIPPET_LENGTH = 250;
const BATCH_SIZE = 50;

const buildSiteUrl = () =>
  (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeHtml = (value: string) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Escape for use inside HTML attributes without altering URL separators
const escapeAttributeUrl = (value: string) =>
  String(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const buildSnippet = (blog: BlogRecord) => {
  if (blog.blog_subheading?.trim()) {
    return blog.blog_subheading.trim().slice(0, MAX_SNIPPET_LENGTH);
  }

  if (typeof blog.blog_text === "string" && blog.blog_text.trim()) {
    return stripHtml(blog.blog_text).slice(0, MAX_SNIPPET_LENGTH);
  }

  return "";
};

const buildBlogUrl = (slug: string) => {
  const base = buildSiteUrl();
  return `${base}/blogs/${encodeURIComponent(
    slug
  )}?utm_source=blog_email&utm_medium=email&utm_campaign=blog_publish`;
};

const buildUnsubscribeUrl = (email: string, name?: string | null) => {
  const base = buildSiteUrl();
  const params = new URLSearchParams({
    email,
    name: name ?? "",
  });
  return `${base}/u?${params.toString()}`;
};

const buildFromAddress = (senderName: string) => {
  const fromConfig = emailFromAddress || "";
  const match = fromConfig.match(/<(.+)>/);
  const baseEmail = match ? match[1] : fromConfig;
  if (baseEmail) {
    return `${senderName} <${baseEmail}>`;
  }
  // Fallback: still send from config if no name
  return senderName;
};

export const buildEmailHtml = ({
  blogTitle,
  snippet,
  hero,
  ctaUrl,
  unsubscribeUrl,
  recipientName,
}: {
  blogTitle: string;
  snippet: string;
  hero?: string | null;
  ctaUrl: string;
  unsubscribeUrl: string;
  recipientName?: string | null;
}) => {
  const greeting = recipientName?.trim()
    ? `Hi ${escapeHtml(recipientName.trim())},`
    : "Hi there,";
  const safeSnippet = escapeHtml(
    snippet || "We just published a new blog post we think you’ll like."
  );
  const safeBlogTitle = escapeHtml(blogTitle);
  const safeHero = hero ? escapeAttributeUrl(hero) : null;
  const safeCtaUrl = escapeAttributeUrl(ctaUrl);
  const safeUnsubscribeUrl = escapeAttributeUrl(unsubscribeUrl);

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background:#f5f7ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" cellspacing="0" cellpadding="0" width="640" style="background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 20px 60px rgba(70,104,247,0.16);">
            <tr>
              <td style="padding:44px 44px 32px;background:linear-gradient(135deg,#4f46e5,#818cf8);color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.85;font-weight:700;">New blog</p>
                <h1 style="margin:14px 0 0;font-size:30px;line-height:38px;font-weight:700;">${safeBlogTitle}</h1>
              </td>
            </tr>
            ${
              safeHero
                ? `
            <tr>
              <td style="background:#111827;">
                <img src="${safeHero}" alt="${safeBlogTitle}" width="100%" style="display:block;max-height:320px;object-fit:cover;" />
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:40px 44px 10px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:26px;color:#1f2937;">${greeting}</p>
                <p style="margin:0 0 22px;font-size:16px;line-height:26px;color:#4b5563;">
                  ${safeSnippet}
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
                  <tr>
                    <td style="border-radius:9999px;overflow:hidden;">
                      <a href="${safeCtaUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 20px;font-weight:700;font-size:15px;border-radius:9999px;">
                        Read the full blog
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 12px;font-size:13px;line-height:22px;color:#9ca3af;">
                  You’re receiving this because you joined the A1 Education mailing list.
                </p>
                <p style="margin:0 0 26px;font-size:13px;line-height:22px;">
                  <a href="${safeUnsubscribeUrl}" style="color:#4f46e5;font-weight:600;text-decoration:none;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
};

export const sendBlogPublishEmail = async (
  blog: BlogRecord,
  subscriber: Subscriber
): Promise<SendResult> => {
  if (!resendClient || !emailFromAddress) {
    const error = "Email service not configured";
    console.error(error);
    return { success: false, error };
  }

  try {
    const blogUrl = buildBlogUrl(blog.slug);
    const snippet = buildSnippet(blog);
    const unsubscribeUrl = buildUnsubscribeUrl(
      subscriber.email,
      subscriber.name ?? null
    );
    const html = buildEmailHtml({
      blogTitle: blog.blog_header,
      snippet,
      hero: blog.blog_hero,
      ctaUrl: blogUrl,
      unsubscribeUrl,
      recipientName: subscriber.name ?? null,
    });

    const { data, error } = await resendClient.emails.send({
      from: buildFromAddress("A1 Education"),
      to: subscriber.email,
      subject: blog.blog_header,
      replyTo: emailFromAddress,
      html,
    });

    if (error) {
      console.error("Blog publish email send error:", error);
      return {
        success: false,
        error: "Failed to send blog publish email",
        details: error,
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected blog publish email error:", err);
    return {
      success: false,
      error: "Unexpected error sending blog publish email",
      details: err,
    };
  }
};

export const sendBlogPublishEmailsBatch = async (
  blog: BlogRecord,
  subscribers: Subscriber[]
) => {
  const results = { sent: 0, failed: 0 };
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (subscriber) => {
        const res = await sendBlogPublishEmail(blog, subscriber);
        if (res.success) {
          results.sent += 1;
        } else {
          results.failed += 1;
        }
      })
    );
  }
  return results;
};
