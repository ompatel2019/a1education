// app/blogs/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import BlogDownloadables, {
  type BlogDownloadableResource,
} from "@/components/BlogDownloadables";
import BlogSidebar from "@/components/BlogSidebar";
import { createServiceClient } from "@/lib/supabase/service";

type TagStyle = {
  label: string;
  bgColor?: string;
  textColor?: string;
};

type AuthorInfo = {
  name: string;
  position: string;
  pfp: string;
  profileId?: string;
  pfpPosition?: string;
};

type BlogContext = {
  date: string;
  readTime?: string;
  author: AuthorInfo | string;
  contributors?: Array<{
    name: string;
    position: string;
    pfp: string;
    profileId?: string;
    pfpPosition?: string;
  }>;
  publishedAt?: string;
  tagStyles?: TagStyle[];
  headingColor?: string;
  subheadingColor?: string;
};

interface BlogPost {
  id: number;
  slug: string;
  blog_hero: string | null;
  blog_header: string;
  blog_subheading: string;
  blog_tags: string[];
  blog_text: string | Array<{ section_heading: string; section_text: string }>;
  blog_context: BlogContext;
  blog_downloadables: BlogDownloadableResource[];
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

// Helper to normalize author from string or object
function normalizeAuthor(author: AuthorInfo | string | undefined): AuthorInfo {
  if (!author) return { name: "", position: "", pfp: "" };
  if (typeof author === "string") {
    return { name: author, position: "", pfp: "" };
  }
  return {
    name: author.name || "",
    position: author.position || "",
    pfp: author.pfp || "",
    profileId: author.profileId || "",
    pfpPosition: author.pfpPosition || "50% 50%",
  };
}

function normalizeContributors(
  contributors: BlogContext["contributors"]
): AuthorInfo[] {
  if (!Array.isArray(contributors)) return [];
  return contributors
    .map((contributor) => ({
      name: contributor?.name || "",
      position: contributor?.position || "",
      pfp: contributor?.pfp || "",
      profileId: contributor?.profileId || "",
      pfpPosition: contributor?.pfpPosition || "50% 50%",
    }))
    .filter((c) => c.name);
}

// Helper to convert old section-based content to HTML
function contentToHtml(
  blogText: string | Array<{ section_heading: string; section_text: string }>
): string {
  if (typeof blogText === "string") {
    // Check for empty content
    if (!blogText.trim() || blogText === "[]") {
      return "";
    }

    // Already HTML or needs to be parsed
    try {
      const parsed = JSON.parse(blogText);
      if (Array.isArray(parsed)) {
        // Empty array means no content
        if (parsed.length === 0) return "";
        return sectionsToHtml(parsed);
      }
      return blogText;
    } catch {
      // It's already HTML
      return blogText;
    }
  }
  if (Array.isArray(blogText)) {
    if (blogText.length === 0) return "";
    return sectionsToHtml(blogText);
  }
  return "";
}

function sectionsToHtml(
  sections: Array<{ section_heading: string; section_text: string }>
): string {
  return sections
    .map((section) => {
      let html = "";
      if (section.section_heading) {
        html += `<h2 id="${slugify(section.section_heading)}">${
          section.section_heading
        }</h2>`;
      }
      if (section.section_text) {
        html += section.section_text
          .split("\n")
          .filter((p) => p.trim())
          .map((p) => `<p>${p}</p>`)
          .join("");
      }
      return html;
    })
    .join("");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Extract headings from HTML for table of contents
function extractHeadings(
  html: string
): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const regex = /<h([1-3])(?:[^>]*id="([^"]*)")?[^>]*>(.*?)<\/h[1-3]>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const existingId = match[2];
    const text = match[3].replace(/<[^>]*>/g, ""); // Strip nested HTML tags
    const id = existingId || slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

// Add IDs to headings in HTML if they don't have them
function addHeadingIds(html: string): string {
  return html.replace(
    /<h([1-3])(?![^>]*id=)([^>]*)>(.*?)<\/h[1-3]>/gi,
    (match, level, attrs, content) => {
      const text = content.replace(/<[^>]*>/g, "");
      const id = slugify(text);
      return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
    }
  );
}

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

  const context = blog.blog_context as BlogContext;
  const author = normalizeAuthor(context?.author);

  return {
    title: `${blog.blog_header} | A1 Education`,
    description: blog.blog_subheading,
    openGraph: {
      title: blog.blog_header,
      description: blog.blog_subheading,
      type: "article",
      publishedTime: context?.publishedAt || context?.date,
      authors: author.name ? [author.name] : [],
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
  const context = (blogData.blog_context || {}) as BlogContext;
  const author = normalizeAuthor(context.author);
  const contributors = normalizeContributors(context.contributors);
  const tagStyles: TagStyle[] = Array.isArray(context.tagStyles)
    ? context.tagStyles
        .filter(
          (style): style is TagStyle =>
            !!style && typeof style === "object" && "label" in style
        )
        .map((style) => ({
          label:
            typeof style.label === "string" ? style.label : String(style.label),
          bgColor:
            typeof style.bgColor === "string" ? style.bgColor : undefined,
          textColor:
            typeof style.textColor === "string" ? style.textColor : undefined,
        }))
    : [];
  const downloadables = (
    (blogData.blog_downloadables || []) as BlogDownloadableResource[]
  ).filter(
    (item) =>
      typeof item?.title === "string" && typeof item?.asset_url === "string"
  );

  // Convert content to HTML and add heading IDs
  const rawHtml = contentToHtml(blogData.blog_text);
  const htmlContent = addHeadingIds(rawHtml);
  const headings = extractHeadings(htmlContent);

  return (
    <>
      <BlogHeader
        title={blogData.blog_header}
        subheading={blogData.blog_subheading}
        tags={tags}
        tagStyles={tagStyles}
        headingColor={context.headingColor || undefined}
        subheadingColor={context.subheadingColor || undefined}
        blogHero={blogData.blog_hero}
      />

      <div className="2xl:px-8 lg:px-6 md:px-4 px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-16">
            {/* Main Content - 3 columns */}
            <article className="lg:col-span-3">
              {/* Author and Date */}
              {(author.name || context.date) && (
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    {author.pfp && (
                      <Image
                        src={author.pfp}
                        alt={author.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                        style={{ objectPosition: author.pfpPosition || "50% 50%" }}
                        unoptimized
                      />
                    )}
                    <div>
                      {author.name && (
                        <p className="font-semibold text-gray-900">
                          {author.name}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {author.position && <span>{author.position}</span>}
                        {author.position && context.date && (
                          <span className="text-gray-300">•</span>
                        )}
                        {context.date && (
                          <time dateTime={context.date}>
                            {new Date(context.date).toLocaleDateString(
                              "en-AU",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Content */}
              <div
                className="blog-content prose prose-lg max-w-none
                  prose-headings:font-semibold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-5
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-400
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                  prose-a:text-[#4668f7] prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-[#4668f7]
                  prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6
                  prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                  prose-blockquote:text-gray-700
                  prose-ul:my-6 prose-ol:my-6
                  prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {downloadables.length > 0 && (
                <div className="mt-12">
                  <BlogDownloadables items={downloadables} />
                </div>
              )}
            </article>

            {/* Sidebar - 2 columns */}
            <aside className="lg:col-span-2">
              <BlogSidebar
                headings={headings}
                author={author}
                contributors={contributors}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
