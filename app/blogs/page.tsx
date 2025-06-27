// app/blogs/page.tsx

import React from "react";
import type { Metadata } from "next";
import Blogs from "@/components/Blogs";
import Specialty from "@/components/Specialty";
import CTA from "@/components/CTA";
import PageTitle from "@/components/PageTitle";
import { fetchBlogs } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog | A1 Education",
  description:
    "Stay up to date with A1 Education's expert tips, study strategies, and HSC Economics resources.",
  alternates: {
    canonical: "https://a1education.com.au/blog",
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogs();

  return (
    <>
      <PageTitle
        heading="Our Blogs"
        subheading="Insights, tips, and strategies for excelling in HSC Economics."
        route="Home / Blogs"
      />
      <Blogs posts={posts} />
      <Specialty />
      <CTA />
    </>
  );
}
