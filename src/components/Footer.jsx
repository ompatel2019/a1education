// Footer.jsx
import React from 'react';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-white text-white 2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] pt-6 pb-4 font-generalSans-medium">
      <div className="bg-primary rounded-lg responsivePad 2xl:py-12 lg:py-10 md:py-8 py-6 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <HashLink smooth to="/" aria-label="Home">
              <img
                src={logo}
                alt="A1 Education company logo"
                className="h-8 w-auto"
                loading="lazy"
                width="100" 
                height="100" 
              />
            </HashLink>
          </div>
          {/* Center: Nav Links */}
          <nav className="flex sm:space-x-6 max-sm:flex-col max-sm:space-y-2 max-sm:items-center">
            <HashLink to="/" smooth className="p hover:underline" aria-label="Home">
              Home
            </HashLink>
            <HashLink to="/whychooseus" smooth className="p hover:underline" aria-label="Why Choose Us">
              Why Choose Us
            </HashLink>
            <HashLink to="/aboutus" smooth className="p hover:underline" aria-label="About Us">
              About Us
            </HashLink>
            <HashLink to="/contact" smooth className="p hover:underline" aria-label="Contact Us">
              Contact Us
            </HashLink>
            <HashLink
              to="https://g.page/r/CUphtEkfNIs9EBI/review"
              smooth
              target="_blank"
              className="p hover:underline flex space-x-1"
              aria-label="Leave a Review"
            >
              <span>Leave a Review</span>
              <i className="bi bi-arrow-up-right-circle-fill" aria-hidden="true"></i>
            </HashLink>
          </nav>
          {/* Right: Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/a1educationaustralia/"
              target="_blank"
              rel="noopener noreferrer"
              className="p hover:text-white"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram text-xl" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.google.com/maps?sca_esv=0d523a7910ac4013&rlz=1C5CHFA_enAU1102AU1102&output=search&q=a1+education"
              target="_blank"
              rel="noopener noreferrer"
              className="p hover:text-white"
              aria-label="Google Maps"
            >
              <i className="bi bi-google text-xl" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white my-4 opacity-50"></div>
        {/* Bottom Section: Copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-2">
          <p className="p">
            © {new Date().getFullYear()} A1 Education. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://bytesitedigital.com.au/"
              aria-label="Powered by bytesitedigital"
            >
              <p className="p">Powered by bytesitedigital.</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
