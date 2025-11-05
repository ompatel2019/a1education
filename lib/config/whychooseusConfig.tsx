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
    desc: "students see at least a 25% improvement in scores after joining A1 Education.",
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
  '"I don\'t know if words are able to express how much A1 Education has helped with my economics progress. Prior to joining, I was averaging 60-70% with a 60% mark in year 11 preliminary economics exam. Through hard work and the diligent effort that A1 sustains with every student, I was able to turn these marks around. Through this tuition, I was effectively able to increase my marks with a 94% and 96% in term 3 and HSC economics trials, respectively. I highly recommend A1 education to all who want to succeed in economics."';

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
