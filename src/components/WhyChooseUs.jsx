import React from 'react'

const WhyChooseUs = ({section, sectionName, sectionSubheading, sectionDescriptionHeading, sectionText}) => {
  const stats = [
    {
      statName: 'Average Increase In Marks',
      stat: "25%", 
      desc: "students see at least a 25% improvement in scores after joining A1Education."
    }, 
    {
      statName: 'Satisfaction Rate',
      stat: "100%", 
      desc: "high approval from parents and students for our engaging lessons and strong support."
    }, 
    {
      statName: 'Outperform School Average',
      stat: "95%", 
      desc: "of our students score above their school's average in Prelim and HSC Economics."
    }, 
  ]
  

  const name = 'Why Choose Us';
  const subheading = '"Karan is a knowledgeable and approachable tutor with clear expertise in economics. He explains complex concepts logically and with ease, showing genuine interest in student performance. His detailed marking and comprehensive resources, including band six notes and a question bank, significantly enhance response writing skills. Initially struggling with short answers and essay structures, I improved markedly under his guidance. Karan is also very responsive, always providing timely feedback. I highly recommend him as an exceptional economics tutor."';
  return (
    <>
      <section className={section}>
        <div className='sm:grid sm:grid-cols-3 max-sm:space-y-4 2xl:gap-8 lg:gap-6 gap-4'>
          <h3 className={`${sectionName} col-span-1`}>
            {name.toUpperCase()}
          </h3>

          <div className='col-span-2 bg-primary-0 2xl:p-10 lg:p-8 md:p-6 p-4 rounded-lg text-white-0 hover:translate-y-[-10px] transition-all space-y-4'>
            <h4 className={`h7 font-generalSans-medium-italic`}>
              {subheading}
            </h4>
            <p className='p font-generalSans-bold'>
              Sansita Verma - Rank 1, Trial Mark: 97/100, ATAR: 97.80 - Cumberland High School
            </p>
          </div>
        </div>

        <div className='grid grid-cols-3 2xl:gap-8 lg:gap-6 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
          {stats.map((stat, index) => (
            <div key={index} className='md:text-right text-left bg-primary-0 text-white-0 2xl:p-10 lg:p-8 md:p-6 p-4 rounded-md 2xl:space-y-8 lg:space-y-6 space-y-4 hover:translate-y-[-10px] transition-all'> 
              <p className={`${sectionText} font-generalSans-medium`}>{stat.statName}</p>
              <h5 className={`h3 max-md:text-4xl`}>{stat.stat}</h5>
              <p className='border-t-[3px] border-t-white-0 pt-4 mt-4'>
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