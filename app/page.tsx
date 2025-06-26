// app/page.tsx
import Hero from "@/components/Hero";
import Specialty from "@/components/Specialty";
import WhyChooseUs from "@/components/WhyChooseUs";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "A1 Education | HSC Economics Tutoring in Sydney (Years 11–12)",
  description:
    "Specialist tutoring for HSC Economics in Sydney. Small classes, expert tutors, personalised feedback, and proven results. Start with a free trial.",
  alternates: {
    canonical: "https://a1education.com.au/",
  },
  openGraph: {
    title: "HSC Economics Tutoring Sydney | A1 Education",
    description:
      "Top-ranked HSC Economics tutoring in Sydney for Year 11 & 12 students. Achieve Band 6 with expert support and 24/7 help.",
    url: "https://a1education.com.au/",
    siteName: "A1 Education",
    type: "website",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "HSC Economics Tutoring in Sydney by A1 Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A1 Education | Sydney’s #1 HSC Economics Tutors",
    description:
      "Join the top HSC Economics tutoring centre in Sydney. Small classes, recorded lessons, and band 6 results.",
    images: ["/web-app-manifest-512x512.png"],
  },
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Specialty/>
      <WhyChooseUs/>
    </>
  );
}
