// components/Testimonials.tsx

import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import {
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import {
  firstRow,
  secondRow,
  ReviewCard,
  sectionHeading,
  sectionSubheading,
} from "@/lib/config/testimonialsConfig";

const Testimonials = () => {
  return (
    <section className={`bg-primary text-white text-center py-12 space-y-10`}>
      <BlurFade delay={0.15} inView>
        <div className="max-w-2xl mx-auto">
          <h3 className={sectionNameClass}>{sectionHeading.toUpperCase()}</h3>
          <h4 className={sectionSubheadingClass}>{sectionSubheading}</h4>
        </div>
      </BlurFade>
      <BlurFade delay={0.4} inView>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:150s] mb-2">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:150s]">
            {secondRow.map((review) => (
              <ReviewCard key={`dup-${review.name}`} {...review} />
            ))}
          </Marquee>
          {/* Gradient fade effect edges for aesthetic */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12"></div>
        </div>
      </BlurFade>
    </section>
  );
};

export default Testimonials;
