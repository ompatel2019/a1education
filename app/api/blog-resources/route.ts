import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { sendResourcesEmail } from "@/lib/email/resources";
import { sendWelcomeEmail } from "@/lib/email/welcome";

function sanitizeInput(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const { name, email, slug, newsletter } = await request.json();
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  const sanitizedSlug = sanitizeInput(slug);

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Service not configured." },
      { status: 500 }
    );
  }

  if (!sanitizedName || !sanitizedEmail || !sanitizedSlug) {
    return NextResponse.json(
      { error: "Name, email, and blog slug are required." },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();

    // 1. Fetch Blog Details
    const { data: blog, error: blogError } = await supabase
      .from("blogs")
      .select("blog_header, blog_downloadables")
      .eq("slug", sanitizedSlug)
      .single();

    if (blogError || !blog) {
      console.error("Blog fetch error:", blogError);
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 }
      );
    }

    const resources = blog.blog_downloadables || [];
    if (!resources.length) {
      return NextResponse.json(
        { error: "No resources found for this blog." },
        { status: 404 }
      );
    }

    // 2. Send Resources Email (ALWAYS)
    const resourceEmailResult = await sendResourcesEmail({
      email: sanitizedEmail,
      name: sanitizedName,
      blogTitle: blog.blog_header,
      resources: resources,
    });

    if (!resourceEmailResult.success) {
      console.error("Failed to send resources email:", resourceEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send resources email." },
        { status: 500 }
      );
    }

    // 3. Handle Newsletter Subscription (CONDITIONAL)
    let newsletterResult = { success: true, message: "Skipped" };

    if (newsletter) {
      // Check if already subscribed
      const { data: existingUser } = await supabase
        .from("email_marketing_submissions")
        .select("id")
        .eq("email", sanitizedEmail)
        .single();

      if (!existingUser) {
        // Add to DB
        const { error: insertError } = await supabase
          .from("email_marketing_submissions")
          .insert({
            name: sanitizedName,
            email: sanitizedEmail,
            source: `Blog Resources: ${sanitizedSlug}`,
          });

        if (!insertError) {
          // Send Welcome Email
          await sendWelcomeEmail({
            email: sanitizedEmail,
            name: sanitizedName,
          });
          newsletterResult = { success: true, message: "Subscribed" };
        } else {
          console.error("Newsletter insert error:", insertError);
        }
      } else {
        newsletterResult = { success: true, message: "Already subscribed" };
      }
    }

    return NextResponse.json({
      success: true,
      message: "Resources sent!",
      newsletter: newsletterResult,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
