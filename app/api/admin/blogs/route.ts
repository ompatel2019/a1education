import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { normalizeBlogPayload } from "./utils";
import { sendPublishNotificationIfNeeded } from "./notify";

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const payload = normalizeBlogPayload(raw);

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("blogs")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("Failed to insert blog:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Fire blog publish notification if this is a published post
    let notification: unknown = null;
    try {
      if (!data.draft) {
        notification = await sendPublishNotificationIfNeeded(data);
      }
    } catch (notifyError) {
      console.error("Blog publish notification error (create):", notifyError);
    }

    return NextResponse.json({ data, notification });
  } catch (error) {
    console.error("Unexpected blog create error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
