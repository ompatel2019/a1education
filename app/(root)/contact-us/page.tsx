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

import PageTitle from "@/components/PageTitle";
import ContactForm from "@/components/ContactForm";
import WhatWeOffer from "@/components/WhatWeOffer";
import FAQs from "@/components/FAQs";
// import LeadCollector from "@/components/LeadCollector";
export default function ContactUsPage() {
  return (
    <>
      <PageTitle
        heading="Contact Us"
        subheading="Reach out to Sydney’s top Economics tutors at A1 Education and book a trial lesson on us."
        route="Home / Contact"
      />

      <ContactForm />

      <WhatWeOffer />

      <FAQs />

      {/* <LeadCollector /> */}
    </>
  );
}
