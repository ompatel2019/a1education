// app/(admin)/admin/blog/page.tsx

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import { DEFAULT_BLOG_SLUG, slugify } from "@/lib/utils/slug";

// Dynamically import TipTap to avoid SSR issues
const TipTapEditor = dynamic(() => import("@/components/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-gray-200 bg-white/70 min-h-[400px] flex items-center justify-center text-gray-400">
      Loading editor...
    </div>
  ),
});

type TagStyle = {
  label: string;
  bgColor: string;
  textColor: string;
};

type AuthorInfo = {
  name: string;
  position: string;
  pfp: string;
  profileId?: string;
  pfpPosition?: string;
};

type Contributor = {
  id: string;
  name: string;
  position: string;
  pfp: string;
  profileId?: string;
  pfpPosition?: string;
  isUploading: boolean;
  uploadError: string | null;
};

type BlogContext = {
  date: string;
  readTime: string;
  author: AuthorInfo;
  contributors: Omit<Contributor, "id" | "isUploading" | "uploadError">[];
  tagStyles: TagStyle[];
  headingColor: string;
  subheadingColor: string;
};

type BlogDownloadable = {
  id: string;
  title: string;
  asset_url: string;
  fileName: string;
  isUploading: boolean;
  uploadError: string | null;
};

const nextContributorId = () =>
  `contributor-${Math.random().toString(36).slice(2, 9)}`;
const nextDownloadableId = () =>
  `downloadable-${Math.random().toString(36).slice(2, 9)}`;

const createContributor = (): Contributor => ({
  id: nextContributorId(),
  name: "",
  position: "",
  pfp: "",
  profileId: "",
  pfpPosition: "50% 50%",
  isUploading: false,
  uploadError: null,
});

const createDownloadable = (): BlogDownloadable => ({
  id: nextDownloadableId(),
  title: "",
  asset_url: "",
  fileName: "",
  isUploading: false,
  uploadError: null,
});

const createTagStyle = (label: string): TagStyle => ({
  label,
  bgColor: "#EEF2FF",
  textColor: "#1D4ED8",
});

type RawDownloadableRecord = {
  title?: unknown;
  asset_url?: unknown;
};

type BlogDraftRecord = {
  id: number;
  slug: string;
  blog_header: string;
  blog_subheading: string;
  blog_hero: string | null;
  blog_tags: unknown;
  blog_text: unknown;
  blog_context: unknown;
  blog_downloadables: unknown;
  updated_at: string | null;
  draft: boolean;
};

