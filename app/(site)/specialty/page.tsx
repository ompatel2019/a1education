// app/specialty/page.tsx

import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import Specialty from "@/components/Specialty";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Specialty | A1 Education",
  description:
    "Specialising exclusively in HSC Economics for Year 11 and 12 students. Proven results, expert tutors, and 24/7 support.",
  alternates: {
    canonical: "https://a1education.com.au/specialty",
  },
};

export default function SpecialtyPage() {
  return (
    <>
      <PageTitle
        heading="Specialty"
        subheading="Explore our Specialty with the leading Economics tutors in Sydney, offering tailored programs that prepare students for HSC success."
        route="Home / Specialty"
      />
      <Specialty />
      <CTA />
    </>
  );
}
