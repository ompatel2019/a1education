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
        "flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white/95 px-7 py-7 shadow-[0_18px_50px_-40px_rgba(28,36,66,0.45)]",
        "hover-card group"
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-semibold flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden />
        {statName}
      </div>
      <div className="flex items-end gap-2">
        <NumberTicker
          value={parseInt(stat.replace(/%|\+/g, ""))}
          className="text-4xl md:text-5xl font-black text-primary group-hover:scale-110 transition"
        />
        <span className="text-2xl md:text-3xl font-semibold text-primary/70">
          {metric}
        </span>
      </div>
      <div className="text-slate-600 text-[15px] leading-relaxed">{desc}</div>
    </div>
  </BlurFade>
);

// === TESTIMONIAL COMPONENT ===

const Testimonial = () => (
  <BlurFade delay={0.35} inView>
    <div className="flex h-full w-full flex-col rounded-2xl border border-primary/10 bg-white/95 px-8 py-9 shadow-[0_18px_50px_-40px_rgba(28,36,66,0.45)] hover-card relative overflow-hidden min-h-[240px]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
      <div className="text-5xl text-primary/20 leading-none">“</div>
      <p className="mt-2 text-lg font-medium text-slate-900 leading-relaxed">
        {sectionSubheading}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
          A1
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Arnav Lamba
          </div>
          <div className="text-xs text-slate-600">
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
    <div className="flex h-full w-full flex-col rounded-2xl border border-primary/10 bg-white/95 px-8 py-9 shadow-[0_18px_50px_-40px_rgba(28,36,66,0.45)] hover-card min-h-[240px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
        {ourDifference.map((item) => (
          <div
            key={item.label}
            className="flex h-full items-start gap-4 rounded-xl border border-slate-200/80 bg-white/90 px-5 py-4 hover:bg-primary/[0.04] transition-colors"
          >
            <span className="mt-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-2xl">
              {item.icon}
            </span>
            <div className="space-y-1">
              <div className="font-semibold text-slate-900">{item.label}</div>
              <div className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </div>
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
