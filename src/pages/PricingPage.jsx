import React from 'react';
import SeoHelmet from '../tools/SeoHelmet';

// Sections
import PageTitle from '../components/PageTitle';
import Pricing from '../components/Pricing';
import Faqs from '../components/Faqs';
import CTA from '../components/CTA';

const PricingPage = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  sectionText
}) => {
  const jsonLdPricingPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing",
    "description": "Explore affordable rates for top Year 11 & 12 Economics tutoring in Sydney.",
    "url": "https://a1education.com.au/pricing"
  };

  return (
    <>
      <SeoHelmet
        title="Pricing"
        description="Explore our competitive pricing for Year 11 & 12 HSC Economics tutoring in Sydney."
        canonicalUrl="https://a1education.com.au/pricing"
        jsonSchema={jsonLdPricingPage}
      />

      <PageTitle
        heading="Pricing"
        subheading="Explore affordable options with top Economics tutors in Sydney, ensuring quality education that delivers measurable improvements."
        route="Home / Pricing"
      />

      <Pricing
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        sectionDescriptionHeading={sectionDescriptionHeading}
        sectionText={sectionText}
      />

      <Faqs
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
      />
      <CTA />
    </>
  );
};

export default PricingPage;
