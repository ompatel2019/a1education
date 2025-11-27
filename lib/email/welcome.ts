import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFromAddress = process.env.EMAIL_FROM;

const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

export function isEmailServiceConfigured() {
  return Boolean(resendClient && emailFromAddress);
}

interface WelcomeEmailPayload {
  email: string;
  name: string;
}

export async function sendWelcomeEmail({
  email,
  name,
}: WelcomeEmailPayload): Promise<
  | { success: true; data: unknown }
  | { success: false; error: string; details?: unknown }
> {
  if (!resendClient) {
    const errorMessage =
      "Email service not configured (missing RESEND_API_KEY)";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  if (!emailFromAddress) {
    const errorMessage = "Email service not configured (missing EMAIL_FROM)";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: emailFromAddress,
      to: [email],
      subject: "Welcome to A1 Education!",
      html: `
        <div style="background-color:#f5f7ff;padding:32px 0;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:32px;overflow:hidden;box-shadow:0 30px 60px rgba(70,104,247,0.18);">
                  <tr>
                    <td style="padding:48px 48px 36px;background:linear-gradient(135deg,#4e6cff,#6f8bff);color:#ffffff;">
                      <p style="margin:0;font-size:14px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.75;">Welcome aboard</p>
                      <h1 style="margin:16px 0 0;font-size:36px;line-height:44px;font-weight:700;">
                        Great to have you, ${
                          name
                            ? `<span style="color:#ffe082;">${name}</span>`
                            : "friend"
                        }
                      </h1>
                      <p style="margin:18px 0 0;font-size:16px;line-height:28px;max-width:420px;">
                        Maximise your HSC Economics potential with weekly insights.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px 48px;">
                      <div style="background:#eff6ff;border-radius:20px;padding:24px;margin-bottom:32px;border:1px solid #dbeafe;">
                         <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:#1e3a8a;">
                           Hi ${name || "there"},
                         </p>
                         <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:#1e3a8a;">
                           <span style="background:#fef3c7;padding:0 4px;font-weight:600;">Welcome</span> to Sydney's most dedicated HSC Economics community. Every class, template, and feedback loop we share is focused on helping you master the syllabus and walk into exams confident.
                         </p>
                         <p style="margin:0;font-size:16px;line-height:26px;color:#1e3a8a;font-weight:700;">
                           Here's what you can expect from us:
                         </p>
                      </div>

                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 32px;">
                        <tr>
                          <td style="vertical-align:top;padding:0 0 16px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-radius:20px;padding:20px 24px;border:1px solid #e2e8f0;">
                              <tr>
                                <td style="vertical-align:top;">
                                  <h3 style="margin:0 0 6px;font-size:16px;font-weight:700;color:#111827;line-height:24px;">Weekly intelligence drops</h3>
                                  <p style="margin:0;font-size:14px;line-height:22px;color:#4b5563;">Macro breakdowns, exam-ready data, and prompts to sharpen your real-world examples.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top;padding:0 0 16px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-radius:20px;padding:20px 24px;border:1px solid #e2e8f0;">
                              <tr>
                                <td style="vertical-align:top;">
                                  <h3 style="margin:0 0 6px;font-size:16px;font-weight:700;color:#111827;line-height:24px;">Marking-style feedback</h3>
                                  <p style="margin:0;font-size:14px;line-height:22px;color:#4b5563;">Step-by-step guidance on structure, analysis, and depth so every paragraph pushes towards Band 6.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-radius:20px;padding:20px 24px;border:1px solid #e2e8f0;">
                              <tr>
                                <td style="vertical-align:top;">
                                  <h3 style="margin:0 0 6px;font-size:16px;font-weight:700;color:#111827;line-height:24px;">Resources on tap</h3>
                                  <p style="margin:0;font-size:14px;line-height:22px;color:#4b5563;">Model essays, essay scaffolds, and drills prepared by ex-students and HSC markers.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin:0 0 32px;font-size:16px;line-height:26px;color:#4b5563;">
                        We’re excited to see what you’ll build with A1 Education this year.
                      </p>

                      <p style="margin:0 0 8px;font-size:16px;line-height:26px;color:#111827;">
                        Talk soon,
                      </p>
                      <p style="margin:0;font-size:16px;line-height:26px;color:#111827;font-weight:700;">
                        The A1 Education Team
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 48px;border-top:1px solid #e5e7eb;background:#ffffff;">
                      <p style="margin:0 0 8px;font-size:12px;line-height:20px;color:#6b7280;">A1 Education · 4/30 Campbell Street, Blacktown NSW 2148<br/>admin@a1education.com.au · 0402 097 284</p>
                      <p style="margin:0 0 16px;font-size:12px;line-height:20px;color:#6b7280;">You're receiving this email because you connected with the A1 Economics community.</p>
                      <p style="margin:0;font-size:12px;">
                        <a href="https://a1education.com.au/u?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name || '')}" style="display:inline-block;padding:8px 16px;background:#eff6ff;color:#4f46e5;text-decoration:none;border-radius:9999px;font-weight:500;">Unsubscribe</a>
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
      console.error("Error sending welcome email:", error);
      return {
        success: false,
        error: "Failed to send welcome email",
        details: error,
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error sending welcome email:", error);
    return {
      success: false,
      error: "Unexpected error occurred while sending email",
      details: error,
    };
  }
}
