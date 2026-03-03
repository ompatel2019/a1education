import { NextRequest, NextResponse } from "next/server";
import { submitHubSpotForm } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim().toLowerCase();
  const phone = (body.phone ?? "").toString().trim();
  const school = (body.school ?? "").toString().trim();
  const year = (body.year ?? "").toString().trim();
  const howDidYouFindUs = (body.howDidYouFindUs ?? "").toString().trim();
  const otherSource = (body.otherSource ?? "").toString().trim();
  const whoReferredYou = (body.whoReferredYou ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();
  const pageUri = (body.pageUri ?? "").toString().trim();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required for HubSpot submission." },
      { status: 400 }
    );
  }

  await submitHubSpotForm({
    formIdEnvKey: "HUBSPOT_CONTACT_FORM_ID",
    fields: [
      { name: "email", value: email },
      { name: "firstname", value: name },
      { name: "phone", value: phone },
      { name: "school", value: school },
      { name: "year_level", value: year },
      { name: "how_did_you_find_us", value: howDidYouFindUs },
      { name: "other_source", value: otherSource },
      { name: "who_referred_you", value: whoReferredYou },
      { name: "message", value: message },
    ],
    context: {
      pageUri,
      pageName: "A1 Education Contact Form",
    },
  });

  return NextResponse.json({ success: true });
}

