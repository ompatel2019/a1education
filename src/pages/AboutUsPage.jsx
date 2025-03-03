import React from 'react';
import SeoHelmet from '../tools/SeoHelmet';

// Components
import PageTitle from '../components/PageTitle';
import BlankSpace from '../components/BlankSpace';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import SlidingSchools from '../components/SlidingSchools';
import Faqs from '../components/Faqs';
import CTA from '../components/CTA';

const AboutUsPage = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  sectionText,
  aboutUsPlaceholder,
  testimonialsData,
  schoolsData
}) => {
  const jsonLdAboutUsPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Us - A1 Education",
    "description": "Learn more about A1 Education's team, mission, and values in HSC Economics tutoring.",
    "url": "https://a1education.com.au/aboutus"
  };

  return (
    <>
      <SeoHelmet
        title="About Us - A1 Education"
        description="Discover how our Economics tutors in Sydney have built a reputation for excellence, transforming students into leaders in economic thinking."
        canonicalUrl="https://a1education.com.au/aboutus"
        jsonSchema={jsonLdAboutUsPage}
      />

      <PageTitle
        heading="About Us"
        subheading="Discover how our Economics tutors in Sydney have built a reputation for excellence, transforming students into leaders in economic thinking."
        route="Home / About Us"
      />

      <BlankSpace />

      <AboutUs
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        sectionDescriptionHeading={sectionDescriptionHeading}
        sectionText={sectionText}
        placeholder={aboutUsPlaceholder}
      />

      <Testimonials
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        testimonialsData={testimonialsData}
      />

      <SlidingSchools
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        sectionDescriptionHeading={sectionDescriptionHeading}
        sectionText={sectionText}
        schoolsData={schoolsData}
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

export default AboutUsPage;
