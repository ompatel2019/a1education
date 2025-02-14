import React from 'react';

const SlidingSchools = ({
  sectionName,
  schoolsData
}) => {
  const name = 'We have students from';

  return (
    <section
      className={`bg-white-0 text-center text-black-0
        2xl:py-[120px] lg:py-[96px] md:py-[64px] sm:py-[48px] py-[32px]
        2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4
        font-generalSans-medium`}
    >
      <div className="responsivePad">
        <h3 className={sectionName}>{name.toUpperCase()}</h3>
      </div>

      <div className="schools-slider-container overflow-hidden w-full mt-8">
        <div className="schools-slider-track flex schools-slider-animation gap-16 justify-center items-center p font-generalSans-semibold">
          {/* Original set */}
          {schoolsData.map((item, index) => (
            <div key={index} className="flex-shrink-0 space-y-4 text-center">
              <img
                src={item.school}
                alt={item.alt}
                className="school-logo-img mx-auto"
                loading="lazy"
              />
              <p>{item.schoolName}</p>
            </div>
          ))}
          {/* Duplicate set */}
          {schoolsData.map((item, index) => (
            <div key={`dup-${index}`} className="flex-shrink-0 space-y-4 text-center">
              <img
                src={item.school}
                alt={item.alt}
                className="school-logo-img mx-auto"
                loading="lazy"
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
