// app/about-us/page.tsx

import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Schools from "@/components/Schools";
import FAQs from "@/components/FAQs";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Us | A1 Education",
  description:
    "Learn about A1 Education’s mission to empower high school students through expert HSC tutoring, small classes, and personalised support.",
  alternates: {
    canonical: "https://a1education.com.au/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <PageTitle
        heading="About Us"
        subheading="Discover how our Economics tutors in Sydney have built a reputation for excellence, transforming students into leaders in economic thinking."
        route="Home / About Us"
      />

      <AboutUs />

      <Testimonials />

      <Schools />

      <FAQs />

      <CTA />
    </>
  );
}
