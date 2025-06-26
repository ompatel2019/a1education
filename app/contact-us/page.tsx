// app/contact-us/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | A1 Education",
  description:
    "Get in touch with A1 Education to ask about HSC Economics tutoring, book a free trial, or speak directly with our lead tutor.",
  alternates: {
    canonical: "https://a1education.com.au/contact-us",
  },
};

export default function ContactUsPage() {
  return <div>Contact Us Page</div>;
}
