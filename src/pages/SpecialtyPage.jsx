// SpecialtyPage.jsx
import React from 'react';
import SeoHelmet from '../tools/SeoHelmet';

// Sections
import PageTitle from '../components/PageTitle';
import Specialty from '../components/Specialty';
import CTA from '../components/CTA';

const SpecialtyPage = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  sectionText
}) => {
  const jsonLdSpecialtyPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Specialty - A1 Education",
    "description": "Learn more about our Year 11 & 12 Economics specialty for HSC students in Sydney.",
    "url": "https://a1education.com.au/specialty"
  };

  return (
    <>
      <SeoHelmet
        title="Specialty - A1 Education"
        description="Explore our specialized tutoring for Year 11 & 12 Economics in Sydney. Be HSC-ready with A1 Education."
        canonicalUrl="https://a1education.com.au/specialty"
        jsonSchema={jsonLdSpecialtyPage}
      />

      <PageTitle
        heading="Specialty"
        subheading="Explore our Specialty with the leading Economics tutors in Sydney, offering tailored programs that prepare students for HSC success"
        route="Home / Specialty"
      />
      <Specialty
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

export default SpecialtyPage;
