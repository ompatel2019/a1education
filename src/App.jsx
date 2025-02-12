// App.jsx
import React, { Suspense, lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Fallback from './tools/Fallback';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SpecialtyPage = lazy(() => import('./pages/SpecialtyPage'));
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));

// ─── Consistent Section Layouts ───────────────────────────────────────────────
const section = 'responsivePad 2xl:py-[120px] lg:py-[96px] md:py-[64px] sm:py-[48px] py-[32px] 2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 font-generalSans-medium';
const sectionName = 'h4 font-generalSans-semibold';
const sectionSubheading = 'h5';
const sectionDescriptionHeading = 'h7'
const sectionText = 'p'

// ─── Router Configuration ───────────────────────────────────────────────
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout  />}>
      <Route 
        index 
        element={<HomePage 
          section={section}
          sectionName={sectionName}
          sectionSubheading={sectionSubheading}
          sectionDescriptionHeading={sectionDescriptionHeading}
          sectionText={sectionText}
      />} />

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
