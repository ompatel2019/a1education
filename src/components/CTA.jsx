import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { BlurFade } from "@/components/magicui/blur-fade";

const CTA = () => {
  const name = 'You won’t find out till you start.';
  const subheading =
    "Jumpstart your success with A1 Education’s expert tutoring. Enhance your understanding and boost your scores with our tailored support. Ready to excel? Join us now and see the difference.";

  return (
    <section className="2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] text-white font-generalSans-medium">
      <BlurFade delay={0.1} inView>
        <div
          className="bg-primary rounded-lg
            flex flex-col space-y-10 2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[24px]
            text-center items-center responsivePad"
        >
          <h3 className="h3 font-generalSans-semibold">{name}</h3>
          <h4 className="h7">{subheading}</h4>
          <HashLink
            smooth
            to="/contact"
            className="lg:px-6 px-4 p-2 bg-white text-black hover:bg-purple-400 hover:text-white w-fit transition-all rounded-sm"
          >
            Enrol Now
          </HashLink>
        </div>
      </BlurFade>
    </section>
  );
};

export default CTA;
