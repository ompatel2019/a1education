// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://a1education.com.au",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/api/*", "/app/*", "/blogs/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
