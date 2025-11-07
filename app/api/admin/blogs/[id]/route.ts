import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { normalizeBlogPayload } from "../utils";

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

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected blog update error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
