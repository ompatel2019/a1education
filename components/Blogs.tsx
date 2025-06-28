// components/Blogs.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import {
  blogsSectionHeading,
  blogsSectionSubheading,
  blogsFallbackMessage,
} from "@/lib/config/blogsConfig";
import { PortableTextBlock } from "next-sanity";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  publishedAt: string;
  author?: {
    name: string;
    image?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  };
  mainImage?: {
    url: string;
    alt?: string;
  };
}

export default function Blogs({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) {
    return (
      <section className={sectionClass}>
        <h2 className={sectionNameClass}>
          {blogsSectionHeading.toUpperCase()}
        </h2>
        <h3 className={sectionSubheadingClass}>{blogsSectionSubheading}</h3>
        <p className="text-gray-600 mt-4">{blogsFallbackMessage}</p>
      </section>
    );
  }

  return (
    <section className={sectionClass}>
      <BlurFade delay={0.1} inView>
        <h2 className={sectionNameClass}>
          {blogsSectionHeading.toUpperCase()}
        </h2>
        <h3 className={sectionSubheadingClass}>{blogsSectionSubheading}</h3>
      </BlurFade>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
        {posts.map((post, idx) => (
          <BlurFade key={post._id} delay={0.15 + idx * 0.1} inView>
            <Link
              href={`/blogs/${post.slug}`}
              className="block group overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all bg-white"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {post.mainImage?.url && (
                  <Image
                    src={post.mainImage.url}
                    alt={post.mainImage.alt ?? post.title}
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <h5 className="h5 font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {post.title}
                </h5>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-xs font-medium text-primary">
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
