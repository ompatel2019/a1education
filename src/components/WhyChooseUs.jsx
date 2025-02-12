import React from 'react'

const WhyChooseUs = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
  const stats = [
    {
      statName: 'Average Increase In Marks',
      stat: "25%", 
      desc: "On average, our students improve by at least 25% from their initial scores after joining A1 Education."
    }, 
    {
      statName: 'Satisfaction Rate',
      stat: "100%", 
      desc: "Both parents and students rate our services highly, thanks to our engaging lessons and dedicated support."
    }, 
    {
      statName: 'Outperform School Average',
      stat: "95%", 
      desc: "A vast majority of our students surpass their school's overall average in Preliminary and HSC Economics exams."
    }, 
  ]

  const name = 'Why Choose Us';
  const subheading = 'Choose us for proven results and a commitment to excellence in HSC Economics education. Our dedicated approach provides you with all the tools to succeed.';
  return (
    <>
      <section className={section}>
        <div className='sm:grid sm:grid-cols-3 max-sm:space-y-4 2xl:gap-8 lg:gap-6 gap-4'>
          <h3 className={`${sectionName} col-span-1`}>
            {name.toUpperCase()}
          </h3>

          <h4 className={`${sectionSubheading} col-span-2 bg-primary-0 2xl:p-16 lg:p-12 md:p-8 p-4 rounded-lg text-white-0 hover:translate-y-[-10px] transition-all`}>
            {subheading}
          </h4>
        </div>

        <div className='grid grid-cols-3 2xl:gap-8 lg:gap-6 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
          {stats.map((stat, index) => (
            <div key={index} className='bg-primary-0 text-white-0 2xl:p-10 lg:p-8 md:p-6 p-4 rounded-md 2xl:space-y-8 lg:space-y-6 space-y-4 hover:translate-y-[-10px] transition-all'> 
              <p className={`${sectionText} font-generalSans-medium`}>{stat.statName}</p>
              <h5 className={`h3 text-right max-md:text-4xl`}>{stat.stat}</h5>
              <p className='border-t-[3px] border-t-white-0 pt-4 mt-4 text-right'>
                {stat.desc}
              </p>
            </div>
          ))}

        </div>

      </section>
    </>
  )
}

export default WhyChooseUs