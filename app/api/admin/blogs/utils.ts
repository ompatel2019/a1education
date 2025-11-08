type RawPayload = {
  slug?: unknown;
  blog_hero?: unknown;
  blog_header?: unknown;
  blog_subheading?: unknown;
  blog_tags?: unknown;
  blog_text?: unknown;
  blog_context?: unknown;
  blog_downloadables?: unknown;
  draft?: unknown;
};

type RawContext = {
  date?: unknown;
  author?: unknown;
  readTime?: unknown;
};

type RawSection = {
  section_heading?: unknown;
  section_text?: unknown;
};

type RawDownloadable = {
  title?: unknown;
  asset_url?: unknown;
};

export type BlogSectionPayload = {
  section_heading: string;
  section_text: string;
};

export type BlogContextPayload = {
  date: string;
  author: string;
  readTime: string;
};

export type BlogDownloadablePayload = {
  title: string;
  asset_url: string;
};

export type BlogPayload = {
  slug: string;
  blog_hero: string | null;
  blog_header: string;
  blog_subheading: string;
  blog_tags: string[];
  blog_text: BlogSectionPayload[];
  blog_context: BlogContextPayload;
  blog_downloadables: BlogDownloadablePayload[];
  draft: boolean;
};

const normalizeSections = (value: unknown): BlogSectionPayload[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((section) => {
      const raw = section as RawSection;
      const heading =
        typeof raw?.section_heading === "string" ? raw.section_heading.trim() : "";
      const text = typeof raw?.section_text === "string" ? raw.section_text.trim() : "";
      return { section_heading: heading, section_text: text };
    })
    .filter((section) => section.section_heading || section.section_text);
};

const normalizeTags = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter((tag) => tag.length > 0);
};

const normalizeContext = (value: unknown): BlogContextPayload => {
  const raw = (value ?? {}) as RawContext;
  return {
    date: typeof raw?.date === "string" ? raw.date : "",
    author: typeof raw?.author === "string" ? raw.author : "",
    readTime: typeof raw?.readTime === "string" ? raw.readTime : "",
  };
};

const normalizeDownloadables = (value: unknown): BlogDownloadablePayload[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const raw = (entry ?? {}) as RawDownloadable;
      const title = typeof raw?.title === "string" ? raw.title.trim() : "";
      const assetUrl =
        typeof raw?.asset_url === "string" ? raw.asset_url.trim() : "";
      return {
        title,
        asset_url: assetUrl,
      };
    })
    .filter((entry) => entry.title.length > 0 && entry.asset_url.length > 0);
};

export const normalizeBlogPayload = (input: unknown): BlogPayload => {
  const raw = input as RawPayload;
  const slug = typeof raw?.slug === "string" ? raw.slug.trim() : "";
  const blog_header = typeof raw?.blog_header === "string" ? raw.blog_header.trim() : "";
  const blog_subheading =
    typeof raw?.blog_subheading === "string" ? raw.blog_subheading.trim() : "";

  if (!slug) {
    throw new Error("Slug is required.");
  }
  if (!blog_header) {
    throw new Error("Blog header is required.");
  }
  if (!blog_subheading) {
    throw new Error("Blog subheading is required.");
  }

  const blog_hero =
    typeof raw?.blog_hero === "string" && raw.blog_hero.trim().length > 0
      ? raw.blog_hero.trim()
      : null;

  const blog_tags = normalizeTags(raw?.blog_tags);
  const blog_text = normalizeSections(raw?.blog_text);
  const blog_context = normalizeContext(raw?.blog_context);
  const blog_downloadables = normalizeDownloadables(raw?.blog_downloadables);

  return {
    slug,
    blog_hero,
    blog_header,
    blog_subheading,
    blog_tags,
    blog_text,
    blog_context,
    blog_downloadables,
    draft: Boolean(raw?.draft),
  };
};
