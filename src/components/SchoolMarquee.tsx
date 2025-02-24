import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import React from "react";

// Import your assets
import school1 from "../assets/school1.webp";
import school2 from "../assets/school2.webp";
import school3 from "../assets/school3.webp";
import school4 from "../assets/school4.webp";
import school5 from "../assets/school5.webp";
import school6 from "../assets/school6.webp";
import school7 from "../assets/school7.webp";
import school8 from "../assets/school8.webp";
import school9 from "../assets/school9.webp";
import school10 from "../assets/school10.webp";
import school11 from "../assets/school11.webp";

const schoolsData = [
  {
    name: school9,
    schoolName: "Macquarie Fields High School",
    alt: "Macquarie Fields High School logo",
  },
  {
    name: school10,
    schoolName: "William Clarke College",
    alt: "William Clarke College logo",
  },
  {
    name: school11,
    schoolName: "Penrith Selective High School",
    alt: "Penrith High School logo",
  },
  {
    name: school1,
    schoolName: "Strathfield Girls High School",
    alt: "Strathfield Girls High School logo",
  },
  {
    name: school2,
    schoolName: "Cumberland High School",
    alt: "Cumberland High School logo",
  },
  {
    name: school3,
    schoolName: "Cherrybrook Technology High School",
    alt: "Cherrybrook Technology High School logo",
  },
  {
    name: school4,
    schoolName: "Arthur Phillip High School",
    alt: "Arthur Phillip High School logo",
  },
  {
    name: school5,
    schoolName: "Girraween High School",
    alt: "Girraween High School logo",
  },
  {
    name: school6,
    schoolName: "Castle Hill High School",
    alt: "Castle Hill High School logo",
  },
  {
    name: school7,
    schoolName: "Parramatta High School",
    alt: "Parramatta High School logo",
  },
  {
    name: school8,
    schoolName: "St Marys Senior High School",
    alt: "St Marys Senior High School logo",
  },
];

const firstRow = schoolsData;

interface SchoolCardProps {
  name: string; // With Vite, imported assets are typically treated as strings (URLs)
  schoolName: string;
  alt: string;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ name, schoolName, alt }) => {
  return (
    <figure
      className={cn(
        "relative h-full 2xl:w-[412px] lg:w-96 md:w-80 w-72 cursor-pointer overflow-hidden rounded-lg p-6 py-8 text-left font-generalSans-semibold text-black",
        "border-gray-950/[.1] bg-white"
      )}
    >
      <div className="flex flex-row items-center gap-2 justify-center">
        <div className="flex flex-col justify-center items-center">
          {/* Use a regular <img> tag to render the image */}
          <img src={name} alt={alt} className="mb-2 lg:h-[176px] md:h-[120px] h-[96px]" />
          <figcaption className="font-medium dark:text-white text-center">
            {schoolName}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export default function SchoolMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((school) => (
          <SchoolCard key={school.schoolName} {...school} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
