import React from 'react';
import { HashLink } from 'react-router-hash-link';
import AnimateOnScroll from '../tools/AnimateOnScroll';

const Hero = ({ heroImages }) => {
  const heroTopText = 'On-campus / Online Years 11-12 Economics Tutoring';
  const heroHeading = 'HSC Economics Specialists In Sydney';
  const threeSteps = [
    { numberIcon: <i className="bi bi-1-square h6 max-md:text-2xl"></i>, step: 'Learn' },
    { numberIcon: <i className="bi bi-2-square h6 max-md:text-2xl"></i>, step: 'Apply' },
    { numberIcon: <i className="bi bi-3-square h6 max-md:text-2xl"></i>, step: 'Master' },
  ];
  const buttons = [
    { name: 'Learn More', to: '/specialty' },
    { name: 'Book Free Trial', to: '/contact' },
  ];

  return (
    <AnimateOnScroll className='fade-up fade-in'>
      <section className="2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] text-white-0 font-generalSans">
        <div
          className="bg-gradient-to-b 2xl:rounded-[32px] lg:rounded-[24px] md:rounded-[16px] rounded-[8px]
          flex flex-col space-y-10 2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[24px]
          text-center items-center"
        >
          <div className="responsivePad flex flex-col 2xl:space-y-10 lg:space-y-8 space-y-6 text-center items-center font-generalSans-medium">
            <h5 className="h5 font-generalSans-semibold">{heroTopText}</h5>
            <h1 className="h1 font-generalSans-bold 2xl:px-[200px]">{heroHeading}</h1>
            {/* Numbered steps */}
            <div className="flex space-x-4 h7 max-md:space-x-4">
              {threeSteps.map((step, index) => (
                <div key={index} className="space-x-2 flex items-center max-md:space-x-1">
                  {step.numberIcon}
                  <p className="h7">{step.step}</p>
                </div>
              ))}
            </div>
            {/* Buttons */}
            <div className="flex space-x-4">
              {buttons.map((button, index) => (
                <HashLink
                  key={index}
                  className="px-4 p-2 lg:p-3 bg-white-0 text-black-0 rounded-[4px] lg:min-w-[180px]
                    hover:bg-purple-400 hover:text-white-0 transition-all border-white-0"
                  smooth
                  to={button.to}
                >
                  {button.name}
                </HashLink>
              ))}
            </div>
          </div>
          {/* Sliding images conveyor belt */}
          <div className="hero-slider-container overflow-hidden w-full mt-8">
            <div className="hero-slider-track flex gap-8 hero-slider-animation">
              {/* Original set of images */}
              {heroImages.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.imageAlt}
                  className="hero-slide-img"
                  loading="lazy"
                />
              ))}
              {/* Duplicate set for seamless looping */}
              {heroImages.map((item, index) => (
                <img
                  key={`dup-${index}`}
                  src={item.image}
                  alt={item.imageAlt}
                  className="hero-slide-img"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default Hero;
