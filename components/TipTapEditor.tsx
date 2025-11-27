"use client";

import { Node, mergeAttributes, type CommandProps } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useCallback, useEffect, useState } from "react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    media: {
      setMedia: (options: {
        mediaType: "image" | "video" | "youtube";
        src: string;
        caption?: string;
        poster?: string;
      }) => ReturnType;
    };
  }
}

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onUploadAsset?: (file: File) => Promise<string>;
}

const toYoutubeEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");
    if (hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const shortId =
        pathParts[0] === "embed" || pathParts[0] === "watch"
          ? pathParts[1]
          : pathParts[0];
      return shortId ? `https://www.youtube.com/embed/${shortId}` : "";
    }
  } catch (error) {
    console.warn("Invalid YouTube URL", error);
  }
  return "";
};

const Media = Node.create({
  name: "media",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      mediaType: {
        default: "image",
      },
      src: {
        default: "",
      },
      caption: {
        default: "",
      },
      poster: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-media-type]",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          const mediaType = el.getAttribute("data-media-type") || "image";
          const src =
            el.getAttribute("data-src") ||
            el.querySelector("img")?.getAttribute("src") ||
            el.querySelector("video")?.getAttribute("src") ||
            el.querySelector("iframe")?.getAttribute("src") ||
            "";
          const caption =
            el.getAttribute("data-caption") ||
            el.querySelector("figcaption")?.textContent ||
            "";
          const poster = el.getAttribute("data-poster") || "";

          return {
            mediaType,
            src,
            caption,
            poster,
          };
        },
      },
      {
        tag: "img[src]",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            mediaType: "image",
            src: el.getAttribute("src"),
            caption: el.getAttribute("alt") || "",
          };
        },
      },
      {
        tag: "video[src]",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            mediaType: "video",
            src: el.getAttribute("src"),
            poster: el.getAttribute("poster") || "",
            caption: el.getAttribute("data-caption") || "",
          };
        },
      },
      {
        tag: 'iframe[src][data-media-type="youtube"]',
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            mediaType: "youtube",
            src: el.getAttribute("src"),
            caption: el.getAttribute("title") || "",
          };
        },
      },
      {
        tag: 'iframe[src*="youtube.com"]',
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            mediaType: "youtube",
            src: el.getAttribute("src"),
            caption: el.getAttribute("title") || "",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const mediaType = HTMLAttributes.mediaType || "image";
    const src = HTMLAttributes.src as string;
    const caption = HTMLAttributes.caption as string;
    const poster = HTMLAttributes.poster as string;

    if (!src) return ["div", {}];

    if (mediaType === "youtube") {
      return [
        "figure",
        mergeAttributes(HTMLAttributes, {
          "data-media-type": "youtube",
          "data-src": src,
          "data-caption": caption,
          class: "media-block",
        }),
        [
          "div",
          { class: "media-wrapper" },
          [
            "iframe",
            {
              src,
              title: caption || "Embedded video",
              allow:
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              allowfullscreen: "true",
            },
          ],
        ],
        caption ? ["figcaption", caption] : "",
      ];
    }

    if (mediaType === "video") {
      return [
        "figure",
        mergeAttributes(HTMLAttributes, {
          "data-media-type": "video",
          "data-src": src,
          "data-caption": caption,
          class: "media-block",
        }),
        [
          "div",
          { class: "media-wrapper" },
          [
            "video",
            {
              src,
              controls: "true",
              preload: "metadata",
              poster: poster || undefined,
            },
          ],
        ],
        caption ? ["figcaption", caption] : "",
      ];
    }

    return [
      "figure",
      mergeAttributes(HTMLAttributes, {
        "data-media-type": "image",
        "data-src": src,
        "data-caption": caption,
        class: "media-block",
      }),
      [
        "div",
        { class: "media-wrapper" },
        [
          "img",
          {
            src,
            alt: caption || "Blog image",
          },
        ],
      ],
      caption ? ["figcaption", caption] : "",
    ];
  },

  addCommands() {
    return {
      setMedia:
        (options: {
          mediaType: "image" | "video" | "youtube";
          src: string;
          caption?: string;
          poster?: string;
        }) =>
        ({ commands }: CommandProps) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              mediaType: options.mediaType,
              src: options.src,
              caption: options.caption ?? "",
              poster: options.poster ?? "",
            },
          }),
    };
  },
});

