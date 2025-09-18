// components/Pricing.tsx

"use client";
import React, { useState } from "react";
import { BlurFade } from "./magicui/blur-fade";
import {
  sectionName,
  sectionSubheading,
  pricingPlans,
} from "@/lib/config/pricingConfig";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import { CheckSquare } from "lucide-react";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState(1); // Default to Year 11

  return (
    <section className={sectionClass} id="pricing">
      <BlurFade delay={0.25} inView>
        <div className="text-center space-y-2">
          <h2 className={sectionNameClass}>{sectionName.toUpperCase()}</h2>
          <h3 className={sectionSubheadingClass}>{sectionSubheading}</h3>
        </div>
      </BlurFade>

      <BlurFade delay={0.5} inView>
        <div className="w-full max-w-4xl mx-auto mt-10">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-2xl flex">
              {pricingPlans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? "bg-primary text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-primary hover:bg-white"
                  }`}
                >
                  {plan.year}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Card - Original Design */}
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                activeTab === index ? "opacity-100 block" : "opacity-0 hidden"
              }`}
            >
              <div className="w-full lg:w-[55%] flex flex-col justify-between bg-white/80 border-2 border-black rounded-xl shadow-lg p-6 md:p-8 mx-auto transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                <div>
                  <span className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 tracking-widest uppercase">
                    {plan.year}
                  </span>
                  <h4 className="h6 mt-2">Billed Termly</h4>
                  <h5 className="h3 font-bold pb-5 border-b-2 border-black">
                    {plan.price}
                  </h5>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckSquare size={18} className="text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="/contact-us"
                  className="mt-8 w-full text-center rounded-md p-3 bg-primary text-white font-semibold hover:bg-primary/80 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
};

export default Pricing;
