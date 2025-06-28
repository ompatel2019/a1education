// next-sitemap.config.js
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-27',
  useCdn: false,
});

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://a1education.com.au",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/api/*", "/app/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  additionalPaths: async (config) => {
    // Fetch all blog slugs from Sanity
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
    return posts.map(post => ({
      loc: `/blogs/${post.slug}`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};
