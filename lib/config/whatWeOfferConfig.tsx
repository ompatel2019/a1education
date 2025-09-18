// lib/config/whatWeOfferConfig.tsx

import { ReactNode } from "react";
import {
  Clock,
  BookOpen,
  MessageCircle,
  PlayCircle,
  FileText,
  Target,
} from "lucide-react";

export type WhatWeOfferPerk = {
  icon: ReactNode;
  perk: string;
  desc: string;
};

export const whatWeOfferPerks: WhatWeOfferPerk[] = [
  {
    icon: <Clock className="text-white" size={26} />,
    perk: "Weekly Lessons",
    desc: "Master the syllabus in interactive 2–3 hour classes built around theory, exam drills, and real-world economics",
  },
  {
    icon: <BookOpen className="text-white" size={26} />,
    perk: "Extensive Resources",
    desc: "Band 6 notes, 100+ past papers, exemplar essays, A1-predicted exams, quizzes, and up-to-date statistics — everything in one place.",
  },
  {
    icon: <MessageCircle className="text-white" size={26} />,
    perk: "24/7 Support",
    desc: "Ask questions anytime. Instant feedback through our dedicated channels so you're never stuck.",
  },
  {
    icon: <PlayCircle className="text-white" size={26} />,
    perk: "Recorded lessons",
    desc: "Every lesson is recorded so you can revise, catch up, and revisit key concepts whenever you need.",
  },
  {
    icon: <FileText className="text-white" size={26} />,
    perk: "Personalised Feedback",
    desc: "Detailed marking and tailored advice on essays, short answers, and assignments — feedback that drives results.",
  },
  {
    icon: <Target className="text-white" size={26} />,
    perk: "Exam Environments",
    desc: "A supportive, high-achieving community that builds confidence and prepares you to think and write like a Band 6 economist.",
  },
];

export const whatWeOfferHeading = "Inside the A1 Experience";
export const whatWeOfferSubheading =
  "At A1 Education, we combine proven teaching methodologies with comprehensive resources to help our students excel in Year 11–12 Economics in Sydney.";
