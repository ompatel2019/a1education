import React from 'react'
import aboutimg from '../assets/aboutus.png'

const AboutUs = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  placeholder
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
      statHeader: '90+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
    {
      statHeader: '90+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
    {
      statHeader: '90+ ATAR',
      statDesc: 'Karan achieved an excellent ATAR and received Band 6 in Economics'
    }, 
  ];

  return (
    <section
      className={`${section} bg-primary-0 text-white-0`}
    >
      <h3 className={sectionName}>{name.toUpperCase()}</h3>

      <div className='grid grid-cols-3 gap-8 max-md:grid-cols-1'>

        <div className="flex col-span-1">
          <img
            src={aboutimg}
            alt="Tutoring session demonstrating individualized attention"
            className="rounded-md"
            loading="lazy"
          />
        </div>

        <div className="2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 col-span-2 border-white-0 flex flex-col justify-between max-md:col-span-1">

        <h4 className={sectionSubheading}>{subheading}</h4>

        <div className="space-y-4">
          <h5 className={sectionDescriptionHeading}>{topDescription}</h5>
          <h5 className={sectionDescriptionHeading}>{bottomDescription}</h5>
        </div>

        </div>
      </div>

      <div className="flex justify-around items-center 2xl:gap-10 lg:gap-8 md:gap-6 gap-4 max-sm:flex-col max-md:grid-cols-2 max-md:grid">
        {perks.map((perk, index) => (
          <div key={index} className="flex flex-col border-4 rounded-2xl 2xl:p-10 lg:p-8 md:p-6 sm:p-4 p-2 2xl:py-20 lg:py-16 md:py-12 sm:py-10 py-6 max-md:col-span-1">
            <h5 className='h4 text-center'>{perk.statHeader}</h5>
            <p className='p text-center'>{perk.statDesc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
