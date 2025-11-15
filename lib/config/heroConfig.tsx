// lib/config/heroConfig.tsx

import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
} from "react-icons/tb";
import hero1 from "@/app/assets/images/hero1.webp";
import hero2 from "@/app/assets/images/hero2.webp";
import hero3 from "@/app/assets/images/hero3.webp";
import hero4 from "@/app/assets/images/hero4.webp";
import hero5 from "@/app/assets/images/hero5.webp";
import hero6 from "@/app/assets/images/hero6.webp";
import hero7 from "@/app/assets/images/hero7.webp";
import hero8 from "@/app/assets/images/hero8.webp";
import hero9 from "@/app/assets/images/hero9.webp";
import hero10 from "@/app/assets/images/hero10.webp";
import hero11 from "@/app/assets/images/hero11.webp";
import hero12 from "@/app/assets/images/hero12.webp";
import hero13 from "@/app/assets/images/hero13.webp";
import hero14 from "@/app/assets/images/hero14.webp";
import { ReactElement } from "react";
import { StaticImageData } from "next/image";

export const heroTopText = "Preliminary and HSC Economics Tutoring";
export const heroHeading = "Maximise Your Potential. Master HSC Economics.";

export type ThreeStep = {
  numberIcon: ReactElement;
  step: string;
};
export const threeSteps: ThreeStep[] = [
  {
    numberIcon: <TbHexagonNumber1 className="xl:size-10 lg:size-8 size-6" />,
    step: "Learn",
  },
  {
    numberIcon: <TbHexagonNumber2 className="xl:size-10 lg:size-8 size-6" />,
    step: "Apply",
  },
  {
    numberIcon: <TbHexagonNumber3 className="xl:size-10 lg:size-8 size-6" />,
    step: "Master",
  },
];

export type HeroImage = {
  src: StaticImageData;
  alt: string;
};
export const heroImages: HeroImage[] = [
  { src: hero1, alt: "Image of Students at A1 Education #1" },
  { src: hero12, alt: "Image of Students at A1 Education #12" },
  { src: hero3, alt: "Image of Students at A1 Education #3" },
  { src: hero4, alt: "Image of Students at A1 Education #4" },
  { src: hero9, alt: "Image of Students at A1 Education #9" },
  { src: hero6, alt: "Image of Students at A1 Education #6" },
  { src: hero14, alt: "Image of Students at A1 Education #14" },
  { src: hero5, alt: "Image of Students at A1 Education #5" },
  { src: hero13, alt: "Image of Students at A1 Education #13" },
  { src: hero7, alt: "Image of Students at A1 Education #7" },
  { src: hero2, alt: "Image of Students at A1 Education #2" },
  { src: hero11, alt: "Image of Students at A1 Education #11" },
  { src: hero8, alt: "Image of Students at A1 Education #8" },
  { src: hero10, alt: "Image of Students at A1 Education #10" },
];

export type HeroButton = {
  name: string;
  to: string;
};
export const heroButtons: HeroButton[] = [
  { name: "Join Now", to: "/contact-us" },
];
