import React from "react";
import { Metadata } from "next";
import { fetchBlogBySlug } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import { portableTextComponents } from "@/lib/portableTextComponts";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = props.params; // ✅ safe extraction

  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | A1 Education",
      description: "This blog post could not be found.",
    };
  }

  const description =
    post.excerpt ?? `Read ${post.title} on A1 Education's Blog.`;

  return {
    title: `${post.title} | A1 Education Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.mainImage?.url ? [post.mainImage.url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.mainImage?.url ? [post.mainImage.url] : [],
    },
  };
}

export default async function BlogPostPage(props: Props) {
  const { slug } = props.params; // ✅ safe extraction

  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className={sectionClass}>
      <BlurFade delay={0.1} inView>
        <h3 className={sectionNameClass}>{post.title}</h3>
        <h4 className={sectionSubheadingClass}>
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          {post.author?.name && ` • by ${post.author.name}`}
        </h4>
      </BlurFade>

      {post.mainImage?.url && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-6 mb-6">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-3xl mx-auto">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </section>
  );
}
