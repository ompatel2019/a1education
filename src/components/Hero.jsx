import React from 'react';
import { HashLink } from 'react-router-hash-link';
import AnimateOnScroll from '../tools/AnimateOnScroll';
import ImagesMarquee from './ImagesMarquee';
import { TextAnimateDemo } from './TextAnimateDemo'
import hero9 from '../assets/hero9.webp'
import { BlurFade } from "@/components/magicui/blur-fade";

const Hero = ({}) => {
  const heroTopText = 'On-campus / Online Years 11-12 Economics Tutoring';
  const heroHeading = 'HSC Economics Specialists In Sydney';
  const threeSteps = [
    { numberIcon: <i className="bi bi-1-square h6 max-md:text-2xl"></i>, step: 'Learn' },
    { numberIcon: <i className="bi bi-2-square h6 max-md:text-2xl"></i>, step: 'Apply' },
    { numberIcon: <i className="bi bi-3-square h6 max-md:text-2xl"></i>, step: 'Master' },
  ];
  const buttons = [
    { name: 'Our Specialty', to: '/specialty' },
    { name: 'Book Free Trial', to: '/contact' },
  ];

  return (
    <AnimateOnScroll className='fade-up fade-in'>
      <section className="2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] text-white font-generalSans">
        <div
          className="bg-gradient-to-b 2xl:rounded-[32px] lg:rounded-[24px] md:rounded-[16px] rounded-[8px]
          flex flex-col space-y-10 2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[24px]
          text-center items-center"
        >
          <div className="responsivePad flex flex-col 2xl:space-y-10 lg:space-y-8 space-y-6 text-center items-center font-generalSans-medium">
            <h5 className="h5 font-generalSans-semibold">{heroTopText}</h5>
            <div className='h1 font-generalSans-bold 2xl:px-[200px]'>
              <TextAnimateDemo text={heroHeading} by={"word"} />
            </div>
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
                  className="px-4 p-2 lg:p-3 bg-white text-black rounded-[4px] lg:min-w-[180px]
                    hover:bg-purple-400 hover:text-white transition-all border-white"
                  smooth
                  to={button.to}
                >
                  {button.name}
                </HashLink>
              ))}
            </div>
          </div>
          <div className="max-sm:hidden"><ImagesMarquee/></div>
          <BlurFade delay={0.2} inView>
            <div className='pb-6 responsivePad'>
              <img src={hero9} alt="Student at A1 education" className='hero-slide-img sm:hidden rounded-md' />
            </div>
          </BlurFade>
        </div>
      </section>
    </AnimateOnScroll>
  );
};
export default Hero;
