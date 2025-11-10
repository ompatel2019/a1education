export const DEFAULT_BLOG_SLUG = "new-blog-post";

export function slugify(value: string, fallback = ""): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || fallback;
}
