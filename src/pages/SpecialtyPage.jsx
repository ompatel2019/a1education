// pages/SpecialtyPage.jsx
import React from 'react'
import SeoHelmet from '../components/SeoHelmet';

// ─── Sections ───────────────────────────────────────────────────────────
import PageTitle from '../components/PageTitle';
import Specialty from '../components/Specialty';
import CTA from '../components/CTA';

const SpecialtyPage = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
  // ─── Schema for Specialty Page ──────────────────────────────────────────────
  const jsonLdSpecialtyPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Specialty - Business Name",
    "description": "Customize your homepage description here.",
    "url": "https://example.com/"
  };

  return (
    <>
      <SeoHelmet
        title="Specialty - Business Name"
        description="Customize your homepage description here."
        jsonSchema={jsonLdSpecialtyPage}
      />

      {/* ─── Sections ───────────────────────────────────────────── */}
      <PageTitle 
        heading={'Specialty'}
        subheading={'Explore our Specialty with the leading Economics tutors in Sydney, offering tailored programs that prepare students for HSC success'}
        route={'Home / Specialty'}
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

export default SpecialtyPage