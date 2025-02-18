import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { BlurFade } from "@/components/magicui/blur-fade";

const Pricing = ({ section, sectionName, sectionSubheading }) => {
  const name = 'Pricing';
  const subheading =
    'Our competitive pricing is designed for accessibility and value, ensuring every student can achieve their best without compromise.';

  const [grade, setGrade] = useState(false);
  const [currentGrade, setCurrentGrade] = useState('Year 11');
  const [pricingTab, setPricingTab] = useState([]);

  // Common perks
  const commonPerks = [
    'Weekly 2-hour class lessons',
    'Unlimited 24/7 help',
    'Assignment & Exams Support',
    'Recorded Lessons',
    'Progress Reports'
  ];

  const year11pricing = [
    {
      header: 'Billed Termly',
      price: '$30/hour',
      perks: ['$600 p/term', ...commonPerks]
    },
  ];

  const year12pricing = [
    {
      header: 'Billed Termly',
      price: '$35/hour',
      perks: ['$700 p/term', 'Regular Assessments with feedback', ...commonPerks]
    },
  ];

  useEffect(() => {
    if (grade) {
      setPricingTab(year12pricing);
      setCurrentGrade('Year 12');
    } else {
      setPricingTab(year11pricing);
      setCurrentGrade('Year 11');
    }
  }, [grade]);

  return (
    <section className={section}>
      <BlurFade delay={0.25} inView>
        <div className="text-center space-x-4">
          <h3 className={sectionName}>{name.toUpperCase()}</h3>
          <h4 className={sectionSubheading}>{subheading}</h4>
        </div>
      </BlurFade>

      <BlurFade delay={0.5} inView>
        {/* Grade Toggle */}
        <div className="flex justify-center h7 mt-6">
          <p
            onClick={() => setGrade(false)}
            className={`px-4 p-2 border-2 cursor-pointer ${
              !grade ? 'bg-primary text-white border-primary' : 'border-black'
            }`}
          >
            Year 11
          </p>
          <p
            onClick={() => setGrade(true)}
            className={`px-4 p-2 border-2 cursor-pointer ${
              grade ? 'bg-primary text-white border-primary' : 'border-black'
            }`}
          >
            Year 12
          </p>
        </div>
        {/* Pricing Cards */}
        <div className="max-md:grid-cols-1 gap-8 mt-6 h7 2xl:px-[480px] lg:px-[320px] md:px-[196px]">
          {pricingTab.map((tab, index) => (
            <div
              key={index}
              className={`2xl:p-10 lg:p-8 p-6 border-black border-2 rounded-lg space-y-4 ${
                index === 1 ? 'bg-gradient-to-b-1 text-white border-primary' : 'bg-white text-black'
              } hover:2xl:py-12 hover:lg:py-10 hover:py-8 transition-all`}
            >
              <h6 className="h6">{tab.header}</h6>
              <h5
                className={`h3 font-generalSans-semibold pb-5 border-b-2 ${
                  index === 0 ? 'border-black' : 'border-white'
                }`}
              >
                {tab.price}
              </h5>
              {tab.perks.map((perk, i) => (
                <div key={i} className="flex space-x-2 mt-4">
                  <i className="bi bi-check-square"></i>
                  <p>{perk}</p>
                </div>
              ))}
              <HashLink smooth to="/contact">
                <div
                  className={`mt-5 cursor-pointer text-center w-full rounded-md p-3 ${
                    index === 0 ? 'bg-primary text-white' : 'bg-white text-black'
                  }`}
                >
                  Get Started
                </div>
              </HashLink>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
};

export default Pricing;
