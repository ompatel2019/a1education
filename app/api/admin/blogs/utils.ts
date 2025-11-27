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

type RawAuthor = {
  name?: unknown;
  position?: unknown;
  pfp?: unknown;
  profileId?: unknown;
  pfpPosition?: unknown;
};

type RawContributor = {
  name?: unknown;
  position?: unknown;
  pfp?: unknown;
  profileId?: unknown;
  pfpPosition?: unknown;
};

type RawContext = {
  date?: unknown;
  author?: unknown;
  readTime?: unknown;
  contributors?: unknown;
  tagStyles?: unknown;
  headingColor?: unknown;
  subheadingColor?: unknown;
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

export type BlogAuthorPayload = {
  name: string;
  position: string;
  pfp: string;
  profileId?: string;
  pfpPosition?: string;
};

export type BlogContributorPayload = {
  name: string;
  position: string;
  pfp: string;
  profileId?: string;
  pfpPosition?: string;
};

export type BlogTagStylePayload = {
  label: string;
  bgColor: string;
  textColor: string;
};

export type BlogContextPayload = {
  date: string;
  readTime: string;
  author: BlogAuthorPayload;
  contributors: BlogContributorPayload[];
  tagStyles: BlogTagStylePayload[];
  headingColor: string;
  subheadingColor: string;
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
  blog_text: string | BlogSectionPayload[];
  blog_context: BlogContextPayload;
  blog_downloadables: BlogDownloadablePayload[];
  draft: boolean;
};

// Handle blog_text which can be HTML string (new format) or array of sections (old format)
const normalizeBlogText = (value: unknown): string | BlogSectionPayload[] => {
  // If it's a string (HTML content), return as-is
  if (typeof value === "string") {
    return value;
  }

  // If it's an array (old section format), normalize it
  if (Array.isArray(value)) {
    return value
      .map((section) => {
        const raw = section as RawSection;
        const heading =
          typeof raw?.section_heading === "string"
            ? raw.section_heading.trim()
            : "";
        const text =
          typeof raw?.section_text === "string" ? raw.section_text.trim() : "";
        return { section_heading: heading, section_text: text };
      })
      .filter((section) => section.section_heading || section.section_text);
  }

  // Default to empty string for new format
  return "";
};

const normalizeTags = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter((tag) => tag.length > 0);
};

// Normalize author which can be string (old format) or object (new format)
const normalizeAuthor = (value: unknown): BlogAuthorPayload => {
  // Old format: just a string name
  if (typeof value === "string") {
    return {
      name: value.trim(),
      position: "",
      pfp: "",
      profileId: "",
      pfpPosition: "",
    };
  }

  // New format: object with name, position, pfp
  if (value && typeof value === "object") {
    const raw = value as RawAuthor;
    return {
      name: typeof raw?.name === "string" ? raw.name.trim() : "",
      position: typeof raw?.position === "string" ? raw.position.trim() : "",
      pfp: typeof raw?.pfp === "string" ? raw.pfp.trim() : "",
      profileId:
        typeof raw?.profileId === "string" ? raw.profileId.trim() : "",
      pfpPosition:
        typeof raw?.pfpPosition === "string" ? raw.pfpPosition.trim() : "",
    };
  }

  return { name: "", position: "", pfp: "", profileId: "", pfpPosition: "" };
};

// Normalize contributors array
const normalizeContributors = (value: unknown): BlogContributorPayload[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((contributor) => {
      const raw = contributor as RawContributor;
      return {
        name: typeof raw?.name === "string" ? raw.name.trim() : "",
        position: typeof raw?.position === "string" ? raw.position.trim() : "",
        pfp: typeof raw?.pfp === "string" ? raw.pfp.trim() : "",
        profileId:
          typeof raw?.profileId === "string" ? raw.profileId.trim() : "",
        pfpPosition:
          typeof raw?.pfpPosition === "string" ? raw.pfpPosition.trim() : "",
      };
    })
    .filter((c) => c.name.length > 0);
};

const normalizeTagStyles = (value: unknown): BlogTagStylePayload[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const raw = (entry ?? {}) as Record<string, unknown>;
      return {
        label: typeof raw?.label === "string" ? raw.label.trim() : "",
        bgColor: typeof raw?.bgColor === "string" ? raw.bgColor.trim() : "",
        textColor:
          typeof raw?.textColor === "string" ? raw.textColor.trim() : "",
      };
    })
    .filter((entry) => entry.label.length > 0);
};

const normalizeContext = (value: unknown): BlogContextPayload => {
  const raw = (value ?? {}) as RawContext;
  return {
    date: typeof raw?.date === "string" ? raw.date : "",
    readTime: typeof raw?.readTime === "string" ? raw.readTime : "",
    author: normalizeAuthor(raw?.author),
    contributors: normalizeContributors(raw?.contributors),
    tagStyles: normalizeTagStyles(raw?.tagStyles),
    headingColor:
      typeof raw?.headingColor === "string" && raw.headingColor.trim()
        ? raw.headingColor.trim()
        : "#ffffff",
    subheadingColor:
      typeof raw?.subheadingColor === "string" && raw.subheadingColor.trim()
        ? raw.subheadingColor.trim()
        : "#e2e8f0",
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
  const blog_header =
    typeof raw?.blog_header === "string" ? raw.blog_header.trim() : "";
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
  const blog_text = normalizeBlogText(raw?.blog_text);
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
