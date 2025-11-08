import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

const BUCKET_NAME = "blog-downloadables";

const sanitizeSlug = (value: string) => {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "blog-resource";
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawFile = formData.get("file");
    const rawSlug = formData.get("slug");

    if (!(rawFile instanceof File)) {
      return NextResponse.json(
        { error: "A file is required." },
        { status: 400 }
      );
    }

    const file = rawFile;
    const slug =
      typeof rawSlug === "string" && rawSlug.trim().length > 0
        ? sanitizeSlug(rawSlug)
        : "blog-resource";
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()
      : "";
    const objectPath = `${slug}/${Date.now()}-${randomUUID()}${
      extension ? `.${extension}` : ""
    }`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabase = createServiceClient();
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(objectPath, buffer, {
        cacheControl: "3600",
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Failed to upload blog resource:", uploadError);
      return NextResponse.json(
        { error: uploadError.message ?? "Unable to upload file." },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(objectPath);

    if (!publicUrl) {
      return NextResponse.json(
        { error: "Unable to generate a public URL for the uploaded file." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: {
        url: publicUrl,
        path: objectPath,
      },
    });
  } catch (error) {
    console.error("Unexpected blog resource upload error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
