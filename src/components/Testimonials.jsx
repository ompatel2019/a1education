import React from 'react';
import TestimonialMarqee from './TestimonialMarquee';

const Testimonials = ({
  sectionName,
  sectionSubheading,
}) => {
  const name = 'Testimonials';
  const subheading = 'Hear what our students say about us!';

  return (
    <>
      <section
        className={`bg-primary text-center text-white
          2xl:py-[120px] lg:py-[96px] md:py-[64px] sm:py-[48px] py-[32px]
          2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4
          font-generalSans-medium`}
      >
        <div className="responsivePad">
          <h3 className={sectionName}>{name.toUpperCase()}</h3>
          <h4 className={sectionSubheading}>{subheading}</h4>
        </div>

      <TestimonialMarqee />
      </section>
    </>
  );
};

export default Testimonials;
