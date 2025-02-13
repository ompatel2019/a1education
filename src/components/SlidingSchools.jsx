import React from 'react'
import school1 from '../assets/school1.png'
import school2 from '../assets/school2.png'
import school3 from '../assets/school3.png'
import school4 from '../assets/school4.png'
import school5 from '../assets/school5.png'
import school6 from '../assets/school6.png'
import school7 from '../assets/school7.png'
import school8 from '../assets/school8.png'

const SlidingSchools = ({sectionName, sectionSubheading}) => {
  const schools = [
      {
          school: school1,
          schoolName: "Strathfield Girls High School",
          alt: 'Strathfield Girls High School logo'
      },
      {
          school: school2,
          schoolName: "Cumberland High School",
          alt: 'Cumberland High School logo'
      },
      {
          school: school3,
          schoolName: "Cherrybrook Technology High School",
          alt: 'Cherrybrook Technology High School logo'
      },
      {
          school: school4,
          schoolName: "Aurthur Phillip High School",
          alt: 'Aurthur Phillip High School logo'
      },
      {
          school: school5,
          schoolName: "Girraween High School",
          alt: 'Girraween High School logo'
      },
      {
          school: school6,
          schoolName: "Castle Hill High School",
          alt: 'Castle Hill High School logo'
      },
      {
          school: school7,
          schoolName: "Parramatta High School",
          alt: 'Parramatta High School logo'
      },
      {
          school: school8,
          schoolName: "St Marys Senior High School",
          alt: 'St Marys Senior High School logo'
      },
  ]

  const name = 'We have students from';

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
        </div>

        {/* Smooth slider with bigger gap */}
        <div className="schools-slider-container overflow-hidden w-full mt-8">
          <div className="schools-slider-track flex schools-slider-animation gap-16 justify-center items-center p">
            {/* Original set */}
            {schools.map((item, index) => (
              <div key={index} className='flex-shrink-0 space-y-4 text-center'>
                <img
                  src={item.school}
                  alt={item.alt}
                  className="school-logo-img mx-auto"
                />
                <p>{item.schoolName}</p>
              </div>
            ))}
            {/* Duplicate set */}
            {schools.map((item, index) => (
              <div key={`dup-${index}`} className='flex-shrink-0 space-y-4 text-center'>
                <img
                  src={item.school}
                  alt={item.alt}
                  className="school-logo-img mx-auto"
                />
                <p>{item.schoolName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default SlidingSchools
