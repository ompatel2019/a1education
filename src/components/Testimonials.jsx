import React from 'react';

const Testimonials = ({
  sectionName,
  sectionSubheading,
  testimonialsData
}) => {
  const name = 'Testimonials';
  const subheading = 'Hear what our students say about us!';

  return (
    <section
      className={`bg-primary-0 text-center text-white-0
        2xl:py-[120px] lg:py-[96px] md:py-[64px] sm:py-[48px] py-[32px]
        2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4
        font-generalSans-medium`}
    >
      <div className="responsivePad">
        <h3 className={sectionName}>{name.toUpperCase()}</h3>
        <h4 className={sectionSubheading}>{subheading}</h4>
      </div>

      <div className="testimonials-slider-container overflow-hidden w-full mt-8">
        <div className="testimonials-slider-track flex testimonials-slider-animation gap-8">
          {/* Original set */}
          {testimonialsData &&
            testimonialsData.map((item, index) => (
              <div
                className="testimonial-card bg-white-0 text-black-0 flex-shrink-0
                  rounded-lg space-y-2 md:space-y-4 lg:space-y-6 2xl:space-y-8"
                key={index}
              >
                <div className="space-x-1">
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                </div>
                <p className="h7">"{item.testimonial}"</p>
                <div>
                  <p className="text-left p">{item.from}</p>
                  <p className="text-grey-0">{item.sig}</p>
                </div>
              </div>
            ))}
          {/* Duplicate set */}
          {testimonialsData &&
            testimonialsData.map((item, index) => (
              <div
                className="testimonial-card bg-white-0 text-black-0 flex-shrink-0
                  rounded-lg space-y-2 md:space-y-4 lg:space-y-6 2xl:space-y-8"
                key={`dup-${index}`}
              >
                <div className="space-x-1">
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                  <i className="bi bi-star-fill text-[#F4BC00] h7"></i>
                </div>
                <p className="h7">"{item.testimonial}"</p>
                <div>
                  <p className="text-left p">{item.from}</p>
                  <p className="text-grey-0">{item.sig}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
