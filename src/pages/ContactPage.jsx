// pages/ContactPage.jsx
import React from 'react';
import SeoHelmet from '../components/SeoHelmet';

// ─── Components for Contact Page ─────────────────────────────────────
import PageTitle from '../components/PageTitle';
import ContactForm from '../components/ContactForm';
import WhatWeOffer from '../components/WhatWeOffer';
import Faqs from '../components/Faqs';
import CTA from '../components/CTA';

const ContactPage = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
  // ─── Schema for Contact Page ─────────────────────────────────────────
  const jsonLdContactPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contact - Business Name",
    "description": "Get in touch with Business Name for inquiries and support.",
    "url": "https://example.com/contact"
  };

  return (
    <>
      <SeoHelmet
        title="Home - Business Name"
        description="Welcome to Business Name. Customize your homepage description here."
        jsonSchema={jsonLdContactPage}
      />

      {/* ─── Sections ───────────────────────────────────────────── */}
      <PageTitle 
        heading={'Contact Us'}
        subheading={'Reach out to Sydney’s top Economics tutors at A1 Education and book a trial lesson on us.'}
        route={'Home / Contact'}
      />

      <ContactForm 
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

export default ContactPage;
