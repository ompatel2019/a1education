import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { normalizeBlogPayload } from "./utils";

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

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected blog create error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
