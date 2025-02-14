import React from 'react';

const SlidingSchools = ({ sectionName, schoolsData }) => {
  const heading = 'We have students from';

  return (
    <section
      className={`bg-white-0 text-center text-black-0
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

      {/* Outer wrapper (clips overflow) */}
      <div className="logos">
        {/* Inner "marquee" container (two sets side by side) */}
        <div className="logos-slide font-generalSans-semibold">
          {/* First set of schools */}
          {schoolsData.map((item, index) => (
            <div key={index}>
              <img
                src={item.school}
                alt={item.alt}
                loading="lazy"
                className='lg:h-[176px] md:h-[120px] h-[96px]'
              />
              <p>{item.schoolName}</p>
            </div>
          ))}

          {/* Duplicate set for the continuous scroll */}
          {schoolsData.map((item, index) => (
            <div key={`dup-${index}`}>
              <img
                src={item.school}
                alt={item.alt}
                loading="lazy"
                className='lg:h-[176px] md:h-[120px] h-[96px]'
              />
              <p>{item.schoolName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidingSchools;
