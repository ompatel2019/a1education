import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { slugify } from "@/lib/utils/slug";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawSlug = searchParams.get("slug") ?? "";
    const excludeIdParam = searchParams.get("excludeId");
    const normalizedSlug = slugify(rawSlug);

    if (!normalizedSlug) {
      return NextResponse.json(
        { error: "A slug value is required." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    let query = supabase
      .from("blogs")
      .select("id")
      .eq("slug", normalizedSlug)
      .limit(1);

    const excludeId = excludeIdParam
      ? Number.parseInt(excludeIdParam, 10)
      : null;

    if (excludeId !== null && !Number.isNaN(excludeId)) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Slug availability lookup failed:", error);
      return NextResponse.json(
        { error: "Unable to verify slug availability." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: {
        slug: normalizedSlug,
        available: !data,
      },
    });
  } catch (error) {
    console.error("Unexpected slug availability error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
