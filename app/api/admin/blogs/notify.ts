import { createServiceClient } from "@/lib/supabase/service";
import {
  BlogRecord,
  sendBlogPublishEmailsBatch,
} from "@/lib/email/blogPublish";

type BlogRow = BlogRecord & { draft?: boolean };

export const sendPublishNotificationIfNeeded = async (blog: BlogRow) => {
  if (blog.draft) {
    return { skipped: true, reason: "draft" as const };
  }

  const supabase = createServiceClient();

  // 1) Skip if already notified
  const { data: existingNotify, error: notifyCheckError } = await supabase
    .from("blog_notifications")
    .select("id, status")
    .eq("blog_id", blog.id)
    .maybeSingle();

  if (notifyCheckError) {
    console.error("blog_notifications check failed:", notifyCheckError);
    return { skipped: true, reason: "check_failed" as const };
  }

  if (existingNotify) {
    return { skipped: true, reason: "already_notified" as const };
  }

  // 2) Fetch subscribers
  const { data: subscribers, error: subsError } = await supabase
    .from("email_marketing_submissions")
    .select("email, name");

  if (subsError) {
    console.error("Failed to fetch subscribers for blog publish:", subsError);
    return { skipped: true, reason: "subscriber_fetch_failed" as const };
  }

  const subscribersList = subscribers ?? [];

  // 3) Send in batches
  const sendResult = await sendBlogPublishEmailsBatch(blog, subscribersList);

  // 4) Record notification attempt (sent or partial failure)
  const status = sendResult.failed === 0 ? "sent" : "failed";
  const errorMessage =
    sendResult.failed === 0
      ? null
      : `Sent ${sendResult.sent}, failed ${sendResult.failed}`;

  const { error: insertError } = await supabase
    .from("blog_notifications")
    .insert({
      blog_id: blog.id,
      status,
      error_message: errorMessage,
    });

  if (insertError) {
    console.error("Failed to record blog notification:", insertError);
  }

  return {
    skipped: false,
    sent: sendResult.sent,
    failed: sendResult.failed,
    status,
  };
};
