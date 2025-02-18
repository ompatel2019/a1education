import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FiMenu } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import logo from '../assets/logo.svg';
import AnimateOnScroll from '../tools/AnimateOnScroll';

const Navbar = ({ navbarLinks }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <>
      <AnimateOnScroll className='fade-in fade-down'>
        <header
          className={`2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] py-4 flex justify-between font-generalSans-medium items-center sticky top-0 z-50 ${
            showMenu ? 'bg-gray max-md:justify-end' : 'bg-white'
          }`}
        >
          {!showMenu && (
            <HashLink smooth to="/">
              <img
                src={logo}
                alt="A1 Education main logo"
                className="lg:w-[152px] lg:h-[64px] w-[96px] h-[40px]"
                loading="lazy"
              />
            </HashLink>
          )}
          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Primary" className="hidden md:flex">
            <ul className="flex space-x-3 items-center">
              {navbarLinks.map((link, index) =>
                link.name !== 'Enrol Now' ? (
                  <li key={index} className="hover:text-grey transition-all">
                    <HashLink smooth to={link.to}>
                      {link.name}
                    </HashLink>
                  </li>
                ) : (
                  <li key={index}>
                    <HashLink smooth to={link.to}>
                      <div
                        className="px-4 py-2 bg-primary hover:px-8 text-white rounded-sm
                          hover:bg-blue-500 transition-all duration-200"
                      >
                        {link.name}
                      </div>
                    </HashLink>
                  </li>
                )
              )}
            </ul>
          </nav>
          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            aria-label={showMenu ? 'Close menu' : 'Open menu'}
            aria-expanded={showMenu}
            className="md:hidden focus:outline-none"
          >
            {showMenu ? (
              <RxCross2 className="w-6 h-6 text-black" />
            ) : (
              <FiMenu className="w-6 h-6 text-black" />
            )}
          </button>
        </header>
      </AnimateOnScroll>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 
          bg-grey text-black h4 font-generalSans-medium 
          flex flex-col items-center justify-center 
          transition-opacity duration-300
          ${showMenu ? 'opacity-95 pointer-events-auto z-40' : 'opacity-0 pointer-events-none z-[-1]'}
        `}
        aria-hidden={!showMenu}
      >
        <nav role="navigation" aria-label="Mobile menu">
          <ul className="flex flex-col space-y-6">
            {navbarLinks.map((link, index) => (
              <li
                key={index}
                className="hover:text-grey transition-all"
                onClick={toggleMenu}
              >
                <HashLink smooth to={link.to}>
                  {link.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
