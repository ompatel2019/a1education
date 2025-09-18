// lib/config/whychooseusConfig.tsx

import {
  FaRegHandshake,
  FaRegLightbulb,
  FaRegClock,
  FaRegStar,
} from "react-icons/fa";
// Stat Items
export type statItem = {
  statName: string;
  stat: string;
  metric: string;
  desc: string;
};

export const stats: statItem[] = [
  {
    statName: "Average Increase In Marks",
    stat: "25%",
    metric: "%",
    desc: "students see at least a 25% improvement in scores after joining A1Education.",
  },
  {
    statName: "Satisfaction Rate",
    stat: "100%",
    metric: "%",
    desc: "high approval from parents and students for our engaging lessons and strong support.",
  },
  {
    statName: "Outperform School Average",
    stat: "95%",
    metric: "%",
    desc: "of our students score above their school's average in Prelim and HSC Economics.",
  },
  {
    statName: "Top rankers",
    stat: "35",
    metric: "%",
    desc: "Students are top rankers in their cohorts and are keeping their position at the top.",
  },
];

export const sectionName = "The A1 Difference";
export const sectionSubheading =
  '"Joined Karan recently and loving it. He simplifies concepts in an intriguing manner. Can\'t go wrong with his fast replies to any question."';

// "Our Difference" Items
export const ourDifference = [
  {
    icon: <FaRegHandshake />,
    label: "Built by Economists",
    desc: "A1 was founded by economics specialists who live and breathe the subject.",
  },
  {
    icon: <FaRegLightbulb />,
    label: "Community of High Achievers",
    desc: "You'll study alongside motivated peers who raise the standard every week.",
  },
  {
    icon: <FaRegClock />,
    label: "Beyond Tuition",
    desc: "We mentor, predict, and prepare - not just teach.",
  },
  {
    icon: <FaRegStar />,
    label: "Trusted Results",
    desc: "Schools across Sydney recognise A1 students as the best in Economics.",
  },
];
