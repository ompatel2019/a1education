// components/Pricing.tsx
import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import {
  sectionName,
  sectionSubheading,
  commonPerks,
  year11pricing,
  year12pricing,
} from "@/lib/config/pricingConfig";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import { CheckSquare } from "lucide-react";

const cardBase =
  "flex flex-col justify-between bg-white/80 border-2 border-black rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md min-h-[380px] max-md:mx-auto transition-all duration-200 hover:shadow-xl hover:-translate-y-1";
const cardAccent =
  "bg-gradient-to-b from-primary to-primary/90 text-white border-primary";

const Pricing = () => {
  return (
    <section className={sectionClass} id="pricing">
      <BlurFade delay={0.25} inView>
        <div className="text-center space-y-2">
          <h2 className={sectionNameClass}>{sectionName.toUpperCase()}</h2>
          <h3 className={sectionSubheadingClass}>{sectionSubheading}</h3>
        </div>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <div className="w-full flex flex-col md:flex-row md:justify-center md:space-x-6 space-y-4 md:space-y-0 mt-10">
          {/* Year 11 */}
          <div className={cardBase}>
            <div>
              <span className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 tracking-widest uppercase">
                Year 11
              </span>
              {year11pricing.map((plan, idx) => (
                <div key={idx}>
                  <h4 className="h6 mt-2">{plan.header}</h4>
                  <h5 className="h3 font-bold pb-5 border-b-2 border-black">
                    {plan.price}
                  </h5>
                  <ul className="mt-4 space-y-3">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckSquare size={18} className="text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a
              href="/contact"
              className="mt-8 w-full text-center rounded-md p-3 bg-primary text-white font-semibold hover:bg-primary/80 transition-colors"
            >
              Get Started
            </a>
          </div>
          {/* Year 12 */}
          <div className={`${cardBase} ${cardAccent}`}>
            <div>
              <span className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-white/20 text-white tracking-widest uppercase">
                Year 12
              </span>
              {year12pricing.map((plan, idx) => (
                <div key={idx}>
                  <h4 className="h6 mt-2">{plan.header}</h4>
                  <h5 className="h3 font-bold pb-5 border-b-2 border-white">
                    {plan.price}
                  </h5>
                  <ul className="mt-4 space-y-3">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckSquare size={18} className="text-white" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a
              href="/contact"
              className="mt-8 w-full text-center rounded-md p-3 bg-white text-primary font-semibold hover:bg-white/80 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default Pricing;
