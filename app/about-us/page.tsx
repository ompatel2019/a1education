// app/about-us/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | A1 Education",
  description:
    "Learn about A1 Education’s mission to empower high school students through expert HSC tutoring, small classes, and personalised support.",
  alternates: {
    canonical: "https://a1education.com.au/about-us",
  },
};

export default function AboutUsPage() {
  return <div>About Us Page</div>;
}
