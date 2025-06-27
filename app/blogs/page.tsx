// app/blogs/page.tsx

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | A1 Education",
  description:
    "Stay up to date with A1 Education's expert tips, study strategies, and HSC Economics resources.",
  alternates: {
    canonical: "https://a1education.com.au/blog",
  },
};

export default function BlogPage() {
  return <div>Blog Page</div>;
}
