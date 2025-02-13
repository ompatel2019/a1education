// pages/AboutUsPage.jsx
import React from 'react';
import SeoHelmet from '../components/SeoHelmet';

// ─── Components for About Us Page ─────────────────────────────────────
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import SlidingSchools from '../components/SlidingSchools';
import Faqs from '../components/Faqs';
import CTA from '../components/CTA';

const AboutUsPage = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
  // ─── Schema for About Us Page ─────────────────────────────────────────
  const jsonLdAboutUsPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Us - Business Name",
    "description": "Learn more about Business Name, our values, and our team.",
    "url": "https://example.com/aboutus"
  };

  return (
    <>
      <SeoHelmet
        title="About Us - Business Name"
        description="Learn more about our business."
        jsonSchema={jsonLdAboutUsPage}
      />

      {/* ─── Sections ───────────────────────────────────────────── */}
      <AboutUs 
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

      <Faqs 
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

export default AboutUsPage;
