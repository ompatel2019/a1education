// app/(admin)/admin/blog/page.tsx

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import BlogHeader from "@/components/BlogHeader";
import { DEFAULT_BLOG_SLUG, slugify } from "@/lib/utils/slug";

type BlogSection = {
  id: string;
  section_heading: string;
  section_text: string;
};

type BlogContext = {
  date: string;
  author: string;
  readTime: string;
};

type BlogDownloadable = {
  id: string;
  title: string;
  asset_url: string;
  fileName: string;
  isUploading: boolean;
  uploadError: string | null;
};

const nextSectionId = () => `section-${Math.random().toString(36).slice(2, 9)}`;
const nextDownloadableId = () =>
  `downloadable-${Math.random().toString(36).slice(2, 9)}`;

const createSection = (): BlogSection => ({
  id: nextSectionId(),
  section_heading: "",
  section_text: "",
});

const createDownloadable = (): BlogDownloadable => ({
  id: nextDownloadableId(),
  title: "",
  asset_url: "",
  fileName: "",
  isUploading: false,
  uploadError: null,
});

type RawSection = {
  section_heading?: unknown;
  section_text?: unknown;
};

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
  const [tags, setTags] = useState<string[]>(["Education", "A1 Updates"]);
  const [tagInput, setTagInput] = useState("");
  const [sections, setSections] = useState<BlogSection[]>([createSection()]);
  const [downloadables, setDownloadables] = useState<BlogDownloadable[]>([]);
  const [context, setContext] = useState<BlogContext>({
    date: "",
    author: "",
    readTime: "",
  });
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

  const previewPayload = useMemo(
    () => ({
      slug,
      blog_hero: blogHero,
      blog_header: blogHeader,
      blog_subheading: blogSubheading,
      blog_tags: tags,
      blog_text: sections.map(({ section_heading, section_text }) => ({
        section_heading,
        section_text,
      })),
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
      blog_context: context,
      draft: isDraft,
    }),
    [
      slug,
      blogHero,
      blogHeader,
      blogSubheading,
      tags,
      sections,
      downloadables,
      context,
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
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const handleRemoveTag = (value: string) => {
    setTags((prev) => prev.filter((tag) => tag !== value));
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const addSection = () => {
    setSections((prev) => [...prev, createSection()]);
  };

  const updateSection = (
    id: string,
    field: keyof BlogSection,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const removeSection = (id: string) => {
    setSections((prev) =>
      prev.length === 1 ? prev : prev.filter((section) => section.id !== id)
    );
  };

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

  const handleHeroUpload = async (file?: File | null) => {
    if (!file) return;

    setHeroUploadState({ isUploading: true, fileName: file.name, error: null });

    try {
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

  const handleUploadFile = async (id: string, file?: File | null) => {
    if (!file) return;

    patchDownloadable(id, { isUploading: true, uploadError: null });

    try {
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
    setTags(["Education", "A1 Updates"]);
    setTagInput("");
    setSections([createSection()]);
    setDownloadables([]);
    setContext({ date: "", author: "", readTime: "" });
    setIsDraft(true);
    setCurrentDraftId(null);
    setSubmissionError(null);
    setSubmissionMessage(null);
    setHeroUploadState({
      isUploading: false,
      fileName: "",
      error: null,
    });
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

  const resolveUploadSlug = () =>
    slugify(slug || blogHeader || DEFAULT_BLOG_SLUG, DEFAULT_BLOG_SLUG);

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

  const parseJsonArray = (value: unknown): RawSection[] => {
    if (Array.isArray(value)) {
      return value.filter(
        (item): item is RawSection => !!item && typeof item === "object"
      );
    }
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed)
          ? parsed.filter(
              (item): item is RawSection => !!item && typeof item === "object"
            )
          : [];
      } catch {
        return [];
      }
    }
    return [];
  };

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

  const parseJsonObject = (value: unknown): BlogContext => {
    const fallback = { date: "", author: "", readTime: "" };
    if (value && typeof value === "object") {
      const obj = value as Record<string, unknown>;
      return {
        date: typeof obj.date === "string" ? obj.date : "",
        author: typeof obj.author === "string" ? obj.author : "",
        readTime: typeof obj.readTime === "string" ? obj.readTime : "",
      };
    }
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return {
          date: typeof parsed?.date === "string" ? parsed.date : "",
          author: typeof parsed?.author === "string" ? parsed.author : "",
          readTime: typeof parsed?.readTime === "string" ? parsed.readTime : "",
        };
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  const upsertSectionsFromDraft = (rawSections: unknown) => {
    const normalized = parseJsonArray(rawSections);
    if (!normalized.length) return [createSection()];
    return normalized.map((section) => ({
      id: nextSectionId(),
      section_heading:
        typeof section.section_heading === "string"
          ? section.section_heading
          : "",
      section_text:
        typeof section.section_text === "string" ? section.section_text : "",
    }));
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
    setTags(parseTags(draft.blog_tags));
    setSections(upsertSectionsFromDraft(draft.blog_text));
    setDownloadables(upsertDownloadablesFromDraft(draft.blog_downloadables));
    setContext(parseJsonObject(draft.blog_context));
    setIsDraft(true);
    setCurrentDraftId(draft.id);
    setSubmissionError(null);
    setSubmissionMessage(null);
    setActiveView("create");
    setHeroUploadState({
      isUploading: false,
      fileName: draft.blog_hero
        ? extractFileNameFromUrl(draft.blog_hero)
        : "",
      error: null,
    });
  };

  const buildPayload = (draftFlag: boolean, resolvedSlug: string) => ({
    slug: resolvedSlug.trim(),
    blog_hero: blogHero.trim() ? blogHero.trim() : null,
    blog_header: blogHeader.trim(),
    blog_subheading: blogSubheading.trim(),
    blog_tags: tags.map((tag) => tag.trim()).filter(Boolean),
    blog_text: sections.map((section) => ({
      section_heading: section.section_heading.trim(),
      section_text: section.section_text.trim(),
    })),
    blog_downloadables: downloadables
      .map((entry) => {
        const title = entry.title.trim();
        const assetUrl = entry.asset_url.trim();
        return { title, asset_url: assetUrl };
      })
      .filter((entry) => entry.title && entry.asset_url),
    blog_context: {
      date: context.date,
      author: context.author,
      readTime: context.readTime,
    },
    draft: draftFlag,
  });

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

      if (mode === "draft") {
        setIsDraft(true);
        setCurrentDraftId(savedRow?.id ?? currentDraftId);
        setSubmissionMessage("Draft saved.");
        await loadDrafts();
      } else {
        await loadDrafts();
        resetBuilder();
        setActiveView("drafts");
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
                No drafts yet. Click “Make a new post” to start one.
              </div>
            )}

            {!draftsLoading &&
              !draftsError &&
              drafts.map((draft) => {
                const tagList = parseTags(draft.blog_tags);
                const sectionsCount = parseJsonArray(draft.blog_text).length;
                const contextMeta = parseJsonObject(draft.blog_context);
                const resourcesCount =
                  parseDownloadables(draft.blog_downloadables).length;
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
                      <span>Author: {contextMeta.author || "—"}</span>
                      <span>Read time: {contextMeta.readTime || "—"}</span>
                      <span>Sections: {sectionsCount}</span>
                      {resourcesCount > 0 && (
                        <span>Resources: {resourcesCount}</span>
                      )}
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
                        className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
                      >
                        Duplicate
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
                const sectionsCount = parseJsonArray(post.blog_text).length;
                const contextMeta = parseJsonObject(post.blog_context);
                const resourcesCount =
                  parseDownloadables(post.blog_downloadables).length;
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
                      <span>Author: {contextMeta.author || "—"}</span>
                      <span>Read time: {contextMeta.readTime || "—"}</span>
                      <span>Sections: {sectionsCount}</span>
                      {resourcesCount > 0 && (
                        <span>Resources: {resourcesCount}</span>
                      )}
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
                        className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
                      >
                        Duplicate
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
                  blogHero={
                    previewPayload.blog_hero ? previewPayload.blog_hero : null
                  }
                />
              </div>

              <article className="max-w-4xl mx-auto px-4 pb-6">
                <div className="prose prose-lg max-w-none">
                  {(context.author || context.date || context.readTime) && (
                    <div className="mb-8 text-gray-600">
                      {context.author && (
                        <>
                          <span className="font-medium">
                            By {context.author}
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

                  {previewPayload.blog_text.length > 0 ? (
                    <div className="text-gray-700 leading-relaxed space-y-10">
                      {previewPayload.blog_text.map((section, index) => (
                        <div
                          key={`${
                            section.section_heading || "section"
                          }-${index}`}
                        >
                          {section.section_heading && (
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                              {section.section_heading}
                            </h2>
                          )}
                          {section.section_text && (
                            <p className="mb-6 whitespace-pre-line text-lg">
                              {section.section_text}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      Add sections to see content here.
                    </div>
                  )}
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
                  onChange={(event) => handleSlugFieldChange(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                />
                <p className={`text-xs ${slugStatusTone}`}>
                  {slugStatus.message ?? "We will auto-build this from the title."}
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

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Tags
              </label>
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
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#4668f7]/10 px-3 py-1 text-xs font-semibold text-[#4668f7]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-[#4668f7]/60 transition hover:text-[#4668f7]"
                      aria-label={`Remove ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Sections
                  </p>
                  <p className="text-xs text-gray-500">
                    Each section captures a heading and supporting copy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="rounded-2xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:-translate-y-[1px]"
                >
                  Add section
                </button>
              </div>

              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50/70 p-4"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                      <span>Section {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="text-[#dc2626] transition hover:text-[#b91c1c]"
                        disabled={sections.length === 1}
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Section heading"
                      value={section.section_heading}
                      onChange={(event) =>
                        updateSection(
                          section.id,
                          "section_heading",
                          event.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-white/80 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                    />
                    <textarea
                      placeholder="Section text"
                      rows={4}
                      value={section.section_text}
                      onChange={(event) =>
                        updateSection(
                          section.id,
                          "section_text",
                          event.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-white/80 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                    />
                  </div>
                ))}
              </div>
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
                  No files attached yet. Click “Add resource” to include PDFs,
                  slides, or other study materials.
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
                    {isSaving && saveMode === "post"
                      ? "Posting..."
                      : currentDraftId
                      ? "Save and Post"
                      : "Post"}
                  </button>
                  <button
                    className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    disabled={isSaving || slugBlocked}
                  >
                    {isSaving && saveMode === "draft"
                      ? "Saving..."
                      : currentDraftId
                      ? "Save as Draft"
                      : "Save as draft"}
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
                  htmlFor="context-author"
                >
                  Author
                </label>
                <input
                  id="context-author"
                  type="text"
                  placeholder="Sarah Johnson"
                  value={context.author}
                  onChange={(event) =>
                    setContext((prev) => ({
                      ...prev,
                      author: event.target.value,
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
            </div>

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
                Drop an image here to upload it to storage instantly. The public
                URL is saved back to this draft.
              </p>
              {blogHero && (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <div
                    className="h-44 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${blogHero})` }}
                  />
                  <div className="border-t border-gray-100 px-3 py-2 text-xs text-gray-500 break-all">
                    {blogHero}
                  </div>
                </div>
              )}
              {!blogHero && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/50 px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  No hero image selected
                </div>
              )}
              {heroUploadState.fileName && (
                <p className="text-xs text-gray-500">
                  Linked file: {heroUploadState.fileName}
                </p>
              )}
              <label
                htmlFor="hero-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50 px-4 py-6 text-center text-sm text-gray-600 transition hover:border-[#4668f7]"
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
                      className="mb-2 h-6 w-6 text-[#4668f7]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 9L12 4.5 7.5 9M12 4.5V15"
                      />
                    </svg>
                    Drop an image or click to pick
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
                <li>• Sections reviewed in preview</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
