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
    'My name is Karan Patel and I am the founder of A1 Education. I achieved a Band 6 in HSC Economics and am pursuing a Bachelor of Economics and Commerce at the University of New South Wales. I’ve tutored and mentored numerous students who have gone to achieve outstanding results in Economics. My vision for A1 Education is to offer high-quality tutoring at an affordable rate, inspiring students to develop the same passion for Economics that I have.';
  const bottomDescription =
    'We emphasise an understanding of the core concepts mixed with an engaging teaching style. By ensuring each student is catered for when teaching content and marking responses, we enrich the learning experience. We believe in creating a positive and vibrant learning environment mixed with individual goal setting, continuous practice and an A1 attitude towards learning. Each student is empowered to unlock their full potential and excel not just in their exams, but in their overall understanding of Economics to take out in the real world.';

  const perks = [
    {
      statHeader: '20',
      statMetric: '/20',
      statDesc: 'The highest essay mark achieved by our student in the 2024 HSC Economics exam.'
    }, 
    {
      statHeader: '97',
      statMetric: '%',
      statDesc: 'The highest score one of our students received in their trial examinations for Economics.'
    }, 
    {
      statHeader: '90',
      statMetric: '+',
      statDesc: 'All our tutors have achieved an ATAR and received a Band 6 (90+) in HSC Economics.'
    }, 
    {
      statHeader: '100',
      statMetric: '%',
      statDesc: 'Of A1 Education students report increased confidence in their first month of enrolment.'
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
            className="rounded-md max-h-[720px] w-[100%] h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4 col-span-2 border-white flex flex-col max-md:col-span-1 items-center justify-center">

        <div className="space-y-2">
          <h6 className="h6">{topDescription}</h6>
        </div>

        </div>
      </div>

      <div className="flex justify-around items-center 2xl:gap-10 lg:gap-8 md:gap-6 gap-4 max-sm:flex-col max-md:grid-cols-2 max-md:grid text-black max-lg:grid-cols-3">
        {perks.map((perk, index) => (
          <div key={index} className="flex flex-col rounded-md 2xl:p-8 lg:p-6 md:p-4 sm:p-2 p-1 2xl:py-16 lg:py-12 md:py-10 sm:py-6 py-4 max-md:col-span-1 bg-white w-full">
            <div className='flex justify-center'>
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
