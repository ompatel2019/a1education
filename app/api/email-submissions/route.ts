import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

function sanitizeInput(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PUT(request: NextRequest) {
  const { id, name, email, source } = await request.json();
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  const sanitizedSource = sanitizeInput(source);

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Service not configured." },
      { status: 500 }
    );
  }

  if (!id || !sanitizedEmail) {
    return NextResponse.json(
      { error: "ID and email are required." },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("email_marketing_submissions")
      .update({
        name: sanitizedName,
        email: sanitizedEmail,
        source: sanitizedSource,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json(
        { error: "Failed to update entry." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Service not configured." },
      { status: 500 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "ID is required." },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("email_marketing_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete entry." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Entry deleted successfully.",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
