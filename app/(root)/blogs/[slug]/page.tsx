// app/blogs/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHeader from "@/components/BlogHeader";
import { createServiceClient } from "@/lib/supabase/service";
// import LeadCollector from "@/components/LeadCollector";

interface BlogPost {
  id: number;
  slug: string;
  blog_hero: string | null;
  blog_header: string;
  blog_subheading: string;
  blog_tags: string[];
  blog_text: Array<{
    section_heading: string;
    section_text: string;
  }>;
  blog_context: {
    date: string;
    author: string;
    readTime?: string;
    publishedAt?: string;
  };
  created_at: string;
  updated_at: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("blog_header, blog_subheading, blog_context")
    .eq("slug", slug)
    .eq("draft", false)
    .single();

  if (!blog) {
    return {
      title: "Blog Post Not Found | A1 Education",
    };
  }

  const context = blog.blog_context as BlogPost["blog_context"];

  return {
    title: `${blog.blog_header} | A1 Education`,
    description: blog.blog_subheading,
    openGraph: {
      title: blog.blog_header,
      description: blog.blog_subheading,
      type: "article",
      publishedTime: context.publishedAt || context.date,
      authors: context.author ? [context.author] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("draft", false)
    .single();

  if (error || !blog) {
    notFound();
  }

  const blogData = blog as BlogPost;
  const tags = (blogData.blog_tags || []) as string[];
  const sections = (blogData.blog_text || []) as Array<{
    section_heading: string;
    section_text: string;
  }>;
  const context = (blogData.blog_context || {}) as BlogPost["blog_context"];

  return (
    <>
      <BlogHeader
        title={blogData.blog_header}
        subheading={blogData.blog_subheading}
        tags={tags}
        blogHero={blogData.blog_hero}
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          {/* Author and Date */}
          {(context.author || context.date) && (
            <div className="mb-8 text-gray-600">
              {context.author && (
                <>
                  <span className="font-medium">By {context.author}</span>
                  {context.date && <span className="mx-2">•</span>}
                </>
              )}
              {context.date && (
                <time dateTime={context.date}>
                  {new Date(context.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          )}

          {/* Blog Sections */}
          {sections.length > 0 ? (
            <div className="text-gray-700 leading-relaxed space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  {section.section_heading && (
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                      {section.section_heading}
                    </h2>
                  )}
                  {section.section_text && (
                    <p className="mb-6 whitespace-pre-line">
                      {section.section_text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-700 leading-relaxed">
              No content available.
            </div>
          )}
        </div>
      </article>

      {/* <LeadCollector /> */}
    </>
  );
}
