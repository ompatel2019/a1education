import React from 'react'

const AboutUs = ({
  section,
  sectionName,
  sectionSubheading,
  sectionDescriptionHeading,
  placeholder
}) => {
  const name = 'About Us';
  const subheading =
    'At A1 Education, we dedicate ourselves to delivering exceptional HSC Economics tutoring designed to foster academic excellence and personal growth.';
  const topDescription =
    'At A1 Education, our mission is simple: to specialise in Year 11 & 12 Economics tutoring that genuinely transforms results.';
  const bottomDescription =
    'We blend a deep understanding of core economic concepts with an engaging teaching style, ensuring each student receives individual attention in both learning and assessment.';

  const perks = [
    'Individual goal-setting',
    'Continuous practice with real-exam questions',
    'Building an A1 mindset towards education — persistence, practice, and passion',
  ];

  return (
    <section
      className={`${section} bg-primary-0 grid grid-cols-2 max-md:grid-cols-1 2xl:gap-12 lg:gap-10 md:gap-8 gap-6 text-white-0`}
    >
      <div className="2xl:space-y-12 lg:space-y-10 md:space-y-8 sm:space-y-6 space-y-4">
        <h3 className={sectionName}>{name.toUpperCase()}</h3>

        <h4 className={sectionSubheading}>{subheading}</h4>

        <div className="space-y-4">
          <h5 className={sectionDescriptionHeading}>{topDescription}</h5>
          <h5 className={sectionDescriptionHeading}>{bottomDescription}</h5>
        </div>

        <div className="flex flex-col max-md:flex-row max-md:flex-wrap">
          {perks.map((perk, index) => (
            <div key={index} className="flex space-x-2 h7 items-center">
              <i className="bi bi-check-lg h5"></i>
              <p>{perk}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="place-content-center">
        <img
          src={placeholder}
          alt="Tutoring session demonstrating individualized attention"
          className="rounded-lg"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default AboutUs;
