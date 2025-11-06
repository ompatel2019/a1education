// app/pricing/page.tsx

import type { Metadata } from "next";

// Metadata block for SEO
export const metadata: Metadata = {
  title: "Pricing | A1 Education",
  description:
    "Explore our competitive pricing for Year 11 & 12 HSC Economics tutoring in Sydney. Affordable, transparent rates—no hidden fees.",
  alternates: {
    canonical: "https://a1education.com.au/pricing",
  },
};

// Sections
import PageTitle from "@/components/PageTitle";
import Pricing from "@/components/Pricing";
import Faqs from "@/components/FAQs";
import LeadCollector from "@/components/LeadCollector";

export default function PricingPage() {
  return (
    <>
      <PageTitle
        heading="Pricing"
        subheading="Explore affordable options with top Economics tutors in Sydney, ensuring quality education that delivers measurable improvements."
        route="Home / Pricing"
      />

      <Pricing />

      <Faqs />

      <LeadCollector />
    </>
  );
}
