// app/blogs/page.tsx

import React from "react";
import type { Metadata } from "next";
// import Specialty from "@/components/Specialty";
import LeadCollector from "@/components/LeadCollector";
import PageTitle from "@/components/PageTitle";
// TODO: Replace with new blog fetching logic

export const metadata: Metadata = {
  title: "Blog | A1 Education",
  description:
    "Stay up to date with A1 Education's expert tips, study strategies, and HSC Economics resources.",
  alternates: {
    canonical: "https://a1education.com.au/blog",
  },
};

export default async function BlogPage() {
  // TODO: Replace with new blog fetching logic
  // const posts = [];

  return (
    <>
      <PageTitle
        heading="Our Blogs"
        subheading="Insights, tips, and strategies for excelling in HSC Economics."
        route="Home / Blogs"
      />
      {/* <Blogs posts={posts} /> */}
      {/* <Specialty /> */}
      <LeadCollector />
    </>
  );
}
