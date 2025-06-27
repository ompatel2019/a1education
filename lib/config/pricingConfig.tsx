// lib/config/pricingConfig.tsx
export const sectionName = "Pricing";
export const sectionSubheading =
  "Our competitive pricing is designed for accessibility and value, ensuring every student can achieve their best without compromise.";

// Common perks
export const commonPerks = [
  "Weekly 2-hour class lessons",
  "Unlimited 24/7 help",
  "Assignment & Exams Support",
  "Recorded Lessons",
  "Progress Reports",
];

export const year11pricing = [
  {
    header: "Billed Termly",
    price: "$30/hour",
    perks: ["$600 p/term", ...commonPerks],
  },
];

export const year12pricing = [
  {
    header: "Billed Termly",
    price: "$35/hour",
    perks: ["$700 p/term", "Regular Assessments with feedback", ...commonPerks],
  },
];
