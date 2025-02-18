import React from 'react'

const WhatWeOffer = ({section, sectionName, sectionSubheading}) => {
  const perks = [
    {
      icon: <i class="bi bi-alarm"></i>,
      perk: "Weekly 2-Hour Lessons", 
      desc: "Interactive classes covering syllabus content, practice questions, and exam strategies."
    }, 
    {
      icon: <i class="bi bi-book"></i>,
      perk: "Extensive Resources", 
      desc: "Past HSC-style multiple choice, short answer, and essay questions; band 6 exemplar responses; step-by-step solutions."
    }, 
    {
      icon: <i class="bi bi-telephone"></i>,
      perk: "24/7 Support", 
      desc: "Students can ask questions anytime via email, messaging apps, or our online communication portal."
    }, 
    {
      icon: <i class="bi bi-camera-video"></i>,
      perk: "Recorded Classes", 
      desc: "Miss a class or need to revisit a concept? All sessions are recorded for easy revision."
    }, 
    {
      icon: <i class="bi bi-info-circle"></i>,
      perk: "Personalised Feedback", 
      desc: " Detailed marking and feedback on essays, short answers, and assignment drafts"
    }, 
    {
      icon: <i class="bi bi-people"></i>,
      perk: "Supportive Environment", 
      desc: "Our supportive environment is crafted to build confidence and foster academic curiosity."
    }, 
  ]

  const perk = 'What we offer';
  const subheading = 'At A1 Education, we believe in combining the best teaching methodologies with comprehensive resources to help our students excel in Year 11–12 Economics in Sydney.';

  return (
    <>
      <section className={section}>
          <h3 className={`${sectionName} text-center`}>
            {perk.toUpperCase()}
          </h3>

          <h4 className={`${sectionSubheading} text-center`}>
            {subheading}
          </h4>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 text-white 2xl:gap-8 lg:gap-6 md:gap-4 gap-2'>
            {perks.map((i, k) => (
              <div key={k} className='bg-primary 2xl:p-10 lg:p-8 md:p-6 p-6 flex flex-col 2xl:space-y-8 lg:space-y-6 md:space-y-4 space-y-2 rounded-lg'>

                <div className='h5'>
                  {i.icon}
                </div>

                <div className='h7 flex space-x-2'>
                  <h5>
                    {k + 1}.
                  </h5>

                  <h5>{i.perk}</h5>
                </div>

                <p>
                  {i.desc}
                </p>

              </div>
            ))}

          </div>

      </section>
    </>
  )
}

export default WhatWeOffer