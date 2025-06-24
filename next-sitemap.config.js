// next-sitemap.config.js
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
};
