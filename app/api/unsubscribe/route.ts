import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { sendWelcomeEmail } from "@/lib/email/welcome";

function sanitizeInput(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const { email, name, action } = await request.json();
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  const sanitizedName = sanitizeInput(name);
  const sanitizedAction = sanitizeInput(action); // "unsubscribe" or "resubscribe"

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Service not configured." },
      { status: 500 }
    );
  }

  if (!sanitizedEmail) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();

    if (sanitizedAction === "unsubscribe") {
      const { error } = await supabase
        .from("email_marketing_submissions")
        .delete()
        .eq("email", sanitizedEmail);

      if (error) {
        console.error("Unsubscribe error:", error);
        return NextResponse.json(
          { error: "Failed to unsubscribe." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Unsubscribed successfully.",
      });
    } else if (sanitizedAction === "resubscribe") {
      // Check if already exists first
      const { data: existingUser } = await supabase
        .from("email_marketing_submissions")
        .select("id")
        .eq("email", sanitizedEmail)
        .single();

      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("email_marketing_submissions")
          .insert({
            email: sanitizedEmail,
            source: "Resubscribed",
            name: sanitizedName || "",
          });

        if (insertError) {
          console.error("Resubscribe error:", insertError);
          return NextResponse.json(
            { error: "Failed to resubscribe." },
            { status: 500 }
          );
        }

        // Send Welcome Email
        await sendWelcomeEmail({
          email: sanitizedEmail,
          name: sanitizedName || "",
        });
      }

      return NextResponse.json({
        success: true,
        message: "Resubscribed successfully.",
      });
    } else {
      return NextResponse.json(
        { error: "Invalid action." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
