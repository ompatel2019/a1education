import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

function sanitizeInput(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      subject,
      preview_text,
      sender_name,
      reply_to_email,
      message_body,
      send_immediately = false,
      scheduled_at,
    } = body;

    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedPreviewText = sanitizeInput(preview_text);
    const sanitizedSenderName = sanitizeInput(sender_name);
    const sanitizedReplyToEmail = sanitizeInput(reply_to_email);
    const sanitizedMessageBody = sanitizeInput(message_body);

    if (!sanitizedSubject || !sanitizedSenderName || !sanitizedReplyToEmail || !sanitizedMessageBody) {
      return NextResponse.json(
        { error: "Subject, sender name, reply-to email, and message body are required." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get all subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("email_marketing_submissions")
      .select("email, name");

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      return NextResponse.json(
        { error: "Failed to fetch subscribers." },
        { status: 500 }
      );
    }

    const recipientsCount = subscribers?.length || 0;

    // Create campaign record
    const campaignData = {
      subject: sanitizedSubject,
      preview_text: sanitizedPreviewText,
      sender_name: sanitizedSenderName,
      reply_to_email: sanitizedReplyToEmail,
      message_body: sanitizedMessageBody,
      recipients_count: recipientsCount,
      status: send_immediately ? "sent" : (scheduled_at ? "scheduled" : "draft"),
      scheduled_at: scheduled_at || null,
      sent_at: send_immediately ? new Date().toISOString() : null,
    };

    const { data: campaign, error: campaignError } = await supabase
      .from("email_campaigns")
      .insert(campaignData)
      .select()
      .single();

    if (campaignError) {
      console.error("Error creating campaign:", campaignError);
      return NextResponse.json(
        { error: "Failed to create campaign." },
        { status: 500 }
      );
    }

    // Send emails immediately if requested
    if (send_immediately && subscribers && subscribers.length > 0) {
      if (!resendClient) {
        return NextResponse.json(
          { error: "Email service not configured" },
          { status: 500 }
        );
      }

      try {
        // Send emails in batches to avoid rate limits
        const batchSize = 50;
        for (let i = 0; i < subscribers.length; i += batchSize) {
          const batch = subscribers.slice(i, i + batchSize);
          
          await Promise.all(
            batch.map(async (subscriber) => {
              const unsubscribeLink = `${process.env.SITE_URL || 'http://localhost:3000'}/u?email=${encodeURIComponent(subscriber.email)}&name=${encodeURIComponent(subscriber.name || '')}`;
              
              return resendClient.emails.send({
                from: `${sanitizedSenderName} <${process.env.EMAIL_FROM}>`,
                to: subscriber.email,
                replyTo: sanitizedReplyToEmail,
                subject: sanitizedSubject,
                html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding:32px 48px;">
        <div style="white-space:pre-line;color:#1f2937;font-size:15px;line-height:24px;">
${sanitizedMessageBody}
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 48px;border-top:1px solid #f3f4f6;background:#ffffff;">
        <p style="margin:0 0 8px;font-size:11px;line-height:16px;color:#9ca3af;">
          <span style="font-weight:600;">A1 EDUCATION</span> · 4/30 Campbell Street, Blacktown NSW 2148<br/>
          ${sanitizedReplyToEmail}
        </p>
        <p style="margin:0;font-size:11px;line-height:16px;color:#9ca3af;">
          You're receiving this email because you signed up for A1 Education updates.
        </p>
        <p style="margin:12px 0 0;font-size:11px;">
          <a href="${unsubscribeLink}" style="display:inline-block;padding:6px 12px;background:#eff6ff;color:#4f46e5;text-decoration:none;border-radius:9999px;font-weight:500;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
                `,
              });
            })
          );
        }
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Campaign is created but emails failed
        return NextResponse.json(
          { 
            success: true, 
            campaign, 
            warning: "Campaign created but some emails failed to send." 
          },
          { status: 207 }
        );
      }
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error("Unexpected error in POST /api/admin/email-campaigns:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data: campaigns, error } = await supabase
      .from("email_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching campaigns:", error);
      return NextResponse.json(
        { error: "Failed to fetch campaigns." },
        { status: 500 }
      );
    }

    return NextResponse.json({ campaigns: campaigns || [] });
  } catch (error) {
    console.error("Unexpected error in GET /api/admin/email-campaigns:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
