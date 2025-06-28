// components/WhatWeOffer.tsx

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import {
  whatWeOfferPerks,
  whatWeOfferHeading,
  whatWeOfferSubheading,
  WhatWeOfferPerk,
} from "@/lib/config/whatWeOfferConfig";

const WhatWeOffer: React.FC = () => {
  return (
    <section className={sectionClass}>
      <BlurFade delay={0.3} inView>
        <h2 className={`${sectionNameClass} text-center`}>
          {whatWeOfferHeading.toUpperCase()}
        </h2>
        <h3 className={`${sectionSubheadingClass} text-center`}>
          {whatWeOfferSubheading}
        </h3>
      </BlurFade>
      <BlurFade delay={0.4} inView>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-8 lg:gap-6 md:gap-4 gap-2 mt-8">
          {whatWeOfferPerks.map((item: WhatWeOfferPerk, idx: number) => (
            <div
              key={idx}
              className="group bg-primary/95 hover:bg-primary/80 shadow-lg 2xl:p-10 lg:p-8 md:p-6 p-6 flex flex-col items-start rounded-2xl border border-white/10 transition-all duration-200"
            >
              <div className="mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-bold text-lg text-white/90">
                  {idx + 1}.
                </span>
                <span className="h5 font-semibold text-lg text-white">
                  {item.perk}
                </span>
              </div>
              <p className="text-white/90 text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
};

export default WhatWeOffer;
