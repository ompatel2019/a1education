// app/blogs/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/PageTitle";
// import LeadCollector from "@/components/LeadCollector";

// Sample blog data - in a real app, this would come from a CMS/database
const sampleBlogs: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    author: string;
    readTime: string;
  }
> = {
  "sample-blog-1": {
    title: "Sample Blog Post 1",
    excerpt:
      "This is a sample blog post to demonstrate the blog functionality and showcase our content structure.",
    content: "Blog content will go here...",
    publishedAt: "2025-01-06",
    author: "A1 Education Team",
    readTime: "5 min read",
  },
  "sample-blog-2": {
    title: "Understanding HSC Economics: A Complete Guide",
    excerpt:
      "Master the fundamentals of HSC Economics with our comprehensive guide covering all key concepts and exam strategies.",
    content:
      "Welcome to our comprehensive guide to HSC Economics. This guide will walk you through all the essential concepts you need to master for your HSC examinations.\n\n## Introduction to Economics\n\nEconomics is the study of how individuals, businesses, and governments make decisions about allocating scarce resources. In HSC Economics, we focus on both microeconomic and macroeconomic principles.\n\n## Key Topics Covered\n\n### Microeconomics\n- Market structures\n- Consumer and producer theory\n- Market failure\n\n### Macroeconomics\n- Economic growth\n- Inflation and unemployment\n- Fiscal and monetary policy\n\nThis guide provides the foundation you need to excel in your HSC Economics studies.",
    publishedAt: "2025-01-05",
    author: "Sarah Johnson",
    readTime: "8 min read",
  },
  "sample-blog-3": {
    title: "Top 10 Study Tips for Economics Students",
    excerpt:
      "Discover proven study techniques and strategies that will help you excel in your HSC Economics examinations.",
    content:
      "Here are our top 10 study tips for Economics students:\n\n1. **Understand the basics first** - Make sure you have a solid grasp of fundamental concepts\n2. **Practice with real-world examples** - Economics comes alive when you see it in action\n3. **Draw diagrams regularly** - Visual representations help reinforce learning\n4. **Stay updated with current events** - Economics is constantly evolving\n5. **Form study groups** - Discuss concepts with peers\n6. **Use past papers** - Practice makes perfect\n7. **Teach others** - Explaining concepts reinforces your own understanding\n8. **Take breaks** - Avoid burnout\n9. **Review regularly** - Spaced repetition works\n10. **Stay confident** - Believe in your abilities",
    publishedAt: "2025-01-04",
    author: "Dr. Michael Chen",
    readTime: "6 min read",
  },
  "sample-blog-4": {
    title: "Market Structures: Perfect Competition vs Monopoly",
    excerpt:
      "Learn the key differences between various market structures and their impact on pricing and consumer welfare.",
    content:
      "Understanding market structures is crucial for HSC Economics students. Let's compare perfect competition and monopoly:\n\n## Perfect Competition\n\n**Characteristics:**\n- Many buyers and sellers\n- Homogeneous products\n- Perfect information\n- No barriers to entry/exit\n- Price takers\n\n**Advantages:**\n- Efficient resource allocation\n- Consumer surplus maximized\n- Innovation encouraged\n\n## Monopoly\n\n**Characteristics:**\n- Single seller\n- Unique product\n- High barriers to entry\n- Price maker\n- Market power\n\n**Disadvantages:**\n- Higher prices for consumers\n- Reduced output\n- Potential for inefficiency\n\nBoth market structures have their place in the economy, and understanding their implications helps us analyze real-world economic policy decisions.",
    publishedAt: "2025-01-03",
    author: "Emma Thompson",
    readTime: "7 min read",
  },
  "sample-blog-5": {
    title: "Macroeconomics: Understanding Fiscal Policy",
    excerpt:
      "Explore how government spending and taxation policies influence economic growth and stability.",
    content:
      "Fiscal policy refers to the use of government spending and taxation to influence the economy. Here's what you need to know:\n\n## What is Fiscal Policy?\n\nFiscal policy involves government decisions about:\n- Government spending levels\n- Taxation rates and structures\n- Budget deficits or surpluses\n\n## Expansionary vs Contractionary\n\n**Expansionary Fiscal Policy:**\n- Increased government spending\n- Tax cuts\n- Used during recessions\n- Stimulates economic growth\n\n**Contractionary Fiscal Policy:**\n- Decreased government spending\n- Tax increases\n- Used to combat inflation\n- Slows down economic growth\n\n## Effectiveness and Limitations\n\nFiscal policy can be powerful, but it faces challenges like:\n- Time lags in implementation\n- Political considerations\n- Crowding out effects\n- International constraints\n\nUnderstanding fiscal policy is essential for analyzing government economic management.",
    publishedAt: "2025-01-02",
    author: "Prof. David Wilson",
    readTime: "9 min read",
  },
  "sample-blog-6": {
    title: "Supply and Demand: Real World Applications",
    excerpt:
      "See how supply and demand principles apply to everyday economic situations and market dynamics.",
    content:
      "Supply and demand isn't just theory - it's everywhere! Let's look at real-world applications:\n\n## Price Ceilings and Floors\n\n**Price Ceilings:** Government-imposed maximum prices\n- Rent controls\n- Result in shortages\n- Black markets may emerge\n\n**Price Floors:** Government-imposed minimum prices\n- Minimum wage laws\n- Agricultural price supports\n- Can lead to surpluses\n\n## Elasticity in Action\n\n**Price Elasticity of Demand:** How responsive quantity demanded is to price changes\n- Gasoline: inelastic (people still need to drive)\n- Luxury goods: elastic (people can wait or substitute)\n\n**Price Elasticity of Supply:** How responsive quantity supplied is to price changes\n- Agricultural products: inelastic (takes time to grow crops)\n- Manufactured goods: elastic (factories can ramp up production)\n\n## Market Equilibrium\n\nWhen supply and demand intersect, we find market equilibrium - the point where the market clears at the optimal price and quantity.\n\nUnderstanding these concepts helps explain everything from gas prices to housing markets!",
    publishedAt: "2025-01-01",
    author: "Lisa Park",
    readTime: "6 min read",
  },
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = sampleBlogs[slug];

  if (!blog) {
    return {
      title: "Blog Post Not Found | A1 Education",
    };
  }

  return {
    title: `${blog.title} | A1 Education`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = sampleBlogs[slug];

  if (!blog) {
    notFound();
  }

  return (
    <>
      <PageTitle
        heading={blog.title}
        subheading={blog.excerpt}
        route="Home / Blogs"
      />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8 text-gray-600">
            <span className="font-medium">By {blog.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={blog.publishedAt}>
              {new Date(blog.publishedAt).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="text-gray-700 leading-relaxed">{blog.content}</div>
        </div>
      </article>

      {/* <LeadCollector /> */}
    </>
  );
}
