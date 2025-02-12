import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link';

const Pricing = ({ section, sectionName, sectionSubheading }) => {
  const name = 'Pricing'
  const subheading =
    'Our competitive pricing is designed for accessibility and value, ensuring every student can achieve their best without compromise.'

  const [grade, setGrade] = useState(false)
  const [currentGrade, setCurrentGrade] = useState('Year 11')
  const [pricingTab, setPricingTab] = useState([])

  // Toggle Year 11 or Year 12
  const selectYear11 = () => {
    setGrade(false)
    setCurrentGrade('Year 11')
  }
  const selectYear12 = () => {
    setGrade(true)
    setCurrentGrade('Year 12')
  }

  // Common perks for both year levels
  const commonPerks = [
    'Weekly 2-hour class lessons',
    'Unlimited 24/7 help',
    'Assignment & Exams Support',
    'Recorded Lessons',
    'Progress Reports',
  ]

  // Build the entire list of perks for each plan using array spread
  const year11pricing = [
    {
      header: 'Billed Termly',
      price: '$30/hour',
      perks: ['$600 p/term', ...commonPerks],
    },
    {
      header: 'Billed Yearly (Save 10%)',
      price: '$27/hour',
      perks: ['$540 p/term', ...commonPerks],
    },
  ]

  const year12pricing = [
    {
      header: 'Billed Termly',
      price: '$35/hour',
      perks: ['$700 p/term', ...commonPerks],
    },
    {
      header: 'Billed Yearly (Save 11%)',
      price: '$31/hour',
      perks: ['$630 p/term', ...commonPerks],
    },
  ]

  // Whenever 'grade' changes, set the pricing tab accordingly
  useEffect(() => {
    if (grade) {
      setPricingTab(year12pricing)
    } else {
      setPricingTab(year11pricing)
    }
  }, [grade])

  return (
    <section className={section}>
      {/* Section Title & Subheading */}
      <div className='text-center space-x-4'>
        <h3 className={sectionName}>{name.toUpperCase()}</h3>
        <h4 className={sectionSubheading}>{subheading}</h4>
      </div>

      {/* Grade Toggle */}
      <div className='flex justify-center h7 mt-6'>
        <p
          onClick={selectYear11}
          className={`px-4 p-2 border-2 cursor-pointer ${
            !grade ? 'bg-primary-0 text-white-0 border-primary-0' : 'border-black-0'
          }`}
        >
          Year 11
        </p>

        <p
          onClick={selectYear12}
          className={`px-4 p-2 border-2 cursor-pointer ${
            grade ? 'bg-primary-0 text-white-0 border-primary-0' : 'border-black-0'
          }`}
        >
          Year 12
        </p>
      </div>

      {/* Pricing Cards */}
      <div className='grid grid-cols-2 max-md:grid-cols-1 gap-8 mt-6 h7 2xl:px-[200px] lg:px-[120px] md:px-[64px] sm:px-[32px]'>
        {pricingTab.map((tab, index) => (
          <div key={index} className={`2xl:p-10 lg:p-8 p-6 border-black-0 border-2 rounded-lg space-y-4 ${index === 1 ? 'bg-primary-0 text-white-0 border-primary-0' : 'bg-white-0 text-black-0'}`}>
            <h6 className='h6'>{tab.header}</h6>
            <h5 className={`h3 font-generalSans-semibold pb-5 border-b-2 ${index === 0 ? 'border-black-0' : 'border-white-0'}`}>
              {tab.price}
            </h5>

            {tab.perks.map((perk, i) => (
              <div key={i} className='flex space-x-2 mt-4'>
                <i className='bi bi-check-square'></i>
                <p>{perk}</p>
              </div>
            ))}

            <div className={`cursor-pointer text-center w-full rounded-md p-3 ${index === 0 ? 'bg-primary-0 text-white-0' : 'bg-white-0 text-black-0'}`}>
              <HashLink smooth to='/contact'>
                Get Started
              </HashLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
