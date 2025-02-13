import React from 'react';
import { HashLink } from 'react-router-hash-link';

const CTA = () => {
  const name = 'You won’t find out till you start.';
  const subheading =
    "Jumpstart your success with A1 Education’s expert tutoring. Enhance your understanding and boost your scores with our tailored support. Ready to excel? Join us now and see the difference.";

  return (
    <section className="2xl:p-[48px] lg:p-[32px] md:p-[16px] p-[4px] text-white-0 font-generalSans-medium">
      <div
        className="bg-primary-0 rounded-lg
          flex flex-col space-y-10 2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[24px]
          text-center items-center responsivePad"
      >
        <h3 className="h3 font-generalSans-semibold">{name}</h3>

        <h4 className="h7">{subheading}</h4>

        <HashLink
          smooth
          to="/contact"
          className="lg:px-6 px-4 p-2 bg-white-0 text-black-0 hover:bg-purple-400 hover:text-white-0 w-fit transition-all rounded-sm"
        >
          Enrol Now
        </HashLink>
      </div>
    </section>
  );
};

export default CTA;
