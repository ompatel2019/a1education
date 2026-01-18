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
import { Quote } from "lucide-react";

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
        "flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 h-full",
        "transition-colors duration-300 hover:border-primary/30"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {statName}
        </span>
      </div>

      <div className="flex items-baseline gap-1 mt-2">
        <NumberTicker
          value={parseInt(stat.replace(/%|\+/g, ""))}
          className="text-5xl font-bold text-primary tracking-tight"
        />
        <span className="text-3xl font-bold text-primary/80">
          {metric}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </BlurFade>
);

// === TESTIMONIAL COMPONENT ===

const Testimonial = () => (
  <BlurFade delay={0.35} inView>
    <div className="flex h-full w-full flex-col justify-between rounded-xl border border-primary bg-primary/5 p-8 relative overflow-hidden min-h-[240px]">
      <div className="relative z-10">
        <Quote className="text-primary mb-4 size-8 fill-primary/20" />
        <p className="text-lg font-medium text-gray-900 leading-relaxed italic">
          &quot;{sectionSubheading}&quot;
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4 relative z-10">
        <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          AL
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">
            Arnav Lamba
          </div>
          <div className="text-xs text-primary font-medium">
            55% Y11 Prelim → 96% Y12 Trial
          </div>
        </div>
      </div>
    </div>
  </BlurFade>
);

// === OUR DIFFERENCE BOX ===

const DifferenceCard = () => (
  <BlurFade delay={0.45} inView>
    <div className="flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white p-8 min-h-[240px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {ourDifference.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-gray-900">{item.label}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stats */}
        {stats.map((item, i) => (
          <StatCard key={item.statName} {...item} index={i} />
        ))}
      </div>
      {/* Grid Layout fix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <Testimonial />
        <DifferenceCard />
      </div>
    </section>
  );
};

export default WhyChooseUs;
