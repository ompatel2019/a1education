import React from 'react'
import { HashLink } from 'react-router-hash-link';

const Specialty = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
  const specialties = [
    {
      tags: ["Year 11", "Economics"], 
      name: "Year 11 Economics", 
      desc: "Start your Preliminary HSC Economics journey with foundational concepts and skills that set you up for success. Our expert tutors in Sydney guide you through every topic."
    },
    {
      tags: ["Year 12", "Economics"], 
      name: "Year 12 Economics", 
      desc: "Excel in your HSC with our specialized Year 12 Economics tutoring. Master complex theories and ace your exams with tailored support and proven strategies."
    }
  ]

  const perks = [
    {
      number: <i className="bi bi-1-square-fill h6 max-md:text-2xl"></i>,
      name: "Small Class Sizes", 
      desc: "We limit our classes to a maximum of 12 students, ensuring individual attention and a supportive learning environment."
    }, 
    {
      number: <i className="bi bi-2-square-fill h6 max-md:text-2xl"></i>,
      name: "Structured Lessons", 
      desc: "Each 2-hour session combines comprehensive content with practice questions—multiple choice, short answer, and essays."
    }, 
    {
      number: <i className="bi bi-3-square-fill h6 max-md:text-2xl"></i>,
      name: "Critical Learning", 
      desc: "Focus on critical thinking and real-world applications to ensure students understand beyond memorization."
    }, 
    {
      number: <i className="bi bi-4-square-fill h6 max-md:text-2xl"></i>,
      name: "Rich Resources", 
      desc: "Access to a wide array of study materials including recorded lessons, practice papers, and 24/7 homework help."
    }, 
    {
      number: <i className="bi bi-5-square-fill h6 max-md:text-2xl"></i>,
      name: "Consistent Results", 
      desc: "Students regularly outperform their peers, with most seeing a 25% mark increase through our coaching."
    }, 
    {
      number: <i className="bi bi-6-square-fill h6 max-md:text-2xl"></i>,
      name: "Personalised Coaching", 
      desc: "Direct guidance from experienced tutors, offering tailored advice to meet your unique academic needs."
    }, 
  ]

  const name = 'Specialty';
  const subheading = 'At A1 Education, we focus exclusively on Year 11–12 Economics in Sydney.  Our weekly 2-hour lessons go beyond rote learning, with a max of 12 students per class. We focus on critical thinking, essay writing, and real-world applications. Ready to see the difference?';

  return (
    <>
      <section className={section}>
        <h3 className={sectionName}>
          {name.toUpperCase()}
        </h3>

        <h4 className={sectionSubheading}>
          {subheading}
        </h4>

        <div className='grid grid-cols-3 max-md:flex max-md:flex-col 2xl:gap-8 lg:gap-6 gap-4'>
          <div className='flex flex-col max-md:flex-row max-md:space-x-4 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-4 md:space-y-4'>
            {
              specialties.map((specialty, index) => (
                <div key={index} className='2xl:p-10 lg:p-8 md:p-6 p-4 border-2 border-black-0 rounded-md 2xl:space-y-8 lg:space-y-6 space-y-4 flex flex-col'>
                  <div className='p-4 border-l-primary-0 border-l-4'>
                    
                    <div className={sectionDescriptionHeading}>
                      {specialty.name}
                    </div>
                  </div>

                  <div>
                    {specialty.desc}
                  </div>

                  <HashLink smooth to='/contact' className='lg:px-6 px-4 p-2 bg-black-0 text-white-0 hover:bg-purple-400 hover:px-8 hover:text-white-0 w-fit transition-all rounded-sm'>Enrol Now</HashLink>

                </div>
              ))
            }

          </div>

          <div className='col-span-2 bg-primary-0 rounded-lg text-white-0 2xl:p-10 lg:p-8 md:p-6 p-4 p flex flex-col justify-between max-md:space-y-6 lg:grid-cols-2 lg:grid lg:gap-8 lg:place-content-around'>
            {perks.map((perk, index) => (
              <div key={index} className='flex flex-col space-y-2'>
                <div className='flex space-x-2 items-center'>
                  {perk.number}
                  <p>
                    {perk.name}
                  </p>
                </div>

                <p>
                  {perk.desc}
                </p>

              </div>
            ))}
          </div>

        </div>

      </section>
    </>
  )
}

export default Specialty 