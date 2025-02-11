// pages/HomePage.jsx
import React from 'react';
import SeoHelmet from '../components/SeoHelmet';

// ─── Sections ───────────────────────────────────────────────────────────
import Hero from '../components/Hero';
import Specialty from '../components/Specialty';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials';
import Faqs from '../components/Faqs';

const HomePage = () => {
  // ─── Schema for Home Page ──────────────────────────────────────────────
  const jsonLdHomePage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Home - Business Name",
    "description": "Welcome to Business Name. Customize your homepage description here.",
    "url": "https://example.com/"
  };

  return (
    <>
      <SeoHelmet
        title="Home - Business Name"
        description="Welcome to Business Name. Customize your homepage description here."
        jsonSchema={jsonLdHomePage}
      />

      {/* ─── Sections ───────────────────────────────────────────── */}
      <Hero />
      <Specialty />
      <WhyChooseUs />
      <AboutUs />
      <Pricing />
      <Testimonials />
      <Faqs />
    </>
  );
};

export default HomePage;
