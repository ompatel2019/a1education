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
    statName: "Trusted by Families",
    stat: "100+",
    metric: "",
    desc: "Sydney families have trusted us to deliver quality economics tutoring.",
  },
];

export const sectionName = "Why Choose Us";
export const sectionSubheading =
  '"Karan is a knowledgeable and approachable tutor with clear expertise in economics. He explains complex concepts logically and with ease, showing genuine interest in student performance. His detailed marking and comprehensive resources, including band six notes and a question bank, significantly enhance response writing skills. Initially struggling with short answers and essay structures, I improved markedly under his guidance. Karan is also very responsive, always providing timely feedback. I highly recommend him as an exceptional economics tutor."';

// "Our Difference" Items
export const ourDifference = [
  {
    icon: <FaRegHandshake />,
    label: "Personal Connection",
    desc: "We build lasting relationships and tailor our teaching for each student.",
  },
  {
    icon: <FaRegLightbulb />,
    label: "Expert Mentors",
    desc: "All tutors scored Band 6 and have deep HSC experience.",
  },
  {
    icon: <FaRegClock />,
    label: "Flexible Support",
    desc: "Access 24/7 homework help and extra resources when you need it.",
  },
  {
    icon: <FaRegStar />,
    label: "Proven Outcomes",
    desc: "Consistent mark improvements and positive feedback every year.",
  },
];
