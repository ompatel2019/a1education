// sanity/lib/queries.ts

import groq from "groq";
import { client } from "./client";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: any;
  publishedAt: string;
  author?: {
    name: string;
    image?: any;
  };
  mainImage?: {
    url: string;
    alt?: string;
  };
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const query = groq`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "author": author->{
        name,
        image
      },
      "mainImage": {
        "url": mainImage.asset->url,
        alt
      }
    }
  `;
  return await client.fetch(query);
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      body,
      publishedAt,
      "author": author->{
        name,
        image
      },
      "mainImage": {
        "url": mainImage.asset->url,
        alt
      }
    }
  `;
  return await client.fetch(query, { slug });
}
