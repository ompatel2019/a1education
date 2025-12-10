// next-sitemap.config.js

import { createClient } from "@supabase/supabase-js";

const siteUrl = "https://a1education.com.au";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer service role for unrestricted read; fallback to anon if RLS permits public read
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getBlogSlugs = async () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn(
      "[sitemap] Missing Supabase env vars, skipping blog slugs. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
    return [];
  }

  const client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client
    .from("blogs")
    .select("slug")
    .eq("draft", false);

  if (error || !data) {
    console.warn("[sitemap] Supabase slug fetch failed:", error);
    return [];
  }

  console.log("[sitemap] fetched blog slugs:", data.length);

  return data
    .map((row) => row?.slug)
    .filter((slug) => typeof slug === "string" && !!slug);
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/api/*", "/app/*", "/admin", "/admin/*", "/u", "/u/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  additionalPaths: async () => {
    const extraLocs = ["/blogs"];
    const slugs = await getBlogSlugs();
    const blogPaths = slugs.map((slug) => `/blogs/${slug}`);
    const paths = [...extraLocs, ...blogPaths];
    console.log("[sitemap] additional paths:", paths);

    const nowIso = new Date().toISOString();
    const entries = paths.map((loc) => ({
      loc: `${siteUrl}${loc}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: nowIso,
    }));

    console.log("[sitemap] transformed paths:", entries);

    return entries;
  },
};

export default config;
