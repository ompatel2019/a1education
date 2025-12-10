// app/blogs/page.tsx

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LeadCollector from "@/components/LeadCollector";
import PageTitle from "@/components/PageTitle";
import { createServiceClient } from "@/lib/supabase/service";

const gradBg =
  "bg-[linear-gradient(to_bottom,_#4569F7_0%,_#5296E3_50%,_#7A8BD1_100%)]";

type TagStyle = {
  label?: string;
  bgColor?: string;
  textColor?: string;
};

interface BlogPost {
  slug: string;
  blog_hero: string | null;
  blog_header: string;
  blog_subheading: string;
  blog_tags: string[];
  blog_context: {
    date: string;
    author:
      | string
      | {
          name?: string;
          position?: string;
          pfp?: string;
        };
    readTime?: string;
    headingColor?: string;
    subheadingColor?: string;
    tagStyles?: TagStyle[];
  };
  draft?: boolean;
}

export const metadata: Metadata = {
  title: "Blogs | A1 Education",
  description:
    "Stay up to date with A1 Education's expert tips, study strategies, and HSC Economics resources.",
  alternates: {
    canonical: "https://a1education.com.au/blogs",
  },
};

export const revalidate = 600;

export default async function BlogPage() {
  const supabase = createServiceClient();

  // Fetch all published blogs (ordered by created_at descending)
  const { data: blogs } = await supabase
    .from("blogs")
    .select(
      "slug, blog_hero, blog_header, blog_subheading, blog_tags, blog_context, draft"
    )
    .eq("draft", false)
    .order("created_at", { ascending: false });

  return (
    <>
      <PageTitle
        heading="Our Blogs"
        subheading="Insights, tips, and strategies for excelling in HSC Economics."
        route="Home / Blogs"
      />

      {/* Blog Display */}
      <section className="py-16 pb-32 lg:pb-64 responsivePad">
        <div className="">
          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => {
                const blogPost = blog as BlogPost;
                const tags = (blogPost.blog_tags || []) as string[];
                const context = (blogPost.blog_context ||
                  {}) as BlogPost["blog_context"];
                const authorName =
                  typeof context.author === "string"
                    ? context.author
                    : context.author?.name || "";
                const tagStyles: TagStyle[] = Array.isArray(context.tagStyles)
                  ? context.tagStyles
                      .filter(
                        (style): style is TagStyle =>
                          !!style && typeof style === "object"
                      )
                      .map((style) => ({
                        label:
                          typeof style.label === "string" ? style.label : "",
                        bgColor:
                          typeof style.bgColor === "string"
                            ? style.bgColor
                            : undefined,
                        textColor:
                          typeof style.textColor === "string"
                            ? style.textColor
                            : undefined,
                      }))
                  : [];
                const resolveTagStyle = (label: string) => {
                  const match = tagStyles.find(
                    (style) =>
                      (style.label || "").toLowerCase() === label.toLowerCase()
                  );
                  return {
                    backgroundColor: match?.bgColor || "rgba(70,104,247,0.12)",
                    color: match?.textColor || "#4668f7",
                  };
                };

                return (
                  <article
                    key={blogPost.slug}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link
                      href={`/blogs/${blogPost.slug}`}
                      className="flex flex-col"
                    >
                      {/* Blog Hero Image or Placeholder */}
                      {blogPost.blog_hero ? (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={blogPost.blog_hero}
                            alt={blogPost.blog_header}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative w-full aspect-video ${gradBg} flex items-center justify-center`}
                        >
                          <div className="text-white text-4xl opacity-50">
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
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4 md:p-6 flex-1">
                        {/* Tags */}
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-xs font-semibold rounded-full border border-transparent"
                                style={resolveTagStyle(tag)}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Author and Date */}
                        {context && (authorName || context.date) && (
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            {authorName && (
                              <>
                                <span className="font-medium">
                                  {authorName}
                                </span>
                                {context.date && (
                                  <span className="mx-2">•</span>
                                )}
                              </>
                            )}
                            {context.date && (
                              <time dateTime={context.date}>
                                {new Date(context.date).toLocaleDateString(
                                  "en-AU",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </time>
                            )}
                            {context.readTime && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{context.readTime}</span>
                              </>
                            )}
                          </div>
                        )}

                        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                          {blogPost.blog_header}
                        </h3>

                        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {blogPost.blog_subheading}
                        </p>

                        <div className="mt-4">
                          <span className="inline-flex items-center text-primary font-medium hover:underline">
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
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No blog posts available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Text Container */}
      <section className="py-12 responsivePad">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl border border-primary/20 shadow-lg p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-1 bg-primary rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                Each week we send sharp insights, proven frameworks, and insider
                exam strategies designed to help you move confidently towards
                Band 6.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LeadCollector />
    </>
  );
}
