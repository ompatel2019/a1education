// lib/config/specialtyConfig.tsx

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
    name: "Content Mastery",
    desc: "Connect syllabus to real-world events - RBA decisions, federal budgets - think like an economist, not just a student.",
  },
  {
    number: <TbHexagonNumber2 className="xl:size-10 lg:size-8 size-6" />,
    name: "Exam Technique",
    desc: "Practice exams and essays in every session. Write like a Band 6 candidate under exam conditions.",
  },
  {
    number: <TbHexagonNumber3 className="xl:size-10 lg:size-8 size-6" />,
    name: "Resources",
    desc: "Exclusive Band 6 essays, model answers, recorded lessons, and 24/7 Q&A support.",
  },
  {
    number: <TbHexagonNumber4 className="xl:size-10 lg:size-8 size-6" />,
    name: "Support",
    desc: "Direct exam and assignment support. Predictions, mock papers, and school-specific resources.",
  },
  {
    number: <TbHexagonNumber5 className="xl:size-10 lg:size-8 size-6" />,
    name: "Proven Success",
    desc: "25% average improvement. Students consistently rank top of their schools and secure Band 6's.",
  },
  {
    number: <TbHexagonNumber6 className="xl:size-10 lg:size-8 size-6" />,
    name: "Personalised Coaching",
    desc: "Small classes with individual feedback and tailored guidance. Students receive personalised feedback on their essays and short answers.",
  },
];

export const sectionName = "The A1 Formula for Band 6 Success";
export const sectionSubheading =
  "Our proven methodology combines expert teaching, comprehensive resources, and personalized support to deliver consistent Band 6 results.";
