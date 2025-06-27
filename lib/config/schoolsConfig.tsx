// lib/config/schoolsConfig.tsx

import school1 from "@/app/assets/images/school1.webp";
import school2 from "@/app/assets/images/school2.webp";
import school3 from "@/app/assets/images/school3.webp";
import school4 from "@/app/assets/images/school4.webp";
import school5 from "@/app/assets/images/school5.webp";
import school6 from "@/app/assets/images/school6.webp";
import school7 from "@/app/assets/images/school7.webp";
import school8 from "@/app/assets/images/school8.webp";
import school9 from "@/app/assets/images/school9.webp";
import school10 from "@/app/assets/images/school10.webp";
import school11 from "@/app/assets/images/school11.webp";
import { StaticImageData } from "next/image";

// array of school objects
export const schoolsData: {
  src: StaticImageData;
  schoolName: string;
  alt: string;
}[] = [
  {
    src: school9,
    schoolName: "Macquarie Fields High School",
    alt: "Macquarie Fields High School logo",
  },
  {
    src: school10,
    schoolName: "William Clarke College",
    alt: "William Clarke College logo",
  },
  {
    src: school11,
    schoolName: "Penrith Selective High School",
    alt: "Penrith High School logo",
  },
  {
    src: school1,
    schoolName: "Strathfield Girls High School",
    alt: "Strathfield Girls High School logo",
  },
  {
    src: school2,
    schoolName: "Cumberland High School",
    alt: "Cumberland High School logo",
  },
  {
    src: school3,
    schoolName: "Cherrybrook Technology High School",
    alt: "Cherrybrook Technology High School logo",
  },
  {
    src: school4,
    schoolName: "Arthur Phillip High School",
    alt: "Arthur Phillip High School logo",
  },
  {
    src: school5,
    schoolName: "Girraween High School",
    alt: "Girraween High School logo",
  },
  {
    src: school6,
    schoolName: "Castle Hill High School",
    alt: "Castle Hill High School logo",
  },
  {
    src: school7,
    schoolName: "Parramatta High School",
    alt: "Parramatta High School logo",
  },
  {
    src: school8,
    schoolName: "St Marys Senior High School",
    alt: "St Marys Senior High School logo",
  },
];

export const schoolsSectionHeading = "We have students from";
