import React from "react";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

// Dummy content fetching function
async function getBlogPost(slug: string) {
  // Replace this with your actual data-fetching logic (e.g., from a CMS or DB)
  return {
    title: `Blog Post Title for ${slug}`,
    description: `This is a meta description for the blog post with slug "${slug}".`,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const Page = () => {
  return <div>Blog Page</div>;
};

export default Page;
