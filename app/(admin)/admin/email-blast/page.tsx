// app/(admin)/admin/email-blast/page.tsx

"use client";

import { useState } from "react";

type EmailStat = {
  label: string;
  value: string;
};

type EmailCardProps = {
  headline?: string;
  subject: string;
  previewText: string;
  message: string;
  recipientsLabel?: string;
  stats?: EmailStat[];
};

const ZERO_STATS: EmailStat[] = [
  { label: "RECIPIENTS", value: "0" },
  { label: "OPENS", value: "0" },
  { label: "CLICKS", value: "0" },
];

const RECENT_BLASTS = [
  {
    id: "program-updates",
    subject: "Program updates",
    previewText: "Term timelines and new campus additions.",
    message:
      "Our next real blast will populate stats here. Until then we keep everything at zero for clarity.",
  },
  {
    id: "scholarship-reminders",
    subject: "Scholarship reminders",
    previewText: "Support families ahead of the deadline.",
    message:
      "This card mirrors the live preview container so that every email render feels consistent.",
  },
  {
    id: "winter-workshops",
    subject: "Winter workshops",
    previewText: "Short courses to keep students on track.",
    message:
      "Once automations go live this panel will list the most recent sends automatically.",
  },
];

function EmailCard({
  headline,
  subject,
  previewText,
  message,
  recipientsLabel = "All recipients",
  stats,
}: EmailCardProps) {
  const subjectCopy = subject.trim() || "Untitled blast";
  const previewCopy =
    previewText.trim() || "Add preview text to summarise the email.";
  const bodyCopy =
    message.trim() || "Compose the body above to see it appear here.";

  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-inner">
      <div className="border-b border-gray-100 px-5 py-4">
        {headline && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {headline}
          </p>
        )}
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {subjectCopy}
        </h3>
        <p className="text-sm text-gray-600">{previewCopy}</p>
        <span className="mt-3 inline-flex items-center rounded-full bg-[#4668f7]/10 px-3 py-1 text-xs font-semibold text-[#4668f7]">
          {recipientsLabel}
        </span>
      </div>
      <div className="px-5 py-4 text-sm text-gray-700 whitespace-pre-line min-h-[120px]">
        {bodyCopy}
      </div>
      {stats && stats.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EmailBlastPage() {
  const [senderName, setSenderName] = useState("A1 Education Team");
  const [senderEmail, setSenderEmail] = useState("team@a1education.com");
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [scheduleAt, setScheduleAt] = useState("");
  const [isQueuing, setIsQueuing] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleQueueBlast = async () => {
    setIsQueuing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsQueuing(false);
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSendingTest(false);
  };

  const previewRecipientsLabel = "All recipients · master list";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Blast</h1>
        <p className="text-gray-600">
          Queue high-signal announcements for the full list and keep comms consistent every time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form
          className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800" htmlFor="sender-name">
                Sender name
              </label>
              <input
                id="sender-name"
                type="text"
                placeholder="A1 Education Team"
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
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
                value={senderEmail}
                onChange={(event) => setSenderEmail(event.target.value)}
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
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
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
              value={previewText}
              onChange={(event) => setPreviewText(event.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
            />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Audience
            </p>
            <h3 className="mt-1 text-sm font-semibold text-gray-900">All contacts</h3>
            <p className="text-sm text-gray-600">
              Every blast is sent to the full list for now. Segments will arrive with the next release.
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-semibold text-gray-800">
              Message body
              <span className="text-xs font-normal text-gray-500">Supports markdown & HTML embeds</span>
            </label>
            <textarea
              rows={10}
              placeholder="Compose your announcement..."
              value={messageBody}
              onChange={(event) => setMessageBody(event.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-slate-950/5 px-4 py-3 font-mono text-sm text-slate-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-800">Preview</p>
            <EmailCard
              headline="Live preview"
              subject={subject}
              previewText={previewText}
              message={messageBody}
              recipientsLabel={previewRecipientsLabel}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800" htmlFor="send-time">
              Schedule
            </label>
            <input
              id="send-time"
              type="datetime-local"
              value={scheduleAt}
              onChange={(event) => setScheduleAt(event.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 text-sm text-gray-900 focus:border-[#4668f7] focus:outline-none focus:ring-2 focus:ring-[#4668f7]/30"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              onClick={handleQueueBlast}
              disabled={isQueuing}
            >
              {isQueuing ? "Queuing..." : "Queue blast"}
            </button>
            <button
              className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              onClick={handleSendTest}
              disabled={isSendingTest}
            >
              {isSendingTest ? "Sending test..." : "Send test email"}
            </button>
          </div>
        </form>

        <div className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">Recent blasts</h2>
              <span className="text-xs text-gray-500">Live metrics soon</span>
            </div>
            <div className="space-y-3">
              {RECENT_BLASTS.map((blast) => (
                <EmailCard
                  key={blast.id}
                  headline="Recent blast"
                  subject={blast.subject}
                  previewText={blast.previewText}
                  message={blast.message}
                  recipientsLabel="All recipients · 0 sent"
                  stats={ZERO_STATS}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
            <h2 className="text-sm font-semibold text-gray-800">Checklist</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Proofread subject & preview text</li>
              <li>• Test send to internal inbox</li>
              <li>• Confirm scheduling time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
