// components/AboutUs.tsx

"use client";
import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  aboutHeading,
  aboutSubheading,
  aboutTopDescription,
  aboutBottomDescription,
  aboutStats,
  aboutImage,
} from "@/lib/config/aboutConfig";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const whyChoose = [
  "Band 6 tutors, proven results",
  "Affordable, transparent fees",
  "Genuine care for every student",
  "Flexible in-person & online",
];

const AboutUs: React.FC = () => {
  return (
    <section className="relative py-12 md:py-20 w-full max-w-7xl mx-auto">
      <BlurFade delay={0.1} inView>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-12 items-center px-2 relative z-10">
          {/* IMAGE + Shine */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, type: "spring" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                width={520}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
              <motion.div
                className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[160%] h-32 rounded-full bg-white/20 blur-[44px] opacity-40"
                animate={{ x: [0, 40, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* TEXT/INFO */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, type: "spring" }}
            className="
              flex flex-col justify-center space-y-6 max-w-xl mx-auto
              border border-gray-200 bg-gray-50/90 rounded-2xl shadow-lg
              px-7 py-10 md:px-8
            "
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-1 tracking-tight">
                {aboutHeading.toUpperCase()}
              </h3>
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                {aboutSubheading}
              </h4>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {aboutTopDescription}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {aboutBottomDescription}
            </p>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-primary text-base tracking-wide">
                Why families choose A1:
              </span>
              <ul className="grid gap-2 pl-1">
                {whyChoose.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-800 text-[1rem]"
                  >
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/80px-4 px-2 py-3 mt-2 text-gray-600 text-sm border-l-4 border-primary italic">
              “We combine outstanding teaching, targeted feedback, and a
              nurturing environment so every student can thrive. Your success is
              our track record.”
            </div>
          </motion.div>
        </div>
      </BlurFade>

      {/* STATS */}
      <BlurFade delay={0.2} inView>
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8 mt-12 z-20 relative">
          {aboutStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * idx, duration: 0.7, type: "spring" }}
              className="flex flex-col items-center bg-white/95 shadow-xl rounded-2xl p-7 md:p-8"
            >
              <div className="flex items-end">
                <NumberTicker
                  className="h3 font-bold text-primary"
                  value={stat.value}
                />
                <span className="h4 font-semibold text-primary">
                  {stat.metric}
                </span>
              </div>
              <p className="p text-primary text-center font-medium mt-2">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </BlurFade>

      {/* Subtle BG gradient/blur for depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/60 via-blue-500/30 to-blue-300/20 blur-[2px]" />
    </section>
  );
};

export default AboutUs;
