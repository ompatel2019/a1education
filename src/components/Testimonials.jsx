import React from 'react'
import SlidingSchools from './SlidingSchools';

const Testimonials = ({ section, sectionName, sectionSubheading }) => {
  const name = 'Testimonials';
  const subheading = 'Hear what our students say about us!';

  const testimonials = [
    {
      testimonial: "Karan's engaging style improved my HSC economics knowledge drastically through structured lessons and past paper practice.",
      from: 'Jet Loiselle',
      sig: 'Rank 1 Economics - Hawkesbury High School',
    },
    {
      testimonial: "Karan explains complex ideas clearly, cares deeply about our progress, and provides quick, helpful responses.",
      from: 'Srujana Yerramsetty',
      sig: 'Band 6 Achievement - Penrith High School',
    },
    {
      testimonial: "A1 Education provided valuable tutoring that drastically improved my results through quality resources and responsive support.",
      from: 'Anthony Su',
      sig: 'Over 40% Improvement from Year 11 to Year 12',
    },
    {
      testimonial: "Organized and clear, Karan boosted my confidence and understanding in Economics significantly.",
      from: 'Jay Patel',
      sig: 'Improvement of Over 30% in HSC - Cherrybrook Technology High School',
    },
    {
      testimonial: "Karan helped me master Economics, filling knowledge gaps and enhancing my essay and short answer skills.",
      from: 'Suhas Dara',
      sig: '92.55 ATAR - Cherrybrook Technology High School',
    },
    {
      testimonial: "Improved essay scores and understanding of Economics calculations with Karan’s detailed feedback and resources.",
      from: 'Vismay Vimal',
      sig: '30% Improvement in Marks - Macquarie Fields High School',
    },
    {
      testimonial: "Enhanced knowledge and exam skills in Economics through detailed feedback and accessible resources from A1 Education.",
      from: 'Chintan Patel',
      sig: '20% Improvement in Marks - Macquarie Fields High School',
    }
  ];
  

  return (
    <>
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

        {/* Separate container/tracks for testimonials */}
        <div className="testimonial-container mt-8">
          <div className="testimonial-track text-left">
            {testimonials.map((item, index) => (
              <div
                className="testimonial-item bg-white-0 text-black-0 rounded-lg 2xl:p-8 lg:p-6 p-4 space-y-2 md:space-y-4 lg:space-y-6 2xl:space-y-8"
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

            {/* Duplicate for seamless loop */}
            {testimonials.map((item, index) => (
              <div
                className="testimonial-item bg-white-0 text-black-0 rounded-lg 2xl:p-8 lg:p-6 p-4 space-y-2 md:space-y-4 lg:space-y-6 2xl:space-y-8"
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
    </>
  );
};

export default Testimonials;
