import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { normalizeBlogPayload } from "../utils";
import { sendPublishNotificationIfNeeded } from "../notify";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const blogId = Number(id);

  if (!Number.isFinite(blogId)) {
    return NextResponse.json({ error: "Invalid blog id." }, { status: 400 });
  }

  try {
    const raw = await request.json();
    const payload = normalizeBlogPayload(raw);

    const supabase = createServiceClient();

    // Fetch current draft state to detect publish transition
    const { data: existing, error: existingError } = await supabase
      .from("blogs")
      .select("draft")
      .eq("id", blogId)
      .maybeSingle();

    if (existingError) {
      console.error("Failed to load existing blog for update:", existingError);
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("blogs")
      .update(payload)
      .eq("id", blogId)
      .select("*")
      .single();

    if (error) {
      console.error("Failed to update blog:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Send notification only on first publish (draft -> published)
    const wasDraft = existing?.draft ?? true;
    if (wasDraft && data && !data.draft) {
      try {
        await sendPublishNotificationIfNeeded(data);
      } catch (notifyError) {
        console.error("Blog publish notification error (update):", notifyError);
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected blog update error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const blogId = Number(id);

  if (!Number.isFinite(blogId)) {
    return NextResponse.json({ error: "Invalid blog id." }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", blogId);

    if (error) {
      console.error("Failed to delete blog:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Unexpected blog delete error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
