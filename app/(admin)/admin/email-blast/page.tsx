// app/(admin)/admin/email-blast/page.tsx

"use client";

import { useState } from "react";

type AudiencePreset = "all" | "students" | "parents";

export default function EmailBlastPage() {
  const [audience, setAudience] = useState<AudiencePreset>("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Blast</h1>
        <p className="text-gray-600">
          Queue high-signal announcements for different lists and keep everyone in the loop.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800" htmlFor="sender-name">
                Sender name
              </label>
              <input
                id="sender-name"
                type="text"
                placeholder="A1 Education Team"
                className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800" htmlFor="sender-email">
                Reply-to email
              </label>
              <input
                id="sender-email"
                type="email"
                placeholder="team@a1education.com"
                className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800" htmlFor="email-subject">
              Subject
            </label>
            <input
              id="email-subject"
              type="text"
              placeholder="Upcoming parent-teacher sessions"
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800" htmlFor="preview-text">
              Preview text
            </label>
            <input
              id="preview-text"
              type="text"
              placeholder="A quick reminder for families across all programs."
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-semibold text-gray-800">
              Message body
              <span className="text-xs font-normal text-gray-500">Supports markdown & HTML embeds</span>
            </label>
            <textarea
              rows={10}
              placeholder="Compose your announcement..."
              className="w-full rounded-2xl border border-gray-200 bg-slate-950/5 px-4 py-3 font-mono text-sm text-slate-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Audience</label>
              <div className="grid grid-cols-3 gap-2">
                {(["all", "students", "parents"] as AudiencePreset[]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAudience(preset)}
                    className={`rounded-2xl border px-3 py-2 text-sm font-semibold capitalize transition ${
                      audience === preset
                        ? "border-[#4668f7] bg-[#4668f7]/10 text-[#4668f7]"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800" htmlFor="send-time">
                Schedule
              </label>
              <input
                id="send-time"
                type="datetime-local"
                className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px]"
              type="button"
            >
              Queue blast
            </button>
            <button
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
              type="button"
            >
              Send test email
            </button>
          </div>
        </form>

        <div className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
            <h2 className="text-sm font-semibold text-gray-800">Recent blasts</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Program updates · 2.1k recipients</li>
              <li>• Scholarship reminders · 800 recipients</li>
              <li>• Winter workshops · 1.4k recipients</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
            <h2 className="text-sm font-semibold text-gray-800">Checklist</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Proofread subject & preview text</li>
              <li>• Test send to internal inbox</li>
              <li>• Confirm list segments & scheduling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
