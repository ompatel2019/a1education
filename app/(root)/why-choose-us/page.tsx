// app/why-choose-us/page.tsx

import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatWeOffer from "@/components/WhatWeOffer";
import Testimonials from "@/components/Testimonials";
import Schools from "@/components/Schools";
import LeadCollector from "@/components/LeadCollector";

export const metadata: Metadata = {
  title: "The A1 Difference | A1 Education",
  description:
    "Discover The A1 Difference - built by economists, community of high achievers, beyond tuition support, and trusted results across Sydney.",
  alternates: {
    canonical: "https://a1education.com.au/why-choose-us",
  },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageTitle
        heading="The A1 Difference"
        subheading="Discover what makes A1 Education the top choice for HSC Economics - built by economists, community of high achievers, and trusted results."
        route="Home / The A1 Difference"
      />

      <WhyChooseUs />

      <WhatWeOffer />

      <Testimonials />

      <Schools />

      <LeadCollector />
    </>
  );
}
