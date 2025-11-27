"use client";

import { useState } from "react";
import Image from "next/image";

type AuthorInfo = {
  name: string;
  position: string;
  pfp: string;
  pfpPosition?: string;
};

type Contributor = {
  name: string;
  position: string;
  pfp: string;
  pfpPosition?: string;
};

type Heading = {
  id: string;
  text: string;
  level: number;
};

interface BlogSidebarProps {
  headings: Heading[];
  author: AuthorInfo;
  contributors: Contributor[];
}

export default function BlogSidebar({
  headings,
  author,
  contributors,
}: BlogSidebarProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/lead-collector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: "blog-sidebar",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.duplicate) {
          setSubmitStatus({
            success: true,
            message: "You're already subscribed!",
          });
          setName("");
          setEmail("");
          return;
        }
        throw new Error(result?.error || "Failed to subscribe");
      }

      setSubmitStatus({
        success: true,
        message: "Thanks for subscribing!",
      });
      setName("");
      setEmail("");
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-8 space-y-6">
      {/* Table of Contents */}
      {headings.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">
            Contents
          </h3>
          <nav>
            <ul className="space-y-2">
              {headings.map((heading, index) => (
                <li
                  key={`${heading.id}-${index}`}
                  className={
                    heading.level === 1
                      ? "font-medium"
                      : heading.level === 2
                      ? "pl-3"
                      : "pl-6"
                  }
                >
                  <a
                    href={`#${heading.id}`}
                    className="block text-sm text-gray-600 hover:text-[#4668f7] transition-colors py-1"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Written By */}
      {author.name && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">
            Written by
          </h3>
          <div className="flex items-center gap-3">
            {author.pfp ? (
              <Image
                src={author.pfp}
                alt={author.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                style={{ objectPosition: author.pfpPosition || "50% 50%" }}
                unoptimized
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4668f7] to-[#5296E3] flex items-center justify-center text-white font-semibold text-lg">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{author.name}</p>
              {author.position && (
                <p className="text-sm text-gray-500">{author.position}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contributors */}
      {contributors.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">
            Contributors
          </h3>
          <div className="space-y-3">
            {contributors.map((contributor, index) => (
              <div key={index} className="flex items-center gap-3">
                {contributor.pfp ? (
                  <Image
                    src={contributor.pfp}
                    alt={contributor.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                    style={{
                      objectPosition: contributor.pfpPosition || "50% 50%",
                    }}
                    unoptimized
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
                    {contributor.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {contributor.name}
                  </p>
                  {contributor.position && (
                    <p className="text-xs text-gray-500">
                      {contributor.position}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-[#4668f7]/5 to-[#5296E3]/5 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
          Subscribe to our newsletter
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest insights, study tips, and updates delivered to your
          inbox.
        </p>

        {submitStatus && (
          <div
            className={`mb-4 p-3 rounded-xl text-sm ${
              submitStatus.success
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4668f7] focus:ring-2 focus:ring-[#4668f7]/20 disabled:opacity-50"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4668f7] focus:ring-2 focus:ring-[#4668f7]/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl bg-[#4668f7] text-white text-sm font-semibold shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px] hover:shadow-xl hover:shadow-[#4668f7]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
