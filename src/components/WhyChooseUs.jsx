import React from 'react'
import { NumberTickerDemo } from './NumberTickerDemo'
import { BlurFade } from "@/components/magicui/blur-fade";

const WhyChooseUs = ({section, sectionName, sectionText}) => {
  const stats = [
    {
      statName: 'Average Increase In Marks',
      stat: "25%", 
      metric: "%", 
      desc: "students see at least a 25% improvement in scores after joining A1Education."
    }, 
    {
      statName: 'Satisfaction Rate',
      stat: "100%", 
      metric: "%", 
      desc: "high approval from parents and students for our engaging lessons and strong support."
    }, 
    {
      statName: 'Outperform School Average',
      stat: "95%", 
      metric: "%", 
      desc: "of our students score above their school's average in Prelim and HSC Economics."
    }, 
  ]
  

  const name = 'Why Choose Us';
  const subheading = '"Karan is a knowledgeable and approachable tutor with clear expertise in economics. He explains complex concepts logically and with ease, showing genuine interest in student performance. His detailed marking and comprehensive resources, including band six notes and a question bank, significantly enhance response writing skills. Initially struggling with short answers and essay structures, I improved markedly under his guidance. Karan is also very responsive, always providing timely feedback. I highly recommend him as an exceptional economics tutor."';
  return (
    <>
        <section className={section}>
          <BlurFade delay={0.25} inView>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:space-y-4 2xl:gap-8 lg:gap-6 gap-4'>
              <h3 className={`${sectionName}`}>
                {name.toUpperCase()}
              </h3>
              <div className='col-span-2 max-lg:col-span-1 bg-primary 2xl:p-10 lg:p-8 md:p-6 p-4 rounded-lg text-white space-y-4'>
                <h4 className={`h7 font-generalSans-medium`}>
                  {subheading}
                </h4>
                <p className='p font-generalSans-bold'>
                  Sansita Verma - Rank 1, Trial Mark: 97/100, ATAR: 97.80 - Cumberland High School
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.35} inView>
            <div className='grid grid-cols-3 2xl:gap-8 lg:gap-6 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
              {stats.map((stat, index) => (
                <div key={index} className='md:text-right text-left bg-primary text-white 2xl:p-10 lg:p-8 md:p-6 p-4 rounded-md 2xl:space-y-8 lg:space-y-6 space-y-4'>
                  <p className={`${sectionText} font-generalSans-medium`}>{stat.statName}</p>
                  <div className='flex h3 md:justify-end justify-start'>
                    <NumberTickerDemo className={`h3 max-md:text-4xl text-white`} value={stat.stat}/>
                    <p>{stat.metric}</p>
                  </div>
                  <p className='border-t-[3px] border-t-white pt-4 mt-4'>
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </BlurFade>
        </section>
    </>
  )
}

export default WhyChooseUs