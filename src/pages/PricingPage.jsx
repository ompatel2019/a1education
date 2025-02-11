// pages/PricingPage.jsx
import React from 'react'
import SeoHelmet from '../components/SeoHelmet';

// ─── Sections ───────────────────────────────────────────────────────────
import PageTitle from '../components/PageTitle';
import Pricing from '../components/Pricing';
import Faqs from '../components/Faqs';
import CTA from '../components/CTA';

const PricingPage = () => {
  // ─── Schema for Pricing Page ──────────────────────────────────────────────
  const jsonLdPricingPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing - Business Name",
    "description": "Customize your homepage description here.",
    "url": "https://example.com/"
  };

  return (
    <>
      <SeoHelmet
        title="Pricing - Business Name"
        description="Customize your homepage description here."
        jsonSchema={jsonLdPricingPage}
      />

      {/* ─── Sections ───────────────────────────────────────────── */}
      <PageTitle />
      <Pricing />
      <Faqs />
      <CTA />
    </>
  );
};

export default PricingPage