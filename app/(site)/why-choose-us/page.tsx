// app/why-choose-us/page.tsx

import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatWeOffer from "@/components/WhatWeOffer";
import Testimonials from "@/components/Testimonials";
import Schools from "@/components/Schools";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Why Choose Us | A1 Education",
  description:
    "Find out why top students choose A1 Education for HSC Economics. Results-driven approach, elite tutors, and personalised feedback.",
  alternates: {
    canonical: "https://a1education.com.au/why-choose-us",
  },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageTitle
        heading="Why Choose Us"
        subheading="Choose the best Economics tutors in Sydney; our track record of high student success rates speaks volumes about our teaching efficacy."
        route="Home / Why Choose Us"
      />

      <WhyChooseUs />

      <WhatWeOffer />

      <Testimonials />

      <Schools />

      <CTA />
    </>
  );
}
