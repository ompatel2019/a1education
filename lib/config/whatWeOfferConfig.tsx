// lib/config/whatWeOfferConfig.tsx

import { ReactNode } from "react";
import { AlarmClock, Book, Phone, Video, Info, Users } from "lucide-react";

export type WhatWeOfferPerk = {
  icon: ReactNode;
  perk: string;
  desc: string;
};

export const whatWeOfferPerks: WhatWeOfferPerk[] = [
  {
    icon: <AlarmClock className="text-white" size={26} />,
    perk: "Weekly 2-Hour Lessons",
    desc: "Interactive classes covering syllabus content, practice questions, and exam strategies.",
  },
  {
    icon: <Book className="text-white" size={26} />,
    perk: "Extensive Resources",
    desc: "Past HSC-style multiple choice, short answer, and essay questions; band 6 exemplar responses; step-by-step solutions.",
  },
  {
    icon: <Phone className="text-white" size={26} />,
    perk: "24/7 Support",
    desc: "Students can ask questions anytime via email, messaging apps, or our online communication portal.",
  },
  {
    icon: <Video className="text-white" size={26} />,
    perk: "Recorded Classes",
    desc: "Miss a class or need to revisit a concept? All sessions are recorded for easy revision.",
  },
  {
    icon: <Info className="text-white" size={26} />,
    perk: "Personalised Feedback",
    desc: "Detailed marking and feedback on essays, short answers, and assignment drafts.",
  },
  {
    icon: <Users className="text-white" size={26} />,
    perk: "Supportive Environment",
    desc: "Our supportive environment is crafted to build confidence and foster academic curiosity.",
  },
];

export const whatWeOfferHeading = "What we offer";
export const whatWeOfferSubheading =
  "At A1 Education, we combine proven teaching methodologies with comprehensive resources to help our students excel in Year 11–12 Economics in Sydney.";
