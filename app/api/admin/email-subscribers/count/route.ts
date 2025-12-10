import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { count, error } = await supabase
      .from("email_marketing_submissions")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Failed to count subscribers:", error);
      return NextResponse.json(
        { error: "Failed to fetch subscriber count." },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch (error) {
    console.error("Unexpected error fetching subscriber count:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
