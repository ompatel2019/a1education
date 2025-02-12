// MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

// ─── Layout Components ────────────────────────────────────────────────
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../tools/ScrollToTop';

const MainLayout = () => {
  const navbarLinks = [
    {
      name: "Home", 
      to: "/"
    }, 
    {
      name: "Specialty", 
      to: "/specialty"
    }, 
    {
      name: "Why Choose Us", 
      to: "/whychooseus"
    }, 
    {
      name: "About Us", 
      to: "/aboutus"
    }, 
    {
      name: "Pricing", 
      to: "/pricing"
    }, 
    {
      name: "Enrol Now", 
      to: "/contact"
    }, 
  ]
  return (
    <>
      {/* ─── Topbar Section ───────────────────────────────────────── */}
      <Topbar />

      {/* ─── Navigation Bar Section ───────────────────────────────── */}
      <Navbar navbarLinks={navbarLinks} />

      <ScrollToTop /> 

      {/* ─── Page Content Outlet ─────────────────────────────────----- */}
      <Outlet />

      {/* ─── Footer Section ───────────────────────────────────────── */}
      <Footer />
    </>
  );
};

export default MainLayout;
