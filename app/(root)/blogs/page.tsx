// app/blogs/page.tsx

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LeadCollector from "@/components/LeadCollector";
import PageTitle from "@/components/PageTitle";

// Sample blog data - in a real app, this would come from a CMS/database
const sampleBlogs = [
  {
    slug: "sample-blog-1",
    title: "Sample Blog Post 1",
    excerpt:
      "This is a sample blog post to demonstrate the blog functionality and showcase our content structure.",
    content: "Blog content will go here...",
    publishedAt: "2025-01-06",
    author: "A1 Education Team",
    readTime: "5 min read",
  },
  {
    slug: "sample-blog-2",
    title: "Understanding HSC Economics: A Complete Guide",
    excerpt:
      "Master the fundamentals of HSC Economics with our comprehensive guide covering all key concepts and exam strategies.",
    content: "Full blog content...",
    publishedAt: "2025-01-05",
    author: "Sarah Johnson",
    readTime: "8 min read",
  },
  {
    slug: "sample-blog-3",
    title: "Top 10 Study Tips for Economics Students",
    excerpt:
      "Discover proven study techniques and strategies that will help you excel in your HSC Economics examinations.",
    content: "Study tips content...",
    publishedAt: "2025-01-04",
    author: "Dr. Michael Chen",
    readTime: "6 min read",
  },
  {
    slug: "sample-blog-4",
    title: "Market Structures: Perfect Competition vs Monopoly",
    excerpt:
      "Learn the key differences between various market structures and their impact on pricing and consumer welfare.",
    content: "Market structures content...",
    publishedAt: "2025-01-03",
    author: "Emma Thompson",
    readTime: "7 min read",
  },
  {
    slug: "sample-blog-5",
    title: "Macroeconomics: Understanding Fiscal Policy",
    excerpt:
      "Explore how government spending and taxation policies influence economic growth and stability.",
    content: "Fiscal policy content...",
    publishedAt: "2025-01-02",
    author: "Prof. David Wilson",
    readTime: "9 min read",
  },
  {
    slug: "sample-blog-6",
    title: "Supply and Demand: Real World Applications",
    excerpt:
      "See how supply and demand principles apply to everyday economic situations and market dynamics.",
    content: "Supply and demand content...",
    publishedAt: "2025-01-01",
    author: "Lisa Park",
    readTime: "6 min read",
  },
];

export const metadata: Metadata = {
  title: "Blog | A1 Education",
  description:
    "Stay up to date with A1 Education's expert tips, study strategies, and HSC Economics resources.",
  alternates: {
    canonical: "https://a1education.com.au/blog",
  },
};

export default async function BlogPage() {
  return (
    <>
      <PageTitle
        heading="Our Blogs"
        subheading="Insights, tips, and strategies for excelling in HSC Economics."
        route="Home / Blogs"
      />

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleBlogs.map((blog) => (
              <article
                key={blog.slug}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blogs/${blog.slug}`}>
                  {/* Placeholder Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-blue-500 text-4xl">
                      <svg
                        className="w-16 h-16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      Placeholder
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="font-medium">{blog.author}</span>
                      <span className="mx-2">•</span>
                      <time dateTime={blog.publishedAt}>
                        {new Date(blog.publishedAt).toLocaleDateString(
                          "en-AU",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-4">
                      <span className="inline-flex items-center text-primary font-medium text-sm hover:underline">
                        Read more
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LeadCollector />
    </>
  );
}
