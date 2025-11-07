import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

const selectFields =
  "id, slug, blog_header, blog_subheading, blog_hero, blog_tags, blog_text, blog_context, updated_at, draft";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("blogs")
      .select(selectFields)
      .eq("draft", false)
      .order("updated_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("Error fetching published posts:", error);
      return NextResponse.json({ error: "Failed to fetch current posts" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected published fetch error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
