// components/Specialty.tsx

"use client";
import React from "react";
import Link from "next/link";
import { BlurFade } from "./magicui/blur-fade";
import { motion } from "framer-motion";
import {
  specialties,
  perks,
  sectionName,
  sectionSubheading,
} from "@/lib/config/specialtyConfig";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";

const cardAnim = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};
const perkAnim = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

export default function Specialty() {
  return (
    <section className={sectionClass}>
      <BlurFade delay={0.15} inView className="space-y-4">
        <h2 className={sectionNameClass}>{sectionName.toUpperCase()}</h2>
        <h3 className={sectionSubheadingClass}>{sectionSubheading}</h3>
      </BlurFade>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Left: Class cards */}
        <div className="flex flex-col gap-8">
          {specialties.map((specialty, i) => (
            <motion.div
              key={specialty.name}
              variants={cardAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="
                group
                bg-white/80
                border-2 border-gray-100
                rounded-2xl
                shadow-md
                transition-all
                hover:shadow-2xl
                hover:border-blue-400
                hover:bg-white/90
                hover:backdrop-blur-[2px]
                hover:-translate-y-1
                duration-200
                flex flex-col
                min-h-[220px]
                relative
                overflow-hidden
              "
            >
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-400/30 to-primary/20 transition-all pointer-events-none" />
              <div className="p-7 flex flex-col gap-4 h-full">
                <div className="border-l-4 border-primary pl-3">
                  <div className="font-bold text-lg text-primary">
                    {specialty.name}
                  </div>
                </div>
                <div className="text-gray-700 text-base flex-1">
                  {specialty.desc}
                </div>
                <Link
                  href="/contact-us"
                  className="
                    mt-4 w-fit px-6 py-2
                    bg-primary text-white font-semibold rounded-md
                    shadow hover:shadow-lg active:scale-95
                    relative overflow-hidden
                    transition-all duration-150
                    before:absolute before:inset-0 before:opacity-0 before:bg-white/30
                    hover:before:opacity-60
                  "
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span className="relative z-10">Enrol Now</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Right: Perks */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: 0.15,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-primary text-white rounded-2xl p-10 min-h-full flex flex-col justify-center shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.name}
                  variants={perkAnim}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="flex flex-col gap-2 group"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon shimmer on hover */}
                    <span className="transition-all group-hover:text-sky-200 group-hover:animate-pulse">
                      {perk.number}
                    </span>
                    <span className="font-semibold text-lg">{perk.name}</span>
                  </div>
                  <p className="text-white/80">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
