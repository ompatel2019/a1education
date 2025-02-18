import React from 'react';
import SchoolMarquee from './SchoolMarquee';

const SlidingSchools = ({ sectionName }) => {
  const heading = 'We have students from';
  
  return (
    <section
      className={`bg-white text-center text-black
        2xl:py-[120px] lg:py-[96px] md:py-[64px] sm:py-[48px] py-[32px]
        2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4
        font-generalSans-medium`}
    >
      {/* Section Heading */}
      <div className="responsivePad">
        <h3 className={sectionName}>
          {heading.toUpperCase()}
        </h3>
      </div>

      <SchoolMarquee/>
    </section>
  );
};

export default SlidingSchools;
