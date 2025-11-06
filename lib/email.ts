// lib/email.ts
import { Resend } from "resend";

// Note: This file is kept for reference but emails are now sent via API routes
// to avoid exposing API keys to the client side

export function getResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY environment variable is not set");
    return null;
  }

  return new Resend(resendApiKey);
}

// Email functionality is now handled by API routes (/api/send-welcome-email)
// This prevents exposing API keys to the client side
