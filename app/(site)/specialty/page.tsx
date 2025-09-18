// app/specialty/page.tsx

import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import Specialty from "@/components/Specialty";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "The A1 Formula | A1 Education",
  description:
    "The A1 Formula for Band 6 Success. Our proven methodology combines expert teaching, comprehensive resources, and personalized support to deliver consistent Band 6 results.",
  alternates: {
    canonical: "https://a1education.com.au/specialty",
  },
};

export default function SpecialtyPage() {
  return (
    <>
      <PageTitle
        heading="The A1 Formula"
        subheading="Our proven methodology combines expert teaching, comprehensive resources, and personalized support to deliver consistent Band 6 results."
        route="Home / The A1 Formula"
      />
      <Specialty />
      <CTA />
    </>
  );
}
