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

// ─── Router Configuration ───────────────────────────────────────────────
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route
        path="specialty"
        element={
          <Suspense fallback={<Fallback />}>
            <SpecialtyPage />
          </Suspense>
        }
      />

      <Route
        path="whychooseus"
        element={
          <Suspense fallback={<Fallback />}>
            <WhyChooseUsPage />
          </Suspense>
        }
      />

      <Route
        path="aboutus"
        element={
          <Suspense fallback={<Fallback />}>
            <AboutUsPage />
          </Suspense>
        }
      />

      <Route
        path="contact"
        element={
          <Suspense fallback={<Fallback />}>
            <ContactPage />
          </Suspense>
        }
      />

      <Route
        path="pricing"
        element={
          <Suspense fallback={<Fallback />}>
            <PricingPage />
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
