// components/Schools.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  sectionClass,
  sectionNameClass,
} from "@/lib/config/sharedclassesConfig";
import { schoolsData, schoolsSectionHeading } from "@/lib/config/schoolsConfig";

const SchoolCard = ({
  src,
  schoolName,
  alt,
}: {
  src: string | StaticImageData;
  schoolName: string;
  alt: string;
}) => (
  <figure className="relative h-full w-56 md:w-72 lg:w-80 xl:w-96 flex flex-col items-center justify-center bg-white p-4 py-8">
    <Image
      src={src}
      alt={alt}
      className="h-28 md:h-36 lg:h-44 w-auto mb-3 object-contain"
      width={220}
      height={120}
      loading="lazy"
    />
    <figcaption className="font-semibold text-sm text-center text-gray-700">
      {schoolName}
    </figcaption>
  </figure>
);

const Schools = () => {
  return (
    <section
      className={`${sectionClass} bg-white text-black text-center py-12 space-y-10`}
    >
      <BlurFade delay={0.1} inView>
        <div className="responsivePad">
          <h3 className={sectionNameClass}>
            {schoolsSectionHeading.toUpperCase()}
          </h3>
        </div>
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:24s]">
            {schoolsData.map((school, idx) => (
              <SchoolCard key={`${school.schoolName}-${idx}`} {...school} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-white"></div>
        </div>
      </BlurFade>
    </section>
  );
};

export default Schools;
