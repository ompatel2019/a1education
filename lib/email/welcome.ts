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
                        Hello ${
                          name
                            ? `<span style="color:#ffe082;">${name}</span>`
                            : "there"
                        }, welcome to A1 Education
                      </h1>
                      <p style="margin:18px 0 0;font-size:16px;line-height:28px;max-width:420px;">
                        We&apos;re thrilled you&apos;re joining Sydney’s most dedicated HSC Economics community.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px 48px;">
                      <p style="margin:0 0 32px;font-size:16px;line-height:28px;color:#4b5563;">
                        Each week we send sharp insights, proven frameworks, and insider exam strategies designed to help you move confidently towards Band 6.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 32px;">
                        <tr>
                          <td style="vertical-align:top;padding:0 0 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7ff;border-radius:20px;padding:20px 24px;">
                              <tr>
                                <td width="42" style="vertical-align:top;padding-right:16px;">
                                  <table cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="width:42px;height:42px;border-radius:50%;background:#4668f7;text-align:center;vertical-align:middle;">
                                        <span style="font-size:20px;font-weight:600;color:#ffffff;line-height:42px;">1</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td style="vertical-align:top;">
                                  <h3 style="margin:0 0 6px;font-size:16px;font-weight:600;color:#111827;line-height:24px;">Weekly intel drops</h3>
                                  <p style="margin:0;font-size:14px;line-height:22px;color:#4b5563;">Advanced breakdowns of the latest economic data and how to weave it into top-tier responses.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top;padding:0 0 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7ff;border-radius:20px;padding:20px 24px;">
                              <tr>
                                <td width="42" style="vertical-align:top;padding-right:16px;">
                                  <table cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="width:42px;height:42px;border-radius:50%;background:#4668f7;text-align:center;vertical-align:middle;">
                                        <span style="font-size:20px;font-weight:600;color:#ffffff;line-height:42px;">2</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td style="vertical-align:top;">
                                  <h3 style="margin:0 0 6px;font-size:16px;font-weight:600;color:#111827;line-height:24px;">Exam craftsmanship</h3>
                                  <p style="margin:0;font-size:14px;line-height:22px;color:#4b5563;">Marking insights and writing blueprints used by our students to consistently secure Band 6.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="vertical-align:top;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7ff;border-radius:20px;padding:20px 24px;">
                              <tr>
                                <td width="42" style="vertical-align:top;padding-right:16px;">
                                  <table cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="width:42px;height:42px;border-radius:50%;background:#4668f7;text-align:center;vertical-align:middle;">
                                        <span style="font-size:20px;font-weight:600;color:#ffffff;line-height:42px;">3</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td style="vertical-align:top;">
                                  <h3 style="margin:0 0 6px;font-size:16px;font-weight:600;color:#111827;line-height:24px;">Premium resources</h3>
                                  <p style="margin:0;font-size:14px;line-height:22px;color:#4b5563;">Early access to masterclasses, curated practice sets, and invitation-only revision events.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 28px;background:linear-gradient(135deg,rgba(70,104,247,0.12),rgba(111,139,255,0.12));border-radius:20px;padding:24px;">
                        <tr>
                          <td>
                            <h3 style="margin:0 0 12px;font-size:18px;font-weight:600;color:#111827;line-height:28px;">Unlock your welcome bonus</h3>
                            <p style="margin:0 0 20px;font-size:15px;line-height:24px;color:#374151;">Start strong with our exclusive guide: <em style="font-style:italic;">"How top scorers structure a Band 6 Economics essay."</em></p>
                            <table cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="background:#4668f7;border-radius:16px;">
                                  <a href="https://a1education.com.au/resources/welcome-guide" style="display:inline-block;padding:14px 24px;border-radius:16px;background:#4668f7;color:#ffffff;font-weight:600;font-size:15px;text-decoration:none;line-height:20px;">Download your guide</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:0;font-size:14px;line-height:24px;color:#6b7280;">
                        If you didn’t sign up or have any questions, reply to this email and our team will take care of it.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 48px;background:#0f172a;color:#cbd5f5;">
                      <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#ffffff;">With you every step,<br/>The A1 Education Team</p>
                      <p style="margin:0;font-size:12px;line-height:20px;">A1 Education · Level 2, 11 York St, Sydney NSW 2000<br/>You’re receiving this email because you joined the A1 Education Economics community.</p>
                      <p style="margin:12px 0 0;font-size:12px;">
                        <a href="https://a1education.com.au/unsubscribe" style="color:#a5b4fc;text-decoration:none;">Unsubscribe</a> ·
                        <a href="https://a1education.com.au/privacy" style="color:#a5b4fc;text-decoration:none;">Privacy policy</a>
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
