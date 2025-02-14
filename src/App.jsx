import React, { Suspense, lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Fallback from './tools/Fallback';

// -- Imports for images --
import hero1 from './assets/hero1.webp'
import hero2 from './assets/hero2.webp'
import hero3 from './assets/hero3.webp'
import hero4 from './assets/hero4.webp'
import aboutUsPlaceholder from './assets/hero4.webp'
import school1 from './assets/school1.webp'
import school2 from './assets/school2.webp'
import school3 from './assets/school3.webp'
import school4 from './assets/school4.webp'
import school5 from './assets/school5.webp'
import school6 from './assets/school6.webp'
import school7 from './assets/school7.webp'
import school8 from './assets/school8.webp'
import school9 from './assets/school9.jpg'
import school10 from './assets/school10.png'
import school11 from './assets/school11.png'

// -- Lazy loaded pages --
const HomePage = lazy(() => import('./pages/HomePage'));
const SpecialtyPage = lazy(() => import('./pages/SpecialtyPage'));
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));

// ─── Shared Section Layout Classes ─────────────────────────────────────────────
const section =
  'responsivePad 2xl:py-[120px] lg:py-[96px] md:py-[64px] sm:py-[48px] py-[32px] 2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 font-generalSans-medium';

const sectionName = 'h4 font-generalSans-semibold';
const sectionSubheading = 'h5';
const sectionDescriptionHeading = 'h7';
const sectionText = 'p';

// ─── Data Arrays & Props ───────────────────────────────────────────────

// Hero images
const heroImages = [
  { image: hero1, imageAlt: 'High school students engaged in study #1' },
  { image: hero2, imageAlt: 'High school students engaged in study #2' },
  { image: hero3, imageAlt: 'High school students engaged in study #3' },
  { image: hero4, imageAlt: 'High school students engaged in study #4' },
];

// Testimonials
const testimonialsData = [
  {
    testimonial:
      "Karan's engaging style improved my HSC economics knowledge drastically through structured lessons and past paper practice.",
    from: 'Jet Loiselle',
    sig: 'Rank 1 Economics - Hawkesbury High School',
  },
  {
    testimonial:
      'Karan explains complex ideas clearly, cares deeply about our progress, and provides quick, helpful responses.',
    from: 'Srujana Yerramsetty',
    sig: 'Band 6 Achievement - Penrith High School',
  },
  {
    testimonial:
      'A1 Education provided valuable tutoring that drastically improved my results through quality resources and responsive support.',
    from: 'Anthony Su',
    sig: 'Over 40% Improvement from Year 11 to Year 12',
  },
  {
    testimonial:
      'Organized and clear, Karan boosted my confidence and understanding in Economics significantly.',
    from: 'Jay Patel',
    sig: 'Improvement of Over 30% in HSC - Cherrybrook Technology High School',
  },
  {
    testimonial:
      'Karan helped me master Economics, filling knowledge gaps and enhancing my essay and short answer skills.',
    from: 'Suhas Dara',
    sig: '92.55 ATAR - Cherrybrook Technology High School',
  },
  {
    testimonial:
      'Improved essay scores and understanding of Economics calculations with Karan’s detailed feedback and resources.',
    from: 'Vismay Vimal',
    sig: '30% Improvement in Marks - Macquarie Fields High School',
  },
  {
    testimonial:
      'Enhanced knowledge and exam skills in Economics through detailed feedback and accessible resources from A1 Education.',
    from: 'Chintan Patel',
    sig: '20% Improvement in Marks - Macquarie Fields High School',
  },
];

// Schools array
const schoolsData = [
  {
    school: school1,
    schoolName: 'Strathfield Girls High School',
    alt: 'Strathfield Girls High School logo',
  },
  {
    school: school2,
    schoolName: 'Cumberland High School',
    alt: 'Cumberland High School logo',
  },
  {
    school: school3,
    schoolName: 'Cherrybrook Technology High School',
    alt: 'Cherrybrook Technology High School logo',
  },
  {
    school: school4,
    schoolName: 'Aurthur Phillip High School',
    alt: 'Aurthur Phillip High School logo',
  },
  {
    school: school5,
    schoolName: 'Girraween High School',
    alt: 'Girraween High School logo',
  },
  {
    school: school6,
    schoolName: 'Castle Hill High School',
    alt: 'Castle Hill High School logo',
  },
  {
    school: school7,
    schoolName: 'Parramatta High School',
    alt: 'Parramatta High School logo',
  },
  {
    school: school8,
    schoolName: 'St Marys Senior High School',
    alt: 'St Marys Senior High School logo',
  },
  {
    school: school9,
    schoolName: 'William Clarke College',
    alt: 'William Clarke College logo',
  },
  {
    school: school10,
    schoolName: 'William Clarke College',
    alt: 'William Clarke College logo',
  },
  {
    school: school11,
    schoolName: 'Penrith High School',
    alt: 'Penrith High School logo',
  },
];

// ─── Router Configuration ───────────────────────────────────────────────
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<Fallback />}>
            <HomePage
              section={section}
              sectionName={sectionName}
              sectionSubheading={sectionSubheading}
              sectionDescriptionHeading={sectionDescriptionHeading}
              sectionText={sectionText}
              // Pass arrays + images needed
              heroImages={heroImages}
              testimonialsData={testimonialsData}
              schoolsData={schoolsData}
              aboutUsPlaceholder={aboutUsPlaceholder}
            />
          </Suspense>
        }
      />

      <Route
        path="specialty"
        element={
          <Suspense fallback={<Fallback />}>
            <SpecialtyPage
              section={section}
              sectionName={sectionName}
              sectionSubheading={sectionSubheading}
              sectionDescriptionHeading={sectionDescriptionHeading}
              sectionText={sectionText}
              aboutUsPlaceholder={aboutUsPlaceholder}
              testimonialsData={testimonialsData}
              schoolsData={schoolsData}
            />
          </Suspense>
        }
      />

      <Route
        path="whychooseus"
        element={
          <Suspense fallback={<Fallback />}>
            <WhyChooseUsPage
              section={section}
              sectionName={sectionName}
              sectionSubheading={sectionSubheading}
              sectionDescriptionHeading={sectionDescriptionHeading}
              sectionText={sectionText}
              testimonialsData={testimonialsData}
              schoolsData={schoolsData}
            />
          </Suspense>
        }
      />

      <Route
        path="aboutus"
        element={
          <Suspense fallback={<Fallback />}>
            <AboutUsPage
              section={section}
              sectionName={sectionName}
              sectionSubheading={sectionSubheading}
              sectionDescriptionHeading={sectionDescriptionHeading}
              sectionText={sectionText}
              aboutUsPlaceholder={aboutUsPlaceholder}
              testimonialsData={testimonialsData}
              schoolsData={schoolsData}
            />
          </Suspense>
        }
      />

      <Route
        path="contact"
        element={
          <Suspense fallback={<Fallback />}>
            <ContactPage
              section={section}
              sectionName={sectionName}
              sectionSubheading={sectionSubheading}
              sectionDescriptionHeading={sectionDescriptionHeading}
              sectionText={sectionText}
            />
          </Suspense>
        }
      />

      <Route
        path="pricing"
        element={
          <Suspense fallback={<Fallback />}>
            <PricingPage
              section={section}
              sectionName={sectionName}
              sectionSubheading={sectionSubheading}
              sectionDescriptionHeading={sectionDescriptionHeading}
              sectionText={sectionText}
            />
          </Suspense>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
