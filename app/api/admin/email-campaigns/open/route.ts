export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

const transparentPixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64");

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const idParam = searchParams.get("id") || searchParams.get("campaign_id");
  const campaignId = idParam ? Number(idParam) : NaN;

  if (!campaignId || Number.isNaN(campaignId)) {
    return NextResponse.json({ error: "Invalid campaign id" }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();

    const { data: campaign, error: fetchError } = await supabase
      .from("email_campaigns")
      .select("id, opens_count")
      .eq("id", campaignId)
      .single();

    if (fetchError || !campaign) {
      console.error("Open tracking: campaign not found", fetchError);
    } else {
      const nextCount = (campaign.opens_count || 0) + 1;
      const { error: updateError } = await supabase
        .from("email_campaigns")
        .update({ opens_count: nextCount })
        .eq("id", campaignId);

      if (updateError) {
        console.error("Open tracking: failed to increment", updateError);
      }
    }
  } catch (error) {
    console.error("Open tracking error:", error);
  }

  return new NextResponse(transparentPixel, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": transparentPixel.length.toString(),
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
