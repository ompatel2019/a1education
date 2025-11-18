// lib/config/pricingConfig.tsx
export const sectionName = "Pricing";
export const sectionSubheading =
  "Choose the perfect plan for your academic journey. All plans include comprehensive support, resources, and proven results.";

// Pricing plans for different year levels
export const pricingPlans = [
  {
    year: "Year 11",
    price: "$30/hr",
    duration: "2-hour class",
    features: [
      "Weekly 2-hour class lessons",
      "Unlimited 24/7 help",
      "Personalised assignment & exam support",
      "Recorded lessons",
      "Essay writing support",
      "Mock exams",
      "Targeted workshops for exams",
      "Access to school-specific exam resources",
      "Intensive exam programs (pre-Prelims)",
      "Access to school-specific predictions",
    ],
    popular: true,
  },
  {
    year: "Year 12",
    price: "$35/hr",
    duration: "3-hour class",
    features: [
      "Weekly 3-hour class lessons",
      "Unlimited 24/7 help",
      "Personalised assignment & exam support",
      "Recorded lessons",
      "Essay writing support",
      "Mock exams",
      "Intensive exam programs (pre-Trials)",
      "Intensive exam programs (pre-HSC)",
      "Exam predictions",
      "School-specific resources",
      "One-on-one strategy support for Trials",
      "One-on-one strategy support for HSC",
    ],
    popular: false,
  },
];
