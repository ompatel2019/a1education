// pages/WhyChooseUsPage.jsx
import React from 'react';
import SeoHelmet from '../components/SeoHelmet';

// ─── Components for Why Choose Us Page ──────────────────────────────────
import PageTitle from '../components/PageTitle';
import WhyChooseUs from '../components/WhyChooseUs';
import WhatWeOffer from '../components/WhatWeOffer';
import Testimonials from '../components/Testimonials';
import SlidingSchools from '../components/SlidingSchools';
import CTA from '../components/CTA';

const WhyChooseUsPage = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
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

      <PageTitle 
        heading={'Why Choose Us'}
        subheading={'Choose the best Economics tutors in Sydney; our track record of high student success rates speaks volumes about our teaching efficacy.'}
        route={'Home / Why Choose Us'}
        />


      <WhyChooseUs 
          section={section}
          sectionName={sectionName}
          sectionSubheading={sectionSubheading}
          sectionDescriptionHeading={sectionDescriptionHeading}
          sectionText={sectionText}
      />
      
      <WhatWeOffer 
          section={section}
          sectionName={sectionName}
          sectionSubheading={sectionSubheading}
          sectionDescriptionHeading={sectionDescriptionHeading}
          sectionText={sectionText}
      />

      <Testimonials 
          section={section}
          sectionName={sectionName}
          sectionSubheading={sectionSubheading}
          sectionDescriptionHeading={sectionDescriptionHeading}
          sectionText={sectionText}
      />

      <SlidingSchools 
          section={section}
          sectionName={sectionName}
          sectionSubheading={sectionSubheading}
          sectionDescriptionHeading={sectionDescriptionHeading}
          sectionText={sectionText}
      />
      <CTA />
    </>
  );
};

export default WhyChooseUsPage;
