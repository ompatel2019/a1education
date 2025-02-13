import React from 'react'
import { HashLink } from 'react-router-hash-link';
import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.webp'
import hero4 from '../assets/hero4.webp'

const Hero = () => {
  const heroTopText = 'On-campus / Online Years 11-12 Economics Tutoring';
  const heroHeading = 'HSC Economics Specialists In Sydney';
  const heroSubText = 'Unlock your potential in HSC Economics with Sydney’s leading experts. Our focused, interactive online and on-campus classes ensure deep understanding and outstanding results.';

  const threeSteps = [
    { numberIcon: <i className="bi bi-1-square-fill h6 max-md:text-2xl"></i>, step: 'Learn' },
    { numberIcon: <i className="bi bi-2-square-fill h6 max-md:text-2xl"></i>, step: 'Apply' },
    { numberIcon: <i className="bi bi-3-square-fill h6 max-md:text-2xl"></i>, step: 'Master' },
  ];

  const buttons = [
    { name: 'Learn More', to: '/specialty' },
    { name: 'Book Free Trial', to: '/contact' },
  ];

  // Sample images
  const slidingImages = [
    { image: hero1, imageAlt: 'Image #1' },
    { image: hero2, imageAlt: 'Image #2' },
    { image: hero3, imageAlt: 'Image #3' },
    { image: hero4, imageAlt: 'Image #4' },
  ];

  return (
    <>
      <section className='2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] text-white-0 font-generalSans'>
        <div className='bg-gradient-to-b 2xl:rounded-[32px] lg:rounded-[24px] md:rounded-[16px] rounded-[8px]
                       flex flex-col space-y-10 2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[24px]
                       text-center items-center'>
          <div className="responsivePad flex flex-col 2xl:space-y-10 lg:space-y-8 space-y-6 text-center items-center font-generalSans-medium">
            <h5 className='h5 font-generalSans-semibold'>
              {heroTopText}
            </h5>
            <h1 className='h1 font-generalSans-bold 2xl:px-[200px]'>
              {heroHeading}
            </h1>
            {/* Example subtext if you want it visible
            <p className='h6 max-md:hidden'>
              {heroSubText}
            </p> */}

            {/* Numbered steps */}
            <div className='flex space-x-4 h7 max-md:space-x-4'>
              {threeSteps.map((step, index) => (
                <div key={index} className='space-x-2 flex items-center max-md:space-x-1'>
                  {step.numberIcon}
                  <p className='h7'>{step.step}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className='flex space-x-4'>
              {buttons.map((button, index) => (
                <HashLink
                  key={index}
                  className='px-4 p-2 lg:p-3 bg-white-0 text-black-0 rounded-[4px] lg:min-w-[180px]
                             hover:bg-purple-400 hover:text-white-0 transition-all border-white-0'
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
              {slidingImages.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.imageAlt}
                  className="hero-slide-img"
                />
              ))}
              {/* Duplicate set for seamless looping */}
              {slidingImages.map((item, index) => (
                <img
                  key={`dup-${index}`}
                  src={item.image}
                  alt={item.imageAlt}
                  className="hero-slide-img"
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Hero
