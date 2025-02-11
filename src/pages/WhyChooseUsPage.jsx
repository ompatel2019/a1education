// pages/WhyChooseUsPage.jsx
import React from 'react';
import SeoHelmet from '../components/SeoHelmet';

// ─── Components for Why Choose Us Page ──────────────────────────────────
import WhyChooseUs from '../components/WhyChooseUs';
import WhatWeOffer from '../components/WhatWeOffer';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const WhyChooseUsPage = () => {
  // ─── Schema for Why Choose Us Page ─────────────────────────────────────
  const jsonLdWhyChooseUsPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Choose Us - Business Name",
    "description": "Learn why Business Name is the best choice for your needs.",
    "url": "https://example.com/whychooseus"
  };

  return (
    <>
      <SeoHelmet
        title="Why Choose Us - Business Name"
        description="Learn why Business Name is the best choice for your needs."
        jsonSchema={jsonLdWhyChooseUsPage}
      />

      {/* ─── Sections ───────────────────────────────────────────── */}
      <WhyChooseUs />
      <WhatWeOffer />
      <Testimonials />
      <CTA />
    </>
  );
};

export default WhyChooseUsPage;
