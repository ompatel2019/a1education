import React from 'react';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-white text-white 2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] pt-6 pb-4 font-generalSans-medium">
      <div
        className="bg-primary rounded-lg responsivePad 2xl:py-12 lg:py-10 md:py-8 py-6 2xl:space-y-12 lg:space-y-10 md:space-y-8 space-y-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="A1 Education company logo"
              className="h-8 w-auto"
              loading="lazy"
            />
          </div>
          {/* Center: Nav Links */}
          <nav className="flex sm:space-x-6 max-sm:flex-col max-sm:space-y-2 max-sm:items-center">
            <HashLink to="/" smooth className="p hover:underline">
              Home
            </HashLink>
            <HashLink to="/whychooseus" smooth className="p hover:underline">
              Why Choose Us
            </HashLink>
            <HashLink to="/aboutus" smooth className="p hover:underline">
              About Us
            </HashLink>
            <HashLink to="/contact" smooth className="p hover:underline">
              Contact Us
            </HashLink>
            <HashLink target='_blank' to="https://g.page/r/CUphtEkfNIs9EBI/review" smooth className="p hover:underline flex space-x-1">
              <p>Leave a Review</p>
              <i class="bi bi-arrow-up-right-circle-fill"></i>
            </HashLink>
          </nav>
          {/* Right: Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p hover:text-white"
            >
              <i className="bi bi-instagram text-xl"></i>
            </a>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p hover:text-white"
            >
              <i className="bi bi-google text-xl"></i>
            </a>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white my-4 opacity-50"></div>
        {/* Bottom Section: Copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y">
          <p className="p">
            © {new Date().getFullYear()} A1 Education. All rights reserved.
          </p>
          <div className='flex items-center space-x-1 p'>
            <a target="_blank" rel="noreferrer" href="https://bytesitedigital.com.au/">
              <p className="p">Powered by bytesitedigital.</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
