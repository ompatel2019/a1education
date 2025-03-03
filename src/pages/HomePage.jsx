import React from "react";
import SeoHelmet from '../tools/SeoHelmet';

// Sections
import Hero from "../components/Hero";
import Specialty from "../components/Specialty";
import WhyChooseUs from "../components/WhyChooseUs";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import PhoneImagesMarquee from "../components/PhoneImagesMarquee";
import Faqs from "../components/Faqs";
import SlidingSchools from "../components/SlidingSchools";

const HomePage = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  sectionText,
  heroImages,
  testimonialsData,
  schoolsData,
  aboutUsPlaceholder,
}) => {
  // JSON-LD for the homepage
  const jsonLdHomePage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "A1 Education | Year 11 & 12 Economics Tutoring in Sydney",
    "description": "Welcome to A1 Education. Specializing in Year 11 & 12 HSC Economics tutoring in Sydney.",
    "url": "https://a1education.com.au/"
  };

  return (
    <>
      <SeoHelmet
        title="A1 Education | Year 11 & 12 Economics Tutoring in Sydney"
        description="A1 Education is your go-to for Year 11 & 12 Economics tutoring in Sydney. Learn from expert tutors and boost your HSC performance."
        canonicalUrl="https://a1education.com.au/"
        jsonSchema={jsonLdHomePage}
      />

      {/* Sections */}
      <Hero heroImages={heroImages} />
      <Specialty
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        sectionDescriptionHeading={sectionDescriptionHeading}
        sectionText={sectionText}
      />
      <WhyChooseUs
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        sectionDescriptionHeading={sectionDescriptionHeading}
        sectionText={sectionText}
      />
      <Pricing
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
      />
      <Testimonials
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        testimonialsData={testimonialsData}
      />
      <SlidingSchools
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
        schoolsData={schoolsData}
      />
      <Faqs
        section={section}
        sectionName={sectionName}
        sectionSubheading={sectionSubheading}
      />
    </>
  );
};

export default HomePage;
