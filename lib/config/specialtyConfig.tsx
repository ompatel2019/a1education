// lib/config/sepcialtyConfig.tsx
import { ReactElement } from "react";
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
  TbHexagonNumber5,
  TbHexagonNumber6,
} from "react-icons/tb";

type specialtyItem = {
  tags: Array<string>;
  name: string;
  desc: string;
};
type perkItem = {
  number: ReactElement;
  name: string;
  desc: string;
};

export const specialties: specialtyItem[] = [
  {
    tags: ["Year 11", "Economics"],
    name: "Year 11 Economics",
    desc: "Start your Preliminary HSC Economics journey with foundational concepts and skills that set you up for success. Our expert tutors in Sydney guide you through every topic.",
  },
  {
    tags: ["Year 12", "Economics"],
    name: "Year 12 Economics",
    desc: "Excel in your HSC with our specialized Year 12 Economics tutoring. Master complex theories and ace your exams with tailored support and proven strategies.",
  },
];

export const perks: perkItem[] = [
  {
    number: <TbHexagonNumber1 className="xl:size-10 lg:size-8 size-6" />,
    name: "Small Class Sizes",
    desc: "We limit our classes to a maximum of 12 students, ensuring individual attention and a supportive learning environment.",
  },
  {
    number: <TbHexagonNumber2 className="xl:size-10 lg:size-8 size-6" />,
    name: "Structured Lessons",
    desc: "Each 2-hour session combines comprehensive content with practice questions—multiple choice, short answer, and essays.",
  },
  {
    number: <TbHexagonNumber3 className="xl:size-10 lg:size-8 size-6" />,
    name: "Critical Learning",
    desc: "Focus on critical thinking and real-world applications to ensure students understand beyond memorization.",
  },
  {
    number: <TbHexagonNumber4 className="xl:size-10 lg:size-8 size-6" />,
    name: "Rich Resources",
    desc: "Access to a wide array of study materials including recorded lessons, practice papers, and 24/7 homework help.",
  },
  {
    number: <TbHexagonNumber5 className="xl:size-10 lg:size-8 size-6" />,
    name: "Consistent Results",
    desc: "Students regularly outperform their peers, with most seeing a 25% mark increase through our coaching.",
  },
  {
    number: <TbHexagonNumber6 className="xl:size-10 lg:size-8 size-6" />,
    name: "Personalised Coaching",
    desc: "Direct guidance from experienced tutors, offering tailored advice to meet your unique academic needs.",
  },
];

export const sectionName = "Specialty";
export const sectionSubheading =
  "Sydney’s top choice for Year 11–12 Economics. Small classes (12-people), real skills, proven results. Ready to level up?";
