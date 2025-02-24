// WhyChooseUsPage.jsx
import React from 'react';
import SeoHelmet from '../components/SeoHelmet';

// Components
import PageTitle from '../components/PageTitle';
import WhyChooseUs from '../components/WhyChooseUs';
import WhatWeOffer from '../components/WhatWeOffer';
import Testimonials from '../components/Testimonials';
import SlidingSchools from '../components/SlidingSchools';
import CTA from '../components/CTA';

const WhyChooseUsPage = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  sectionText,
  schoolsData
}) => {
  const jsonLdWhyChooseUsPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Choose Us - A1 Education",
    "description": "Why A1 Education stands out for Year 11 & 12 Economics tutoring in Sydney.",
    "url": "https://a1education.com.au/whychooseus"
  };

  return (
    <>
      <SeoHelmet
        title="Why Choose Us - A1 Education"
        description="Discover why A1 Education is the best for Year 11 & 12 HSC Economics tutoring in Sydney. Consistent top results!"
        canonicalUrl="https://a1education.com.au/whychooseus"
        jsonSchema={jsonLdWhyChooseUsPage}
      />

      <PageTitle
        heading="Why Choose Us"
        subheading="Choose the best Economics tutors in Sydney; our track record of high student success rates speaks volumes about our teaching efficacy."
        route="Home / Why Choose Us"
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
      />

      <Testimonials
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
      />

      <SlidingSchools
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        schoolsData={schoolsData}
      />
      <CTA />
    </>
  );
};

export default WhyChooseUsPage;
