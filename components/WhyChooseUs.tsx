// components/WhyChooseUs.tsx

import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import {
  stats,
  sectionName,
  sectionSubheading,
  ourDifference,
} from "@/lib/config/whychooseusConfig";
import {
  sectionClass,
  sectionNameClass,
} from "@/lib/config/sharedclassesConfig";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";

// === STAT CARD COMPONENT ===

interface StatCardProps {
  statName: string;
  stat: string;
  metric: string;
  desc: string;
  index: number;
}

const StatCard = ({ statName, stat, metric, desc, index }: StatCardProps) => (
  <BlurFade delay={0.1 + index * 0.1} inView>
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-black/10 bg-white px-6 py-7 shadow-sm group transition-all",
        "hover:-translate-y-2 hover:shadow-xl"
      )}
    >
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold mb-2">
        {statName}
      </div>
      <div className="flex items-end gap-1">
        <NumberTicker
          value={parseInt(stat.replace(/%|\+/g, ""))}
          className="text-4xl font-extrabold text-primary group-hover:scale-110 transition"
        />
        <span className="text-2xl font-bold text-primary/70">{metric}</span>
      </div>
      <div className="text-gray-500 text-[15px] mt-3">{desc}</div>
    </div>
  </BlurFade>
);

// === TESTIMONIAL COMPONENT ===

const Testimonial = () => (
  <BlurFade delay={0.35} inView>
    <div className="flex flex-col h-full w-full items-start rounded-xl border border-black/10 bg-white px-7 py-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group min-h-[220px]">
      <div className="text-lg font-medium text-gray-800 leading-relaxed">
        {sectionSubheading}
      </div>
      <div className="text-sm text-gray-500 mt-4 font-semibold">
        — Arnav Lamba, 55% Y11 Prelim → 96% Y12 Trial
      </div>
    </div>
  </BlurFade>
);

// === OUR DIFFERENCE BOX ===

const DifferenceCard = () => (
  <BlurFade delay={0.45} inView>
    <div className="flex flex-col h-full w-full rounded-xl border border-black/10 bg-white px-7 py-8 shadow-sm hover:shadow-lg transition-all min-h-[220px]">
      <div className="flex flex-col justify-around gap-5 flex-1">
        {ourDifference.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <span className="mt-1 text-primary text-2xl">{item.icon}</span>
            <div>
              <div className="font-bold text-md">{item.label}</div>
              <div className="text-gray-500 text-sm">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </BlurFade>
);

// === MAIN COMPONENT ===

const WhyChooseUs = () => {
  return (
    <section className={sectionClass}>
      <BlurFade delay={0.1} inView>
        <h3 className={sectionNameClass}>{sectionName.toUpperCase()}</h3>
      </BlurFade>
      <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {/* Stats */}
        {stats.map((item, i) => (
          <StatCard key={item.statName} {...item} index={i} />
        ))}
      </div>
      {/* THE FIX: items-stretch & remove h-full wrappers */}
      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 items-stretch">
        <Testimonial />
        <DifferenceCard />
      </div>
    </section>
  );
};

export default WhyChooseUs;