export default function BlogPostsPage() {
  const [slug, setSlug] = useState(DEFAULT_BLOG_SLUG);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [slugStatus, setSlugStatus] = useState<{
    state: "idle" | "checking" | "available" | "taken" | "error";
    message?: string;
  }>({ state: "idle" });
  const [blogHero, setBlogHero] = useState("");
  const [blogHeader, setBlogHeader] = useState("Untitled Blog Post");
  const [blogSubheading, setBlogSubheading] = useState(
    "Add a short hook for the article."
  );
  const [tags, setTags] = useState<TagStyle[]>([
    { label: "Education", bgColor: "#EEF2FF", textColor: "#1D4ED8" },
    { label: "A1 Updates", bgColor: "#ECFDF3", textColor: "#047857" },
  ]);
  const [tagInput, setTagInput] = useState("");
  const [blogContent, setBlogContent] = useState("<p></p>");
  const [downloadables, setDownloadables] = useState<BlogDownloadable[]>([]);
  const [context, setContext] = useState<BlogContext>({
    date: "",
    readTime: "",
    author: {
      name: "",
      position: "",
      pfp: "",
      profileId: "",
      pfpPosition: "50% 50%",
    },
    contributors: [],
    tagStyles: [],
    headingColor: "#ffffff",
    subheadingColor: "#e2e8f0",
  });
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [authorPfpUploading, setAuthorPfpUploading] = useState(false);
  const [authorPfpError, setAuthorPfpError] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeView, setActiveView] = useState<
    "drafts" | "published" | "create"
  >("drafts");
  const [drafts, setDrafts] = useState<BlogDraftRecord[]>([]);
  const [published, setPublished] = useState<BlogDraftRecord[]>([]);
  const [draftsLoading, setDraftsLoading] = useState(false);
  const [draftsError, setDraftsError] = useState<string | null>(null);
  const [publishedLoading, setPublishedLoading] = useState(false);
  const [publishedError, setPublishedError] = useState<string | null>(null);
  const [currentDraftId, setCurrentDraftId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMode, setSaveMode] = useState<"post" | "draft" | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );
  const [panelLoading, setPanelLoading] = useState(true);
  const [heroUploadState, setHeroUploadState] = useState<{
    isUploading: boolean;
    fileName: string;
    error: string | null;
  }>({
    isUploading: false,
    fileName: "",
    error: null,
  });
  const [deleteConfirmBlogId, setDeleteConfirmBlogId] = useState<number | null>(
    null
  );

  const previewPayload = useMemo(
    () => ({
      slug,
      blog_hero: blogHero,
      blog_header: blogHeader,
      blog_subheading: blogSubheading,
      blog_tags: tags.map((tag) => tag.label),
      blog_text: blogContent,
      blog_downloadables: downloadables
        .map((rawEntry) => {
          const entry = rawEntry ?? ({} as Partial<BlogDownloadable>);
          const title =
            typeof entry.title === "string" ? entry.title.trim() : "";
          const assetUrl =
            typeof entry.asset_url === "string" ? entry.asset_url.trim() : "";
          return {
            title,
            asset_url: assetUrl,
          };
        })
        .filter((entry) => entry.title && entry.asset_url),
      blog_context: {
        ...context,
        author: context.author,
        contributors: contributors
          .filter((c) => c.name.trim())
          .map(({ name, position, pfp, profileId, pfpPosition }) => ({
            name,
            position,
            pfp,
            profileId,
            pfpPosition,
          })),
        tagStyles: tags.map((tag) => ({
          label: tag.label,
          bgColor: tag.bgColor,
          textColor: tag.textColor,
        })),
      },
      draft: isDraft,
    }),
    [
      slug,
      blogHero,
      blogHeader,
      blogSubheading,
      tags,
      blogContent,
      downloadables,
      context,
      contributors,
      isDraft,
    ]
  );

  const handleSlugFieldChange = (value: string) => {
    setSlugManuallyEdited(true);
    setSlug(slugify(value, ""));
    setSlugStatus({ state: "checking" });
  };

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value || tags.some((tag) => tag.label === value)) return;
    setTags((prev) => [...prev, createTagStyle(value)]);
    setTagInput("");
  };

  const handleRemoveTag = (value: string) => {
    setTags((prev) => prev.filter((tag) => tag.label !== value));
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const updateTagStyle = (
    label: string,
    patch: Partial<Omit<TagStyle, "label">>
  ) => {
    setTags((prev) =>
      prev.map((tag) =>
        tag.label === label
          ? {
              ...tag,
              ...patch,
            }
          : tag
      )
    );
  };

  // Contributors management
  const addContributor = () => {
    setContributors((prev) => [...prev, createContributor()]);
  };

  const updateContributor = (
    id: string,
    field: keyof Contributor,
    value: string
  ) => {
    setContributors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeContributor = (id: string) => {
    setContributors((prev) => prev.filter((c) => c.id !== id));
  };

  const patchContributor = (id: string, patch: Partial<Contributor>) => {
    setContributors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  };

  // Downloadables management
  const addDownloadable = () => {
    setDownloadables((prev) => [...prev, createDownloadable()]);
  };

  const patchDownloadable = (id: string, patch: Partial<BlogDownloadable>) => {
    setDownloadables((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry))
    );
  };

  const updateDownloadableTitle = (id: string, value: string) => {
    patchDownloadable(id, { title: value });
  };

  const removeDownloadable = (id: string) => {
    setDownloadables((prev) => prev.filter((entry) => entry.id !== id));
  };

  const resolveUploadSlug = () =>
    slugify(slug || blogHeader || DEFAULT_BLOG_SLUG, DEFAULT_BLOG_SLUG);

  // Generic upload function
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", resolveUploadSlug());

    const response = await fetch("/api/admin/blogs/upload", {
      method: "POST",
      body: formData,
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(body?.error ?? "Upload failed.");
    }

    const fileUrl = body?.data?.url;
    if (!fileUrl || typeof fileUrl !== "string") {
      throw new Error("Upload did not return a file URL.");
    }

    return fileUrl;
  };

  const handleHeroUpload = async (file?: File | null) => {
    if (!file) return;

    setHeroUploadState({ isUploading: true, fileName: file.name, error: null });

    try {
      const fileUrl = await uploadFile(file);
      setBlogHero(fileUrl);
      setHeroUploadState({
        isUploading: false,
        fileName: file.name,
        error: null,
      });
    } catch (error) {
      setHeroUploadState({
        isUploading: false,
        fileName: "",
        error:
          error instanceof Error ? error.message : "Unable to upload hero.",
      });
    }
  };

  const clearHeroImage = () => {
    setBlogHero("");
    setHeroUploadState({
      isUploading: false,
      fileName: "",
      error: null,
    });
  };

  const handleAuthorPfpUpload = async (file?: File | null) => {
    if (!file) return;

    setAuthorPfpUploading(true);
    setAuthorPfpError(null);

    try {
      const fileUrl = await uploadFile(file);
      setContext((prev) => ({
        ...prev,
        author: { ...prev.author, pfp: fileUrl },
      }));
    } catch (error) {
      setAuthorPfpError(
        error instanceof Error ? error.message : "Unable to upload photo."
      );
    } finally {
      setAuthorPfpUploading(false);
    }
  };

  const handleContributorPfpUpload = async (id: string, file?: File | null) => {
    if (!file) return;

    patchContributor(id, { isUploading: true, uploadError: null });

    try {
      const fileUrl = await uploadFile(file);
      patchContributor(id, { pfp: fileUrl, isUploading: false });
    } catch (error) {
      patchContributor(id, {
        isUploading: false,
        uploadError:
          error instanceof Error ? error.message : "Unable to upload photo.",
      });
    }
  };

  const handleUploadFile = async (id: string, file?: File | null) => {
    if (!file) return;

    patchDownloadable(id, { isUploading: true, uploadError: null });

    try {
      const fileUrl = await uploadFile(file);
      patchDownloadable(id, {
        asset_url: fileUrl,
        fileName: file.name,
        isUploading: false,
        uploadError: null,
      });
    } catch (error) {
      patchDownloadable(id, {
        isUploading: false,
        uploadError:
          error instanceof Error ? error.message : "Unable to upload file.",
      });
    }
  };

  const resetBuilder = () => {
    setSlug(DEFAULT_BLOG_SLUG);
    setSlugManuallyEdited(false);
    setSlugStatus({ state: "idle" });
    setBlogHero("");
    setBlogHeader("Untitled Blog Post");
    setBlogSubheading("Add a short hook for the article.");
    setTags([
      { label: "Education", bgColor: "#EEF2FF", textColor: "#1D4ED8" },
      { label: "A1 Updates", bgColor: "#ECFDF3", textColor: "#047857" },
    ]);
    setTagInput("");
    setBlogContent("<p></p>");
    setDownloadables([]);
    setContext({
      date: "",
      readTime: "",
      author: {
        name: "",
        position: "",
        pfp: "",
        profileId: "",
        pfpPosition: "50% 50%",
      },
      contributors: [],
      tagStyles: [],
      headingColor: "#ffffff",
      subheadingColor: "#e2e8f0",
    });
    setContributors([]);
    setIsDraft(true);
    setCurrentDraftId(null);
    setSubmissionError(null);
    setSubmissionMessage(null);
    setHeroUploadState({
      isUploading: false,
      fileName: "",
      error: null,
    });
    setAuthorPfpUploading(false);
    setAuthorPfpError(null);
  };

  const loadDrafts = useCallback(async () => {
    setDraftsLoading(true);
    setDraftsError(null);
    try {
      const response = await fetch("/api/admin/blogs/drafts", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch drafts");
      }
      const payload = (await response.json()) as { data?: BlogDraftRecord[] };
      setDrafts(payload.data ?? []);
    } catch (error) {
      console.error("Failed to load drafts:", error);
      setDraftsError("Unable to load drafts right now.");
      setDrafts([]);
    } finally {
      setDraftsLoading(false);
    }
  }, []);

  const loadPublished = useCallback(async () => {
    setPublishedLoading(true);
    setPublishedError(null);
    try {
      const response = await fetch("/api/admin/blogs/published", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch current posts");
      }
      const payload = (await response.json()) as { data?: BlogDraftRecord[] };
      setPublished(payload.data ?? []);
    } catch (error) {
      console.error("Failed to load current posts:", error);
      setPublishedError("Unable to load current posts right now.");
      setPublished([]);
    } finally {
      setPublishedLoading(false);
    }
  }, []);

  const checkSlugAvailability = useCallback(
    async (candidate: string) => {
      const normalized = slugify(candidate);
      if (!normalized) return false;

      const params = new URLSearchParams({ slug: normalized });
      if (currentDraftId !== null) {
        params.set("excludeId", String(currentDraftId));
      }

      const response = await fetch(
        `/api/admin/blogs/check-slug?${params.toString()}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Unable to check slug availability.");
      }

      const body = await response.json().catch(() => ({}));
      return Boolean(body?.data?.available);
    },
    [currentDraftId]
  );

  const ensureUniqueSlug = useCallback(
    async (value: string) => {
      const normalized = slugify(value, DEFAULT_BLOG_SLUG);
      let attempt = normalized;
      let suffix = 1;

      while (suffix < 50) {
        try {
          const available = await checkSlugAvailability(attempt);
          if (available) {
            return attempt;
          }
        } catch (error) {
          console.error("Slug check failed:", error);
          return attempt;
        }

        attempt = `${normalized}-${suffix}`;
        suffix += 1;
      }

      return `${normalized}-${Date.now()}`;
    },
    [checkSlugAvailability]
  );

  useEffect(() => {
    const bootstrap = async () => {
      setPanelLoading(true);
      await Promise.all([loadDrafts(), loadPublished()]);
      setPanelLoading(false);
    };
    void bootstrap();
  }, [loadDrafts, loadPublished]);

  useEffect(() => {
    if (slugManuallyEdited) return;

    const title = blogHeader.trim();
    if (!title) {
      setSlug(DEFAULT_BLOG_SLUG);
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(() => {
      (async () => {
        const uniqueSlug = await ensureUniqueSlug(title);
        if (!cancelled && !slugManuallyEdited) {
          setSlug(uniqueSlug);
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [blogHeader, slugManuallyEdited, ensureUniqueSlug]);

  useEffect(() => {
    const normalized = slugify(slug, "").trim();

    if (!normalized) {
      setSlugStatus({
        state: "error",
        message: "Add a slug to continue.",
      });
      return;
    }

    let cancelled = false;
    setSlugStatus({ state: "checking" });

    const timeout = setTimeout(() => {
      (async () => {
        try {
          const available = await checkSlugAvailability(normalized);
          if (cancelled) return;
          setSlugStatus(
            available
              ? { state: "available", message: "Slug looks good." }
              : { state: "taken", message: "Slug already exists." }
          );
        } catch (error) {
          console.error("Slug validation error:", error);
          if (!cancelled) {
            setSlugStatus({
              state: "error",
              message: "Unable to validate slug.",
            });
          }
        }
      })();
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [slug, checkSlugAvailability]);

  const extractFileNameFromUrl = (url: string) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      const name = parsed.pathname.split("/").pop();
      return name ? decodeURIComponent(name) : "";
    } catch {
      const fallback = url.split("/").pop();
      return fallback ? decodeURIComponent(fallback) : "";
    }
  };

  const parseDownloadables = (value: unknown): RawDownloadableRecord[] => {
    if (Array.isArray(value)) {
      return value.filter(
        (item): item is RawDownloadableRecord =>
          !!item && typeof item === "object"
      );
    }
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed)
          ? parsed.filter(
              (item): item is RawDownloadableRecord =>
                !!item && typeof item === "object"
            )
          : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const parseTags = (value: unknown): string[] => {
    if (Array.isArray(value)) {
      return value.filter((tag): tag is string => typeof tag === "string");
    }
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed)
          ? parsed.filter((tag): tag is string => typeof tag === "string")
          : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const mergeTagStyles = (labels: string[], stored: TagStyle[]): TagStyle[] =>
    labels.map((label) => {
      const existing = stored.find(
        (style) => style.label.toLowerCase() === label.toLowerCase()
      );
      if (existing) return { ...existing, label };
      return createTagStyle(label);
    });

  const [pfpAdjustTarget, setPfpAdjustTarget] = useState<{
    kind: "author" | "contributor";
    id?: string;
    src: string;
    position: string;
  } | null>(null);

  const parsePosition = (value?: string) => {
    const [rawX, rawY] = (value ?? "50% 50%").split(" ");
    return {
      x: Number.parseFloat(rawX) || 50,
      y: Number.parseFloat(rawY) || 50,
    };
  };

  const openPfpAdjustModal = (kind: "author" | "contributor", id?: string) => {
    if (kind === "author") {
      if (!context.author.pfp) return;
      setPfpAdjustTarget({
        kind,
        src: context.author.pfp,
        position: context.author.pfpPosition || "50% 50%",
      });
      return;
    }

    const target = contributors.find((c) => c.id === id);
    if (!target || !target.pfp) return;
    setPfpAdjustTarget({
      kind,
      id,
      src: target.pfp,
      position: target.pfpPosition || "50% 50%",
    });
  };

  const handlePfpPositionSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!pfpAdjustTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(
      100,
      Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)
    ).toFixed(1);
    const y = Math.min(
      100,
      Math.max(0, ((event.clientY - rect.top) / rect.height) * 100)
    ).toFixed(1);
    setPfpAdjustTarget((prev) =>
      prev ? { ...prev, position: `${x}% ${y}%` } : null
    );
  };

  const applyPfpPosition = () => {
    if (!pfpAdjustTarget) return;
    if (pfpAdjustTarget.kind === "author") {
      setContext((prev) => ({
        ...prev,
        author: { ...prev.author, pfpPosition: pfpAdjustTarget.position },
      }));
    } else if (pfpAdjustTarget.kind === "contributor" && pfpAdjustTarget.id) {
      patchContributor(pfpAdjustTarget.id, {
        pfpPosition: pfpAdjustTarget.position,
      });
    }
    setPfpAdjustTarget(null);
  };

  const parseJsonObject = (value: unknown): BlogContext => {
    const fallback: BlogContext = {
      date: "",
      readTime: "",
      author: {
        name: "",
        position: "",
        pfp: "",
        profileId: "",
        pfpPosition: "50% 50%",
      },
      contributors: [],
      tagStyles: [],
      headingColor: "#ffffff",
      subheadingColor: "#e2e8f0",
    };

    if (value && typeof value === "object") {
      const obj = value as Record<string, unknown>;

      // Handle old format where author was just a string
      let author: AuthorInfo = {
        name: "",
        position: "",
        pfp: "",
        profileId: "",
        pfpPosition: "50% 50%",
      };
      if (typeof obj.author === "string") {
        author = {
          name: obj.author,
          position: "",
          pfp: "",
          profileId: "",
          pfpPosition: "50% 50%",
        };
      } else if (obj.author && typeof obj.author === "object") {
        const a = obj.author as Record<string, unknown>;
        author = {
          name: typeof a.name === "string" ? a.name : "",
          position: typeof a.position === "string" ? a.position : "",
          pfp: typeof a.pfp === "string" ? a.pfp : "",
          profileId: typeof a.profileId === "string" ? a.profileId : "",
          pfpPosition:
            typeof a.pfpPosition === "string" ? a.pfpPosition : "50% 50%",
        };
      }

      let contributors: BlogContext["contributors"] = [];
      if (Array.isArray(obj.contributors)) {
        contributors = obj.contributors
          .filter(
            (c): c is Record<string, unknown> => !!c && typeof c === "object"
          )
          .map((c) => ({
            name: typeof c.name === "string" ? c.name : "",
            position: typeof c.position === "string" ? c.position : "",
            pfp: typeof c.pfp === "string" ? c.pfp : "",
            profileId: typeof c.profileId === "string" ? c.profileId : "",
            pfpPosition:
              typeof c.pfpPosition === "string" ? c.pfpPosition : "50% 50%",
          }));
      }

      const tagStyles: TagStyle[] = Array.isArray(obj.tagStyles)
        ? obj.tagStyles
            .filter(
              (t): t is Record<string, unknown> => !!t && typeof t === "object"
            )
            .map((t) => ({
              label: typeof t.label === "string" ? t.label : "",
              bgColor: typeof t.bgColor === "string" ? t.bgColor : "#EEF2FF",
              textColor:
                typeof t.textColor === "string" ? t.textColor : "#1D4ED8",
            }))
            .filter((t) => t.label)
        : [];

      return {
        date: typeof obj.date === "string" ? obj.date : "",
        readTime: typeof obj.readTime === "string" ? obj.readTime : "",
        author,
        contributors,
        tagStyles,
        headingColor:
          typeof obj.headingColor === "string"
            ? obj.headingColor
            : fallback.headingColor,
        subheadingColor:
          typeof obj.subheadingColor === "string"
            ? obj.subheadingColor
            : fallback.subheadingColor,
      };
    }
    return fallback;
  };

  // Parse blog_text which could be old section format or new HTML string
  const parseBlogText = (value: unknown): string => {
    if (typeof value === "string") {
      // Check if it's an empty or whitespace-only string
      if (!value.trim()) return "<p></p>";

      // Could be HTML string or JSON string of sections
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          // Empty array means no content
          if (parsed.length === 0) return "<p></p>";

          // Old format: array of sections, convert to HTML
          const html = parsed
            .map((section) => {
              const heading =
                typeof section?.section_heading === "string"
                  ? section.section_heading
                  : "";
              const text =
                typeof section?.section_text === "string"
                  ? section.section_text
                  : "";
              let sectionHtml = "";
              if (heading) sectionHtml += `<h2>${heading}</h2>`;
              if (text)
                sectionHtml += text
                  .split("\n")
                  .filter((p: string) => p.trim())
                  .map((p: string) => `<p>${p}</p>`)
                  .join("");
              return sectionHtml;
            })
            .join("");
          return html || "<p></p>";
        }
        // If parsed but not array, return original string (likely HTML)
        return value;
      } catch {
        // Not JSON, treat as HTML
        return value;
      }
    }
    if (Array.isArray(value)) {
      // Old format: array of sections
      return value
        .map((section) => {
          const heading =
            typeof section?.section_heading === "string"
              ? section.section_heading
              : "";
          const text =
            typeof section?.section_text === "string"
              ? section.section_text
              : "";
          let html = "";
          if (heading) html += `<h2>${heading}</h2>`;
          if (text)
            html += text
              .split("\n")
              .map((p: string) => `<p>${p}</p>`)
              .join("");
          return html;
        })
        .join("");
    }
    return "<p></p>";
  };

  const upsertDownloadablesFromDraft = (rawDownloadables: unknown) => {
    const normalized = parseDownloadables(rawDownloadables);
    if (!normalized.length) return [];
    return normalized.map((entry) => ({
      id: nextDownloadableId(),
      title: typeof entry.title === "string" ? entry.title : "",
      asset_url: typeof entry.asset_url === "string" ? entry.asset_url : "",
      fileName: extractFileNameFromUrl(
        typeof entry.asset_url === "string" ? entry.asset_url : ""
      ),
      isUploading: false,
      uploadError: null,
    }));
  };

  const handleEditDraft = (draft: BlogDraftRecord) => {
    setSlug(draft.slug);
    setSlugManuallyEdited(true);
    setSlugStatus({ state: "available", message: "Using saved slug." });
    setBlogHero(draft.blog_hero ?? "");
    setBlogHeader(draft.blog_header);
    setBlogSubheading(draft.blog_subheading);
    const parsedContext = parseJsonObject(draft.blog_context);
    const parsedTags = parseTags(draft.blog_tags);
    setTags(mergeTagStyles(parsedTags, parsedContext.tagStyles));
    setBlogContent(parseBlogText(draft.blog_text));
    setDownloadables(upsertDownloadablesFromDraft(draft.blog_downloadables));
    setContext(parsedContext);

    // Convert contributors to editable format
    setContributors(
      parsedContext.contributors.map((c) => ({
        id: nextContributorId(),
        name: c.name,
        position: c.position,
        pfp: c.pfp,
        profileId: c.profileId,
        pfpPosition: c.pfpPosition,
        isUploading: false,
        uploadError: null,
      }))
    );

    setIsDraft(draft.draft ?? true);
    setCurrentDraftId(draft.id);
    setSubmissionError(null);
    setSubmissionMessage(null);
    setActiveView("create");
    setHeroUploadState({
      isUploading: false,
      fileName: draft.blog_hero ? extractFileNameFromUrl(draft.blog_hero) : "",
      error: null,
    });
  };

  const buildPayload = (draftFlag: boolean, resolvedSlug: string) => ({
    slug: resolvedSlug.trim(),
    blog_hero: blogHero.trim() ? blogHero.trim() : null,
    blog_header: blogHeader.trim(),
    blog_subheading: blogSubheading.trim(),
    blog_tags: tags.map((tag) => tag.label.trim()).filter(Boolean),
    blog_text: blogContent,
    blog_downloadables: downloadables
      .map((entry) => {
        const title = entry.title.trim();
        const assetUrl = entry.asset_url.trim();
        return { title, asset_url: assetUrl };
      })
      .filter((entry) => entry.title && entry.asset_url),
    blog_context: {
      date: context.date,
      readTime: context.readTime,
      author: {
        ...context.author,
        name: context.author.name.trim(),
        position: context.author.position.trim(),
      },
      contributors: contributors
        .filter((c) => c.name.trim())
        .map(({ name, position, pfp, profileId, pfpPosition }) => ({
          name: name.trim(),
          position: position.trim(),
          pfp,
          profileId,
          pfpPosition,
        })),
      tagStyles: tags.map((tag) => ({
        label: tag.label.trim(),
        bgColor: tag.bgColor,
        textColor: tag.textColor,
      })),
      headingColor: context.headingColor,
      subheadingColor: context.subheadingColor,
    },
    draft: draftFlag,
  });

  const handleDeleteBlog = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await Promise.all([loadDrafts(), loadPublished()]);
        setDeleteConfirmBlogId(null);
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete blog");
    }
  };

  const handleTurnToDraft = async (post: BlogDraftRecord) => {
    try {
      const response = await fetch(`/api/admin/blogs/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, draft: true }),
      });

      if (response.ok) {
        await Promise.all([loadDrafts(), loadPublished()]);
      } else {
        alert("Failed to convert to draft");
      }
    } catch (error) {
      console.error("Turn to draft error:", error);
      alert("Failed to convert to draft");
    }
  };

  const handleSubmit = async (mode: "post" | "draft") => {
    const normalizedSlug = slugify(slug, "").trim();
    if (!normalizedSlug || !blogHeader.trim() || !blogSubheading.trim()) {
      setSubmissionError("Slug, header, and subheading are required.");
      return;
    }

    setSlug((current) => slugify(current, DEFAULT_BLOG_SLUG));
    setIsSaving(true);
    setSaveMode(mode);
    setSubmissionError(null);
    setSubmissionMessage(null);

    try {
      const slugAvailable = await checkSlugAvailability(normalizedSlug);
      if (!slugAvailable) {
        setSubmissionError("That slug already exists. Pick another one.");
        setIsSaving(false);
        setSaveMode(null);
        return;
      }
    } catch (error) {
      console.error("Slug verification failed:", error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to verify the slug. Please try again."
      );
      setIsSaving(false);
      setSaveMode(null);
      return;
    }

    const payload = buildPayload(mode === "draft", normalizedSlug);
    const endpoint =
      currentDraftId !== null
        ? `/api/admin/blogs/${currentDraftId}`
        : "/api/admin/blogs";
    const method = currentDraftId !== null ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body?.error ?? "Failed to save blog post.");
      }

      const savedRow = body?.data as BlogDraftRecord | undefined;

      const refresh = async () => {
        await Promise.all([loadDrafts(), loadPublished()]);
      };

      if (mode === "draft") {
        setIsDraft(true);
        setCurrentDraftId(savedRow?.id ?? currentDraftId);
        setSubmissionMessage("Draft saved.");
        await refresh();
      } else {
        setIsDraft(false);
        setCurrentDraftId(savedRow?.id ?? currentDraftId);
        setSubmissionMessage("Saved.");
        await refresh();
      }
    } catch (error) {
      console.error("Failed to save blog:", error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving."
      );
    } finally {
      setIsSaving(false);
      setSaveMode(null);
    }
  };

  const slugStatusTone =
    slugStatus.state === "available"
      ? "text-emerald-600"
      : slugStatus.state === "taken" || slugStatus.state === "error"
      ? "text-red-500"
      : "text-gray-500";
  const slugBlocked =
    slugStatus.state === "taken" || slugStatus.state === "error";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <p className="text-gray-600">
          Capture hero media, content blocks, tags, and metadata before
          publishing.
        </p>
      </div>

      {panelLoading && (
        <div className="rounded-3xl border border-dashed border-[#4668f7]/30 bg-[#4668f7]/5 px-4 py-3 text-sm font-medium text-[#18224b]">
          Syncing drafts and published posts...
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => setActiveView("drafts")}
          className={`rounded-3xl border p-5 text-left transition ${
            activeView === "drafts"
              ? "border-[#4668f7] bg-[#4668f7]/10 text-[#18224b]"
              : "border-white/70 bg-white/70 text-gray-700 hover:border-[#4668f7]/40"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            01
          </p>
          <h2 className="mt-2 text-xl font-semibold">View drafts</h2>
          <p className="mt-1 text-sm text-gray-600">
            Review all unpublished posts, pick one, and continue editing.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setActiveView("published")}
          className={`rounded-3xl border p-5 text-left transition ${
            activeView === "published"
              ? "border-[#4668f7] bg-[#4668f7]/10 text-[#18224b]"
              : "border-white/70 bg-white/70 text-gray-700 hover:border-[#4668f7]/40"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            02
          </p>
          <h2 className="mt-2 text-xl font-semibold">Current posts</h2>
          <p className="mt-1 text-sm text-gray-600">
            Spot-check live entries and pull them back into the editor.
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            resetBuilder();
            setActiveView("create");
          }}
          className={`rounded-3xl border p-5 text-left transition ${
            activeView === "create"
              ? "border-[#4668f7] bg-[#4668f7]/10 text-[#18224b]"
              : "border-white/70 bg-white/70 text-gray-700 hover:border-[#4668f7]/40"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            03
          </p>
          <h2 className="mt-2 text-xl font-semibold">Make post</h2>
          <p className="mt-1 text-sm text-gray-600">
            Start fresh, capture hero media, and prep sections for publishing.
          </p>
        </button>
      </div>

      {activeView === "drafts" && (
        <section className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                Drafts workspace
              </p>
              <h3 className="text-xl font-semibold text-gray-900">
                Unpublished posts
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadDrafts}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
              >
                {draftsLoading ? "Refreshing..." : "Refresh drafts"}
              </button>
              <button
                type="button"
                onClick={() => setActiveView("create")}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
              >
                Make a new post
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {draftsLoading && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-sm text-gray-600">
                Loading drafts…
              </div>
            )}

            {!draftsLoading && draftsError && (
              <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">
                {draftsError}
              </div>
            )}

            {!draftsLoading && !draftsError && drafts.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-sm text-gray-600">
                No drafts yet. Click &quot;Make a new post&quot; to start one.
              </div>
            )}

            {!draftsLoading &&
              !draftsError &&
              drafts.map((draft) => {
                const tagList = parseTags(draft.blog_tags);
                const contextMeta = parseJsonObject(draft.blog_context);
                return (
                  <div
                    key={draft.id}
                    className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 shadow-inner"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                          Draft
                        </p>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {draft.blog_header}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {draft.blog_subheading}
                        </p>
                      </div>
                      {tagList.length > 0 && (
                        <span className="rounded-full bg-[#4668f7]/10 px-3 py-1 text-xs font-semibold text-[#4668f7]">
                          {tagList.join(" · ")}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>Author: {contextMeta.author?.name || "—"}</span>
                      <span>Read time: {contextMeta.readTime || "—"}</span>
                      {draft.updated_at && (
                        <span>
                          Updated:{" "}
                          {new Date(draft.updated_at).toLocaleString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/20 transition hover:-translate-y-[1px]"
                        onClick={() => handleEditDraft(draft)}
                      >
                        Edit draft
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:-translate-y-[1px] hover:bg-red-100"
                        onClick={() => setDeleteConfirmBlogId(draft.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {activeView === "published" && (
        <section className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                Live posts
              </p>
              <h3 className="text-xl font-semibold text-gray-900">
                Currently published
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadPublished}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
              >
                {publishedLoading ? "Refreshing..." : "Refresh posts"}
              </button>
              <button
                type="button"
                onClick={() => setActiveView("create")}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
              >
                Make a new post
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {publishedLoading && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-sm text-gray-600">
                Loading posts…
              </div>
            )}

            {!publishedLoading && publishedError && (
              <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-600">
                {publishedError}
              </div>
            )}

            {!publishedLoading && !publishedError && published.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-sm text-gray-600">
                No posts are live yet. Publish one to see it here.
              </div>
            )}

            {!publishedLoading &&
              !publishedError &&
              published.map((post) => {
                const tagList = parseTags(post.blog_tags);
                const contextMeta = parseJsonObject(post.blog_context);
                return (
                  <div
                    key={post.id}
                    className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-inner"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
                          Published
                        </p>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {post.blog_header}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {post.blog_subheading}
                        </p>
                      </div>
                      {tagList.length > 0 && (
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                          {tagList.join(" · ")}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>Author: {contextMeta.author?.name || "—"}</span>
                      <span>Read time: {contextMeta.readTime || "—"}</span>
                      {post.updated_at && (
                        <span>
                          Updated:{" "}
                          {new Date(post.updated_at).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/20 transition hover:-translate-y-[1px]"
                        onClick={() => handleEditDraft(post)}
                      >
                        Edit post
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:-translate-y-[1px] hover:bg-amber-100"
                        onClick={() => handleTurnToDraft(post)}
                      >
                        Turn to Draft
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:-translate-y-[1px] hover:bg-red-100"
                        onClick={() => setDeleteConfirmBlogId(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-6">
          <div className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-white/80 bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50"
            >
              Close
            </button>
            <div className="space-y-10 pb-8 pt-10">
              <div className="px-4 md:px-6">
                <BlogHeader
                  title={previewPayload.blog_header || "Untitled post"}
                  subheading={
                    previewPayload.blog_subheading ||
                    "Add a subheading to set context."
                  }
                  tags={previewPayload.blog_tags}
                  tagStyles={tags}
                  headingColor={context.headingColor}
                  subheadingColor={context.subheadingColor}
                  blogHero={
                    previewPayload.blog_hero ? previewPayload.blog_hero : null
                  }
                />
              </div>

              <article className="max-w-4xl mx-auto px-4 pb-6">
                <div className="prose prose-lg max-w-none">
                  {(context.author?.name ||
                    context.date ||
                    context.readTime) && (
                    <div className="mb-8 text-gray-600">
                      {context.author?.name && (
                        <>
                          <span className="font-medium">
                            By {context.author.name}
                          </span>
                          {(context.date || context.readTime) && (
                            <span className="mx-2">•</span>
                          )}
                        </>
                      )}
                      {context.date && (
                        <>
                          <time dateTime={context.date}>
                            {new Date(context.date).toLocaleDateString(
                              "en-AU",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                          {context.readTime && <span className="mx-2">•</span>}
                        </>
                      )}
                      {context.readTime && <span>{context.readTime}</span>}
                      <span className="ml-3 rounded-full border border-gray-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                        {isDraft ? "Draft" : "Ready"}
                      </span>
                    </div>
                  )}

                  {/* Render HTML content */}
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blogContent }}
                  />

                  {previewPayload.blog_downloadables.length > 0 && (
                    <div className="mt-10 space-y-4 rounded-2xl border border-gray-200 bg-gray-50/80 p-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Downloadables preview
                      </h3>
                      <ul className="space-y-3">
                        {previewPayload.blog_downloadables.map(
                          (resource, index) => (
                            <li
                              key={`${resource.title}-${index}`}
                              className="rounded-2xl border border-white/80 bg-white px-4 py-3"
                            >
                              <p className="text-base font-semibold text-gray-900">
                                {resource.title}
                              </p>
                              <p className="text-xs text-gray-500 break-all">
                                {extractFileNameFromUrl(resource.asset_url) ||
                                  resource.asset_url}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      )}

      {activeView === "create" && (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 space-y-2">
                <label
                  className="text-sm font-semibold text-gray-800"
                  htmlFor="blog-header"
                >
                  Blog header
                </label>
                <input
                  id="blog-header"
                  type="text"
                  value={blogHeader}
                  onChange={(event) => {
                    setBlogHeader(event.target.value);
                    if (!slugManuallyEdited) {
                      setSlugStatus({ state: "checking" });
                    }
                  }}
                  className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-semibold text-gray-800"
                    htmlFor="slug"
                  >
                    Slug
                  </label>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                    Auto-generated
                  </span>
                </div>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    handleSlugFieldChange(event.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                />
                <p className={`text-xs ${slugStatusTone}`}>
                  {slugStatus.message ??
                    "We will auto-build this from the title."}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-semibold text-gray-800"
                htmlFor="blog-subheading"
              >
                Blog subheading
              </label>
              <textarea
                id="blog-subheading"
                rows={3}
                value={blogSubheading}
                onChange={(event) => setBlogSubheading(event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">
                  Tags
                </label>
                <span className="text-xs text-gray-500">
                  Customise background and text colour per tag
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tag and press Enter"
                  className="flex-1 rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {tags.length === 0 && (
                  <p className="text-xs text-gray-500">
                    No tags yet. Add one to start styling.
                  </p>
                )}
                {tags.map((tag) => (
                  <div
                    key={tag.label}
                    className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white/70 px-4 py-3"
                  >
                    <span
                      className="inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: tag.bgColor,
                        color: tag.textColor,
                      }}
                    >
                      {tag.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wide text-gray-500">
                        BG
                      </span>
                      <input
                        type="color"
                        value={tag.bgColor}
                        onChange={(event) =>
                          updateTagStyle(tag.label, {
                            bgColor: event.target.value,
                          })
                        }
                        className="h-9 w-14 rounded-lg border border-gray-200 bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wide text-gray-500">
                        Text
                      </span>
                      <input
                        type="color"
                        value={tag.textColor}
                        onChange={(event) =>
                          updateTagStyle(tag.label, {
                            textColor: event.target.value,
                          })
                        }
                        className="h-9 w-14 rounded-lg border border-gray-200 bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.label)}
                      className="ml-auto text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-800">
                  Blog Content
                </label>
                <span className="text-xs text-gray-500">
                  Use the toolbar for headings, formatting, quotes, and more
                </span>
              </div>
              <TipTapEditor
                content={blogContent}
                onChange={setBlogContent}
                placeholder="Start writing your blog post..."
                onUploadAsset={uploadFile}
              />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Downloadable resources
                  </p>
                  <p className="text-xs text-gray-500">
                    Each card captures the file name students see plus the asset
                    you upload from your laptop.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addDownloadable}
                  className="rounded-2xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:-translate-y-[1px]"
                >
                  Add resource
                </button>
              </div>

              {downloadables.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-500">
                  No files attached yet. Click &quot;Add resource&quot; to
                  include PDFs, slides, or other study materials.
                </div>
              )}

              {downloadables.some((resource) => resource.asset_url) && (
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-800">
                    Current downloadable files
                  </p>
                  <ul className="mt-3 space-y-2">
                    {downloadables
                      .filter((resource) => resource.asset_url)
                      .map((resource) => (
                        <li
                          key={`${resource.id}-summary`}
                          className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/80 bg-white px-3 py-2 text-sm text-gray-700"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900">
                              {resource.title || "Untitled resource"}
                            </p>
                            <p className="text-xs text-gray-500 break-all">
                              {extractFileNameFromUrl(resource.asset_url) ||
                                resource.asset_url}
                            </p>
                          </div>
                          <a
                            href={resource.asset_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-[#4668f7] hover:underline"
                          >
                            Open
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                {downloadables.map((resource, index) => {
                  const titleId = `${resource.id}-title`;
                  const uploadId = `${resource.id}-upload`;
                  return (
                    <div
                      key={resource.id}
                      className="space-y-3 rounded-2xl border border-gray-200 bg-white/80 p-4"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                        <span>Resource {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeDownloadable(resource.id)}
                          className="text-[#dc2626] transition hover:text-[#b91c1c]"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor={titleId}
                          className="text-sm font-semibold text-gray-800"
                        >
                          Title
                        </label>
                        <input
                          id={titleId}
                          type="text"
                          value={resource.title}
                          onChange={(event) =>
                            updateDownloadableTitle(
                              resource.id,
                              event.target.value
                            )
                          }
                          placeholder="HSC Economics 2025 Solutions"
                          className="w-full rounded-2xl border border-white/80 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-800">
                          Upload file
                        </p>
                        <label
                          htmlFor={uploadId}
                          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/60 px-4 py-6 text-center text-sm text-gray-600 transition hover:border-[#4668f7]"
                        >
                          {resource.isUploading ? (
                            <span className="font-semibold text-[#4668f7]">
                              Uploading…
                            </span>
                          ) : resource.asset_url ? (
                            <div className="flex w-full flex-col items-center gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="h-4 w-4"
                                >
                                  <path
                                    d="M4 8l2.5 2.5L12 5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                File uploaded
                              </span>
                              <p className="text-sm font-semibold text-gray-900">
                                {resource.fileName ||
                                  extractFileNameFromUrl(resource.asset_url)}
                              </p>
                              <p className="text-xs text-gray-500 break-all">
                                {resource.asset_url}
                              </p>
                              <span className="text-xs font-semibold text-[#4668f7]">
                                Click to replace file
                              </span>
                            </div>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="mb-2 h-6 w-6 text-[#4668f7]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 9 12 4.5 7.5 9M12 4.5V15"
                                />
                              </svg>
                              <span className="font-semibold text-[#4668f7]">
                                Click to upload
                              </span>
                              <span className="text-xs text-gray-500">
                                PDF, DOCX, PNG, etc.
                              </span>
                            </>
                          )}
                          <input
                            id={uploadId}
                            type="file"
                            className="sr-only"
                            onChange={(event) => {
                              handleUploadFile(
                                resource.id,
                                event.target.files?.[0] ?? null
                              );
                              event.target.value = "";
                            }}
                          />
                        </label>
                        {resource.uploadError && (
                          <p className="text-xs font-semibold text-red-500">
                            {resource.uploadError}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Status: {isDraft ? "Draft" : "Ready to publish"}
                  {currentDraftId && (
                    <span className="ml-2 text-[11px] text-gray-400">
                      #{currentDraftId}
                    </span>
                  )}
                </span>
                <div className="ml-auto flex flex-wrap gap-3">
                  <button
                    className="rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                    type="button"
                    onClick={() => handleSubmit("post")}
                    disabled={isSaving || slugBlocked}
                  >
                    {isSaving && saveMode === "post" ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    disabled={isSaving || slugBlocked}
                  >
                    {isSaving && saveMode === "draft"
                      ? "Saving..."
                      : "Save draft"}
                  </button>
                  <button
                    className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    disabled={isSaving}
                  >
                    Preview
                  </button>
                </div>
              </div>
              {submissionError && (
                <p className="text-xs font-semibold text-red-500">
                  {submissionError}
                </p>
              )}
              {submissionMessage && (
                <p className="text-xs font-semibold text-emerald-600">
                  {submissionMessage}
                </p>
              )}
            </div>
          </div>

          {/* Right Sidebar - Context & Metadata */}
          <div className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Context & metadata
              </h2>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-800"
                  htmlFor="context-date"
                >
                  Publish date
                </label>
                <input
                  id="context-date"
                  type="date"
                  value={context.date}
                  onChange={(event) =>
                    setContext((prev) => ({
                      ...prev,
                      date: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-800"
                  htmlFor="context-readtime"
                >
                  Read time
                </label>
                <input
                  id="context-readtime"
                  type="text"
                  placeholder="8 min read"
                  value={context.readTime}
                  onChange={(event) =>
                    setContext((prev) => ({
                      ...prev,
                      readTime: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">
                    Heading color
                  </label>
                  <input
                    type="color"
                    value={context.headingColor}
                    onChange={(event) =>
                      setContext((prev) => ({
                        ...prev,
                        headingColor: event.target.value,
                      }))
                    }
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">
                    Subheading color
                  </label>
                  <input
                    type="color"
                    value={context.subheadingColor}
                    onChange={(event) =>
                      setContext((prev) => ({
                        ...prev,
                        subheadingColor: event.target.value,
                      }))
                    }
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Author Section */}
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  Written by
                </h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label
                    className="text-xs font-medium text-gray-600"
                    htmlFor="author-name"
                  >
                    Name
                  </label>
                  <input
                    id="author-name"
                    type="text"
                    placeholder="Sarah Johnson"
                    value={context.author.name}
                    onChange={(event) =>
                      setContext((prev) => ({
                        ...prev,
                        author: { ...prev.author, name: event.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-medium text-gray-600"
                    htmlFor="author-position"
                  >
                    Position
                  </label>
                  <input
                    id="author-position"
                    type="text"
                    placeholder="Designer, Craft+Curiosity"
                    value={context.author.position}
                    onChange={(event) =>
                      setContext((prev) => ({
                        ...prev,
                        author: {
                          ...prev.author,
                          position: event.target.value,
                        },
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    Profile photo
                  </label>
                  <div className="flex items-center gap-3">
                    {context.author.pfp ? (
                      <div className="relative">
                        <Image
                          src={context.author.pfp}
                          alt="Author"
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                          style={{
                            objectPosition:
                              context.author.pfpPosition || "50% 50%",
                          }}
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setContext((prev) => ({
                              ...prev,
                              author: { ...prev.author, pfp: "" },
                            }))
                          }
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <span className="inline-block rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                        {authorPfpUploading ? "Uploading..." : "Upload photo"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          handleAuthorPfpUpload(event.target.files?.[0]);
                          event.target.value = "";
                        }}
                        disabled={authorPfpUploading}
                      />
                    </label>
                  </div>
                  {authorPfpError && (
                    <p className="text-xs text-red-500">{authorPfpError}</p>
                  )}
                  {context.author.pfp && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => openPfpAdjustModal("author")}
                        className="text-xs font-semibold text-[#4668f7] hover:text-[#3653cf]"
                      >
                        Adjust crop with cursor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contributors Section */}
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  Contributors
                </h3>
                <button
                  type="button"
                  onClick={addContributor}
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  + Add
                </button>
              </div>

              {contributors.length === 0 && (
                <p className="text-xs text-gray-500">
                  No contributors added yet.
                </p>
              )}

              <div className="space-y-3">
                {contributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="space-y-2 rounded-xl border border-gray-200 bg-white p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Contributor {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeContributor(contributor.id)}
                        className="text-xs text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={contributor.name}
                      onChange={(e) =>
                        updateContributor(
                          contributor.id,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-[#4668f7] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={contributor.position}
                      onChange={(e) =>
                        updateContributor(
                          contributor.id,
                          "position",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-[#4668f7] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      {contributor.pfp ? (
                        <div className="relative">
                          <Image
                            src={contributor.pfp}
                            alt={contributor.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full object-cover"
                            style={{
                              objectPosition:
                                contributor.pfpPosition || "50% 50%",
                            }}
                            unoptimized
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateContributor(contributor.id, "pfp", "")
                            }
                            className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                          </svg>
                        </div>
                      )}
                      <label className="cursor-pointer">
                        <span className="text-xs text-[#4668f7] hover:underline">
                          {contributor.isUploading ? "Uploading..." : "Upload"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            handleContributorPfpUpload(
                              contributor.id,
                              e.target.files?.[0]
                            );
                            e.target.value = "";
                          }}
                          disabled={contributor.isUploading}
                        />
                      </label>
                    </div>
                    {contributor.uploadError && (
                      <p className="text-xs text-red-500">
                        {contributor.uploadError}
                      </p>
                    )}
                    {contributor.pfp && (
                      <button
                        type="button"
                        onClick={() =>
                          openPfpAdjustModal("contributor", contributor.id)
                        }
                        className="text-xs font-semibold text-[#4668f7] hover:text-[#3653cf]"
                      >
                        Adjust crop with cursor
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Upload */}
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  Hero upload
                </h3>
                {blogHero && (
                  <button
                    type="button"
                    onClick={clearHeroImage}
                    className="text-xs font-semibold text-[#4668f7] transition hover:opacity-75"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Drop an image here to upload it to storage instantly.
              </p>
              {blogHero && (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <div
                    className="h-32 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${blogHero})` }}
                  />
                </div>
              )}
              {!blogHero && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/50 px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  No hero image selected
                </div>
              )}
              <label
                htmlFor="hero-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50 px-4 py-4 text-center text-sm text-gray-600 transition hover:border-[#4668f7]"
              >
                {heroUploadState.isUploading ? (
                  <span className="font-semibold text-[#4668f7]">
                    Uploading hero...
                  </span>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mb-2 h-5 w-5 text-[#4668f7]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 9L12 4.5 7.5 9M12 4.5V15"
                      />
                    </svg>
                    <span className="text-xs">Drop image or click to pick</span>
                  </>
                )}
                <input
                  id="hero-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    await handleHeroUpload(file);
                    event.target.value = "";
                  }}
                />
              </label>
              {heroUploadState.error && (
                <p className="text-xs font-semibold text-red-500">
                  {heroUploadState.error}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Publishing checklist
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Hero image + slug added</li>
                <li>• Tags cover topics and read time</li>
                <li>• Author info filled in</li>
                <li>• Content reviewed in preview</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {pfpAdjustTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Adjust photo focus
            </h3>
            <p className="text-sm text-gray-600">
              Click anywhere in the image to set the focal point.
            </p>
            {(() => {
              const { x, y } = parsePosition(pfpAdjustTarget.position);
              return (
                <div
                  className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                  style={{
                    backgroundImage: `url(${pfpAdjustTarget.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: pfpAdjustTarget.position,
                  }}
                  onClick={handlePfpPositionSelect}
                >
                  <div
                    className="pointer-events-none absolute h-3 w-3 rounded-full border-2 border-white bg-[#4668f7]"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              );
            })()}
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPfpAdjustTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyPfpPosition}
                className="rounded-lg bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3653cf]"
              >
                Save position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmBlogId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmBlogId(null)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBlog(deleteConfirmBlogId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
