import React from 'react'
import aboutimg from '../assets/aboutUs.webp'
import { NumberTickerDemo } from './NumberTickerDemo'

const AboutUs = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
}) => {
  const name = 'About Us';
  const subheading =
    'At A1 Education, we dedicate ourselves to delivering exceptional HSC Economics tutoring designed to foster academic excellence and personal growth.';
  const topDescription =
    'At A1 Education, our mission is simple: to specialise in Year 11 & 12 Economics tutoring that genuinely transforms results.';
  const bottomDescription =
    'We blend a deep understanding of core economic concepts with an engaging teaching style, ensuring each student receives individual attention in both learning and assessment.';

  const perks = [
    {
      statHeader: '90',
      statMetric: '+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
    {
      statHeader: '90',
      statMetric: '+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
    {
      statHeader: '90',
      statMetric: '+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
    {
      statHeader: '90',
      statMetric: '+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
  ];

  return (
    <section
      className={`${section} bg-primary text-white`}
    >
      <h3 className={sectionName}>{name.toUpperCase()}</h3>

      <div className='grid grid-cols-3 gap-8 max-md:grid-cols-1 '>

        <div className="flex col-span-1 ">
          <img
            src={aboutimg}
            alt="Tutoring session demonstrating individualized attention"
            className="rounded-md max-h-[640px] w-[100%] h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 col-span-2 border-white flex flex-col justify-between max-md:col-span-1">

        <h4 className={sectionSubheading}>{subheading}</h4>

        <div className="space-y-4">
          <h5 className={sectionDescriptionHeading}>{topDescription}</h5>
          <h5 className={sectionDescriptionHeading}>{bottomDescription}</h5>
        </div>

        </div>
      </div>

      <div className="flex justify-around items-center 2xl:gap-10 lg:gap-8 md:gap-6 gap-4 max-sm:flex-col max-md:grid-cols-2 max-md:grid text-black ">
        {perks.map((perk, index) => (
          <div key={index} className="flex flex-col rounded-md 2xl:p-8 lg:p-6 md:p-4 sm:p-2 p-1 2xl:py-16 lg:py-12 md:py-10 sm:py-6 py-4 max-md:col-span-1 bg-white">
            <div className='flex'>
              <NumberTickerDemo className={`h4 text-center`} value={perk.statHeader}/>
              <h5 className='h4 text-center'>{perk.statMetric}</h5>
            </div>
            <p className='p text-center'>{perk.statDesc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