const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      variant: {
        default: "info",
      },
      title: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-callout]",
        getAttrs: (element) => {
          const el = element as HTMLElement;
          return {
            variant: el.getAttribute("data-callout") || "info",
            title: el.getAttribute("data-title") || "",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const variant = HTMLAttributes.variant || "info";
    const title = HTMLAttributes.title || "";

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-callout": variant,
        "data-title": title,
        class: `callout callout-${variant}`,
      }),
      title
        ? ["div", { class: "callout-title" }, title]
        : ["div", { class: "callout-title" }],
      ["div", { class: "callout-body" }, 0],
    ];
  },
});

const MenuButton = ({
  onClick,
  isActive,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`h-9 min-w-[36px] rounded-md border text-sm font-medium transition-colors flex items-center justify-center gap-1 px-2 ${
      isActive
        ? "border-[#4668f7] bg-[#4668f7]/10 text-[#18224b]"
        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" strokeWidth="1.5" />
    <path d="M12 17v-5" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 8h.01" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <path d="M20 7 10 17l-4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" strokeWidth="1.5" />
  </svg>
);

const IconWarn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <path
      d="M12.866 4.5c-.385-.667-1.347-.667-1.732 0l-7 12.133A1 1 0 005.866 18.5h12.268a1 1 0 00.732-1.867l-7-12.133Z"
      strokeWidth="1.5"
    />
    <path d="M12 9v4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 16h.01" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconImage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" strokeWidth="1.5" />
    <path
      d="M7.5 13.5l2.8-3 4.2 4.5 2-2.5 2.5 3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="8" r="1.4" fill="currentColor" />
  </svg>
);

const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <rect x="4" y="6" width="11" height="12" rx="2" strokeWidth="1.5" />
    <path d="M15 10.5 20 8v8l-5-2.5V10.5Z" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <path d="M6 8.5h12" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10 5h4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8.5 5.5h7" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M9 9v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTable = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
    <rect x="4" y="6" width="16" height="12" rx="1.8" strokeWidth="1.5" />
    <path d="M4 11h16M12 6v12" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function TipTapEditor({
  content,
  onChange,
  placeholder = "Start writing your blog post...",
  onUploadAsset,
}: TipTapEditorProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCaption, setVideoCaption] = useState("");
  const [videoMode, setVideoMode] = useState<"youtube" | "mp4">("youtube");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [colorValue, setColorValue] = useState("#111827");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#4668f7] underline",
        },
      }),
      Media,
      Callout,
      Table.configure({
        resizable: false,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] px-4 py-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const syncColor = () => {
      const current = editor.getAttributes("textStyle").color;
      setColorValue(current || "#111827");
    };
    editor.on("selectionUpdate", syncColor);
    editor.on("transaction", syncColor);
    return () => {
      editor.off("selectionUpdate", syncColor);
      editor.off("transaction", syncColor);
    };
  }, [editor]);

  // Only sync content when it's a meaningful change (not empty/initial states)
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();
    const incomingContent = content || "<p></p>";

    // Only update if content is substantially different and not just empty states
    const isCurrentEmpty =
      !currentContent || currentContent === "<p></p>" || currentContent === "";
    const isIncomingEmpty = !content || content === "<p></p>" || content === "";

    // If both are empty, don't update
    if (isCurrentEmpty && isIncomingEmpty) return;

    // If incoming has content and current is empty, update
    if (!isIncomingEmpty && isCurrentEmpty) {
      editor.commands.setContent(incomingContent);
    }
  }, [content, editor]);

  const handleOpenLinkModal = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkValue(previousUrl);
    setIsLinkModalOpen(true);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    const url = linkValue.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setIsLinkModalOpen(false);
  }, [editor, linkValue]);

  const cancelLink = useCallback(() => {
    setIsLinkModalOpen(false);
    setLinkValue("");
  }, []);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteTable().run();
  }, [editor]);

  const insertCallout = useCallback(
    (variant: "info" | "success" | "warning") => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .insertContent({
          type: "callout",
          attrs: {
            variant,
            title:
              variant === "info"
                ? "Tip"
                : variant === "success"
                ? "Success"
                : "Warning",
          },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Add your note here..." }],
            },
          ],
        })
        .run();
    },
    [editor]
  );

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setImageUrl("");
    setImageCaption("");
    setImageFile(null);
    setImageError(null);
    setIsImageUploading(false);
  };

  const insertImage = async () => {
    if (!editor) return;
    setImageError(null);
    let finalUrl = imageUrl.trim();

    try {
      if (!finalUrl && imageFile) {
        if (!onUploadAsset) {
          setImageError("Uploads are disabled in this editor.");
          return;
        }
        setIsImageUploading(true);
        finalUrl = await onUploadAsset(imageFile);
      }

      if (!finalUrl) {
        setImageError("Add an image URL or upload a file.");
        return;
      }

      editor
        .chain()
        .focus()
        .setMedia({
          mediaType: "image",
          src: finalUrl,
          caption: imageCaption.trim(),
        })
        .run();
      closeImageModal();
    } catch (error) {
      setImageError(
        error instanceof Error ? error.message : "Failed to insert image."
      );
    } finally {
      setIsImageUploading(false);
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoUrl("");
    setVideoCaption("");
    setVideoFile(null);
    setVideoMode("youtube");
    setVideoError(null);
    setIsVideoUploading(false);
  };

  const insertVideo = async () => {
    if (!editor) return;
    setVideoError(null);
    let finalUrl = videoUrl.trim();
    const mediaType: "youtube" | "video" =
      videoMode === "youtube" ? "youtube" : "video";

    try {
      if (videoMode === "youtube") {
        finalUrl = toYoutubeEmbedUrl(finalUrl);
        if (!finalUrl) {
          setVideoError("Add a valid YouTube link.");
          return;
        }
      } else {
        if (!finalUrl && videoFile) {
          if (!onUploadAsset) {
            setVideoError("Uploads are disabled in this editor.");
            return;
          }
          setIsVideoUploading(true);
          finalUrl = await onUploadAsset(videoFile);
        }

        if (!finalUrl) {
          setVideoError("Add an MP4 link or upload a video file.");
          return;
        }
      }

      editor
        .chain()
        .focus()
        .setMedia({
          mediaType,
          src: finalUrl,
          caption: videoCaption.trim(),
        })
        .run();
      closeVideoModal();
    } catch (error) {
      setVideoError(
        error instanceof Error ? error.message : "Failed to insert video."
      );
    } finally {
      setIsVideoUploading(false);
    }
  };

  if (!editor) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white/70 min-h-[400px] flex items-center justify-center text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b border-gray-200 bg-gray-50/80">
        {/* Text Formatting */}
        <div className="flex gap-1 mr-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <strong>B</strong>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <em>I</em>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <u>U</u>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <s>S</s>
          </MenuButton>
        </div>

        {/* Text Color */}
        <div className="flex items-center gap-2 mr-3 border-l border-gray-300 pl-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Color
          </span>
          <input
            type="color"
            value={colorValue}
            onChange={(event) => {
              const value = event.target.value;
              setColorValue(value);
              editor.chain().focus().setColor(value).run();
            }}
            className="h-8 w-10 cursor-pointer rounded border border-gray-200 bg-white"
          />
          <button
            type="button"
            onClick={() => {
              setColorValue("#111827");
              editor.chain().focus().unsetColor().run();
            }}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Clear
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 mr-3 border-l border-gray-300 pl-2">
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            H1
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            H2
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            H3
          </MenuButton>
        </div>

        {/* Lists */}
        <div className="flex gap-1 mr-3 border-l border-gray-300 pl-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z"
                clipRule="evenodd"
              />
            </svg>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
              <path d="M2.22 3.47a.75.75 0 011.06 0l.47.47V2.75a.75.75 0 011.5 0v2.5a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.043l-.72-.72a.75.75 0 010-1.06zM2 9.25a.75.75 0 01.75-.75H4a.75.75 0 01.53 1.28l-.98.98H4a.75.75 0 010 1.5H2.75a.75.75 0 01-.53-1.28l.98-.98H2.75A.75.75 0 012 9.25zM2 15.25a.75.75 0 01.75-.75H4a.75.75 0 010 1.5h-.5v.25a.25.25 0 00.25.25h.25a.75.75 0 010 1.5H3.5a.75.75 0 01-.75-.75v-.5a.75.75 0 01.22-.53l.03-.03a.75.75 0 00-.22.03H2.75a.75.75 0 01-.75-.75v-.25z" />
            </svg>
          </MenuButton>
        </div>

        {/* Block Elements */}
        <div className="flex gap-1 mr-3 border-l border-gray-300 pl-2">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote Block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            isActive={false}
            title="Horizontal Rule"
          >
            —
          </MenuButton>
        </div>

        {/* Callouts */}
        <div className="flex gap-1 mr-3 border-l border-gray-300 pl-2">
          <MenuButton
            onClick={() => insertCallout("info")}
            isActive={editor.isActive("callout", { variant: "info" })}
            title="Info callout"
          >
            <IconInfo />
          </MenuButton>
          <MenuButton
            onClick={() => insertCallout("success")}
            isActive={editor.isActive("callout", { variant: "success" })}
            title="Success callout"
          >
            <IconCheck />
          </MenuButton>
          <MenuButton
            onClick={() => insertCallout("warning")}
            isActive={editor.isActive("callout", { variant: "warning" })}
            title="Warning callout"
          >
            <IconWarn />
          </MenuButton>
        </div>

        {/* Tables */}
        <div className="flex gap-1 mr-2 border-l border-gray-300 pl-2">
          <MenuButton onClick={insertTable} title="Insert table">
            <IconTable />
          </MenuButton>
          <MenuButton onClick={deleteTable} title="Remove table">
            <IconTrash />
          </MenuButton>
        </div>

        {/* Link */}
        <div className="flex gap-1 border-l border-gray-300 pl-2 relative">
          <MenuButton
            onClick={handleOpenLinkModal}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
            </svg>
          </MenuButton>
          {isLinkModalOpen && (
            <div className="absolute top-12 right-0 z-10 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
              <label className="text-xs font-semibold text-gray-500">
                Link URL
              </label>
              <input
                type="url"
                value={linkValue}
                onChange={(event) => setLinkValue(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/20"
                placeholder="https://example.com"
              />
              <div className="mt-3 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1 font-semibold text-gray-600 hover:bg-gray-50"
                  onClick={cancelLink}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#4668f7] px-3 py-1 font-semibold text-white hover:bg-[#3653cf]"
                  onClick={applyLink}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Media */}
        <div className="flex gap-1 border-l border-gray-300 pl-2 relative">
          <MenuButton
            onClick={() => setIsImageModalOpen((prev) => !prev)}
            isActive={false}
            title="Add Photo"
          >
            <IconImage />
          </MenuButton>
          <MenuButton
            onClick={() => setIsVideoModalOpen((prev) => !prev)}
            isActive={false}
            title="Add Video"
          >
            <IconVideo />
          </MenuButton>

          {isImageModalOpen && (
            <div className="absolute top-12 right-0 z-20 w-96 max-w-[90vw] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/20"
                  placeholder="https://example.com/hero.jpg"
                />
              </div>
              <div className="space-y-2 rounded-lg border border-dashed border-gray-200 bg-gray-50/70 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      Upload from device
                    </p>
                    <p className="text-[11px] text-gray-500">
                      JPG, PNG, WEBP. Uses blog slug for naming.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center rounded-md bg-[#4668f7] px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#3653cf]">
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setImageFile(event.target.files?.[0] ?? null)
                      }
                      className="sr-only"
                    />
                  </label>
                </div>
                {imageFile && (
                  <p className="text-xs text-gray-600">
                    Selected: <span className="font-semibold">{imageFile.name}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(event) => setImageCaption(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/20"
                  placeholder="Describe what readers see"
                />
              </div>
              {imageError && (
                <p className="text-xs text-red-500">{imageError}</p>
              )}
              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 font-semibold text-gray-600 hover:bg-gray-50"
                  onClick={closeImageModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#4668f7] px-3 py-1.5 font-semibold text-white hover:bg-[#3653cf] disabled:opacity-60"
                  onClick={insertImage}
                  disabled={isImageUploading}
                >
                  {isImageUploading ? "Uploading..." : "Insert"}
                </button>
              </div>
            </div>
          )}

          {isVideoModalOpen && (
            <div className="absolute top-12 right-0 z-20 w-96 max-w-[90vw] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Video source
                </label>
                <select
                  value={videoMode}
                  onChange={(event) =>
                    setVideoMode(event.target.value as "youtube" | "mp4")
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/20"
                >
                  <option value="youtube">YouTube link</option>
                  <option value="mp4">MP4 link or upload</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  {videoMode === "youtube"
                    ? "YouTube URL"
                    : "MP4 URL (optional if uploading)"}
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(event) => setVideoUrl(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/20"
                  placeholder={
                    videoMode === "youtube"
                      ? "https://youtube.com/watch?v=..."
                      : "https://example.com/video.mp4"
                  }
                />
              </div>

              {videoMode === "mp4" && (
                <div className="space-y-2 rounded-lg border border-dashed border-gray-200 bg-gray-50/70 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-700">
                        Upload from device
                      </p>
                      <p className="text-[11px] text-gray-500">
                        MP4 preferred. Uses blog slug for naming.
                      </p>
                    </div>
                    <label className="inline-flex cursor-pointer items-center rounded-md bg-[#4668f7] px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#3653cf]">
                      Choose file
                      <input
                        type="file"
                        accept="video/mp4,video/*"
                        onChange={(event) =>
                          setVideoFile(event.target.files?.[0] ?? null)
                        }
                        className="sr-only"
                      />
                    </label>
                  </div>
                  {videoFile && (
                    <p className="text-xs text-gray-600">
                      Selected: <span className="font-semibold">{videoFile.name}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={videoCaption}
                  onChange={(event) => setVideoCaption(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/20"
                  placeholder="Add context for this clip"
                />
              </div>

              {videoError && (
                <p className="text-xs text-red-500">{videoError}</p>
              )}

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 font-semibold text-gray-600 hover:bg-gray-50"
                  onClick={closeVideoModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#4668f7] px-3 py-1.5 font-semibold text-white hover:bg-[#3653cf] disabled:opacity-60"
                  onClick={insertVideo}
                  disabled={isVideoUploading}
                >
                  {isVideoUploading ? "Uploading..." : "Insert"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Editor Styles */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .ProseMirror p {
          margin-bottom: 0.75rem;
          line-height: 1.75;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #4668f7;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
          background: #f8fafc;
          padding: 1rem 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .ProseMirror ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          list-style: disc;
        }

        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          list-style: decimal;
        }

        .ProseMirror li {
          margin-bottom: 0.35rem;
        }

        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        .ProseMirror figure.media-block {
          background: #f8fafc;
          border: 1px dashed #e5e7eb;
          border-radius: 16px;
          padding: 12px;
          margin: 16px 0;
        }

        .ProseMirror figure .media-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #0f172a;
          aspect-ratio: 16 / 9;
        }

        .ProseMirror figure .media-wrapper iframe,
        .ProseMirror figure .media-wrapper video,
        .ProseMirror figure .media-wrapper img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 0;
          display: block;
        }

        .ProseMirror figcaption {
          margin-top: 8px;
          text-align: center;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .ProseMirror a {
          color: #4668f7;
          text-decoration: underline;
        }

        .ProseMirror a:hover {
          color: #3451db;
        }

        .ProseMirror table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }

        .ProseMirror table th,
        .ProseMirror table td {
          border: 1px solid #e5e7eb;
          padding: 10px;
          text-align: left;
        }

        .ProseMirror table th {
          background: #f1f5f9;
          font-weight: 600;
        }

        .ProseMirror .callout {
          padding: 14px 16px;
          border-radius: 12px;
          margin: 1rem 0;
          border: 1px solid transparent;
          background: #f8fafc;
        }

        .ProseMirror .callout .callout-title {
          font-weight: 700;
          margin-bottom: 6px;
        }

        .ProseMirror .callout .callout-body p {
          margin: 0;
        }

        .ProseMirror .callout-info {
          border-color: #c7d2fe;
          background: #eef2ff;
          color: #1e3a8a;
        }

        .ProseMirror .callout-success {
          border-color: #bbf7d0;
          background: #ecfdf3;
          color: #166534;
        }

        .ProseMirror .callout-warning {
          border-color: #fed7aa;
          background: #fff7ed;
          color: #9a3412;
        }
      `}</style>
    </div>
  );
}
