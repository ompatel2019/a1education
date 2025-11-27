import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { sendWelcomeEmail } from "@/lib/email/welcome";

function sanitizeInput(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const { name, email, source } = await request.json();
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  const submissionSource = sanitizeInput(source) || "Inquiry";

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("SUPABASE_SERVICE_ROLE_KEY environment variable is not set");
    return NextResponse.json(
      { error: "Newsletter service is not configured." },
      { status: 500 }
    );
  }

  if (!sanitizedName || !sanitizedEmail) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();

    // 1. Check if email already exists
    const { data: existingUser } = await supabase
      .from("email_marketing_submissions")
      .select("id")
      .eq("email", sanitizedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "This email is already subscribed. Thanks for staying with us!",
        duplicate: true,
      });
    }

    // 2. If not exists, insert new record
    const { data, error } = await supabase
      .from("email_marketing_submissions")
      .insert({
        name: sanitizedName,
        email: sanitizedEmail,
        source: submissionSource,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        // Fallback for race conditions if DB has unique constraint
        return NextResponse.json(
          {
            success: true,
            message: "This email is already subscribed. Thanks for staying with us!",
            duplicate: true,
          },
          { status: 200 } // Return 200 to not break the frontend flow
        );
      }

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save subscription." },
        { status: 500 }
      );
    }

    const emailResult = await sendWelcomeEmail({
      email: sanitizedEmail,
      name: sanitizedName,
    });

    if (!emailResult.success) {
      console.error("Welcome email failed:", emailResult.error, emailResult.details);
    }

    return NextResponse.json({
      success: true,
      data,
      emailSent: emailResult.success,
      message: emailResult.success
        ? "Thank you for subscribing! Check your inbox for a welcome message."
        : "Thanks for subscribing! We could not send the welcome email right now, but your details have been saved.",
    });
  } catch (error) {
    console.error("Unexpected newsletter submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
