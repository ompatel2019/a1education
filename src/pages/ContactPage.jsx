// ContactPage.jsx
import React from 'react';
import SeoHelmet from '../tools/SeoHelmet';

// Components
import PageTitle from '../components/PageTitle';
import ContactForm from '../components/ContactForm';
import WhatWeOffer from '../components/WhatWeOffer';
import Faqs from '../components/Faqs';
import CTA from '../components/CTA';

const ContactPage = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  sectionText
}) => {
  const jsonLdContactPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contact - A1 Education",
    "description": "Get in touch with A1 Education for inquiries on HSC Economics tutoring in Sydney.",
    "url": "https://a1education.com.au/contact"
  };

  return (
    <>
      <SeoHelmet
        title="Contact - A1 Education"
        description="Reach out to Sydney’s top Economics tutors at A1 Education and book a trial lesson on us."
        canonicalUrl="https://a1education.com.au/contact"
        jsonSchema={jsonLdContactPage}
      />

      <PageTitle
        heading="Contact Us"
        subheading="Reach out to Sydney’s top Economics tutors at A1 Education and book a trial lesson on us."
        route="Home / Contact"
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
      />

      <Faqs
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
      />
    </>
  );
};

export default ContactPage;
