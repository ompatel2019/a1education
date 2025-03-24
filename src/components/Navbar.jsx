import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FiMenu } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import logo from '../assets/logo.png';
import AnimateOnScroll from '../tools/AnimateOnScroll';
import ImageComponent from './ImageComponent';

const Navbar = ({ navbarLinks }) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <>
      <header className="sticky top-0 z-50">
        <AnimateOnScroll className="fade-in fade-down">
          <div className={`2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] py-4 flex justify-between font-generalSans-medium items-center ${showMenu ? 'bg-gray max-md:justify-end' : 'bg-white'}`}>
            {!showMenu && (
              <div>
                <HashLink smooth to="/">
                  <ImageComponent
                    src={logo}
                    alt="A1 Education main logo"
                    className="lg:w-[146px] lg:h-[47.24px] w-[88px] h-[28.47px]"
                    width="152"
                    height="64"
                    loading="lazy"
                  />
                </HashLink>
              </div>
            )}

            {/* Desktop Navigation */}
            <nav role="navigation" aria-label="Primary" className="hidden md:flex">
              <ul className="flex space-x-3 items-center">
                {navbarLinks.map((link, index) =>
                  link.name !== 'Enrol Now' ? (
                    <li key={index} className="hover:text-gray-400 transition-all">
                      <HashLink smooth to={link.to}>{link.name}</HashLink>
                    </li>
                  ) : (
                    <li key={index}>
                      <HashLink smooth to={link.to}>
                        <div className="px-4 py-2 bg-primary hover:px-8 text-white rounded-sm hover:bg-blue-500 transition-all">
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
              className="md:hidden focus:outline-none relative z-50"
            >
              {showMenu ? (
                <RxCross2 className="w-6 h-6 text-white" />
              ) : (
                <FiMenu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </AnimateOnScroll>
      </header>

      {/* Mobile Menu Overlay with Transition */}
      <div
        className={`fixed inset-0 bg-primary text-white px-4 font-generalSans-medium flex flex-col justify-center transition-transform duration-300 z-40 ${
          showMenu ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav role="navigation" aria-label="Mobile menu">
          <ul className="flex flex-col space-y-6 h2">
            {navbarLinks.map((link, index) => (
              <li
                key={index}
                className="hover:text-gray-300 transition-all"
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
