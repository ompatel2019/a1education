"use client";

import { useState } from "react";

export type BlogDownloadableResource = {
  title: string;
  asset_url: string;
};

interface BlogDownloadablesProps {
  items: BlogDownloadableResource[];
}

const getFileLabel = (url: string) => {
  try {
    const parsed = new URL(url);
    const extension = parsed.pathname.split(".").pop();
    return extension ? extension.toUpperCase() : "FILE";
  } catch {
    const fallback = url.split(".").pop();
    return fallback ? fallback.toUpperCase() : "FILE";
  }
};

export default function BlogDownloadables({ items }: BlogDownloadablesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!items.length) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.target as HTMLFormElement);
    const newsletter = formData.get("newsletter") === "on";

    // Get slug from URL
    const pathParts = window.location.pathname.split("/");
    const slug = pathParts[pathParts.length - 1];

    try {
      const response = await fetch("/api/blog-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          slug,
          newsletter,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus("idle");
          setFormState({ name: "", email: "" });
        }, 3000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to connect to server");
    }
  };

  const modal = isModalOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 px-4 py-8"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-[28px] border border-white/20 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="absolute right-4 top-4 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-50"
        >
          Close
        </button>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4668f7]">
            Get access
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            Enter your details
          </h3>
          <p className="text-sm text-gray-600">
            Share your best email and we&apos;ll send the download links as soon
            as marketing automation is connected.
          </p>
        </div>

        {status === "success" ? (
          <div className="mt-6 rounded-2xl bg-green-50 p-6 text-center">
            <p className="text-lg font-semibold text-green-800">Resources Sent!</p>
            <p className="text-sm text-green-600 mt-2">Check your inbox for the download links.</p>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="resource-name"
                className="text-sm font-medium text-gray-800"
              >
                Full name
              </label>
              <input
                id="resource-name"
                name="name"
                type="text"
                placeholder="Taylor Jones"
                value={formState.name}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="resource-email"
                className="text-sm font-medium text-gray-800"
              >
                Email address
              </label>
              <input
                id="resource-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formState.email}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
                required
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className="w-5 h-5 rounded border-gray-300 text-[#4668f7] focus:ring-[#4668f7]"
                defaultChecked
              />
              <label htmlFor="newsletter" className="text-sm text-gray-600 select-none cursor-pointer">
                Join the A1 Newsletter Community
              </label>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/30 transition hover:-translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Get Resources"}
            </button>
          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <section className="bg-slate-50/80 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4668f7]">
                Downloadables
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                Resources referenced in this post
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Grab the templates, walkthroughs, and cheat-sheets we mention in
                the article.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl bg-[#4668f7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px]"
            >
              Get Resources
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="flex gap-4 rounded-3xl border border-white/80 bg-white p-4 shadow-sm"
              >
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4668f7]/15 to-[#8ba5ff]/25 text-xs font-semibold uppercase tracking-[0.2em] text-[#4668f7]">
                  {getFileLabel(item.asset_url)}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {modal}
    </>
  );
}
