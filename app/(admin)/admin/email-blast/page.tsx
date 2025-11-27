// app/(admin)/admin/email-blast/page.tsx

"use client";

import { useEffect, useState } from "react";

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

type Campaign = {
  id: number;
  subject: string;
  preview_text: string | null;
  sender_name: string;
  reply_to_email: string;
  message_body: string;
  recipients_count: number;
  opens_count: number;
  clicks_count: number;
  status: string;
  sent_at: string | null;
  created_at: string;
};

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
  const [activeView, setActiveView] = useState<"new" | "previous">("new");
  const [senderName, setSenderName] = useState("A1 Education Team");
  const [senderEmail, setSenderEmail] = useState("team@a1education.com");
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false);

  const fetchCampaigns = async () => {
    setIsLoadingCampaigns(true);
    try {
      const response = await fetch("/api/admin/email-campaigns");
      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    if (activeView === "previous") {
      fetchCampaigns();
    }
  }, [activeView]);

  const handleSendNow = async () => {
    if (!subject.trim() || !messageBody.trim()) {
      alert("Please fill in subject and message body");
      return;
    }

    if (!confirm("Send this email to all subscribers immediately?")) {
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/admin/email-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          preview_text: previewText,
          sender_name: senderName,
          reply_to_email: senderEmail,
          message_body: messageBody,
          send_immediately: true,
        }),
      });

      if (response.ok) {
        alert("Email blast sent successfully!");
        // Reset form
        setSubject("");
        setPreviewText("");
        setMessageBody("");
        // Switch to previous campaigns view
        setActiveView("previous");
        fetchCampaigns();
      } else {
        const data = await response.json();
        alert(`Failed to send: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending campaign:", error);
      alert("Failed to send email blast");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSendingTest(false);
    alert("Test email functionality coming soon!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

      {/* Tab Navigation */}
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveView("new")}
          className={`rounded-3xl border p-5 text-left transition ${activeView === "new"
              ? "border-[#4668f7] bg-[#4668f7]/10 text-[#18224b]"
              : "border-white/70 bg-white/70 text-gray-700 hover:border-[#4668f7]/40"
            }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            01
          </p>
          <h2 className="mt-2 text-xl font-semibold">New Campaign</h2>
          <p className="mt-1 text-sm text-gray-600">
            Create and send a new email blast to all subscribers.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setActiveView("previous")}
          className={`rounded-3xl border p-5 text-left transition ${activeView === "previous"
              ? "border-[#4668f7] bg-[#4668f7]/10 text-[#18224b]"
              : "border-white/70 bg-white/70 text-gray-700 hover:border-[#4668f7]/40"
            }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            02
          </p>
          <h2 className="mt-2 text-xl font-semibold">Previous Campaigns</h2>
          <p className="mt-1 text-sm text-gray-600">
            View all sent campaigns with engagement metrics.
          </p>
        </button>
      </div>

      {/* New Campaign View */}
      {activeView === "new" && (
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

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-2xl bg-[#4668f7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={handleSendNow}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Now"}
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
            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
              <h2 className="text-sm font-semibold text-gray-800">Checklist</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Proofread subject & preview text</li>
                <li>• Test send to internal inbox</li>
                <li>• Confirm audience selection</li>
              </ul>
            </div>
          </div>
        </div >
      )
      }

      {/* Previous Campaigns View */}
      {
        activeView === "previous" && (
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sent Campaigns</h2>
                <p className="text-sm text-gray-600">
                  View all previously sent email campaigns and their metrics.
                </p>
              </div>
              <button
                onClick={fetchCampaigns}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:-translate-y-[1px]"
              >
                {isLoadingCampaigns ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {isLoadingCampaigns ? (
              <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-8 text-center text-gray-600">
                Loading campaigns...
              </div>
            ) : campaigns.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-8 text-center text-gray-600">
                No campaigns sent yet. Create your first campaign from the &quot;New Campaign&quot; tab.
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="rounded-3xl border border-gray-100 bg-white shadow-sm"
                  >
                    <div className="border-b border-gray-100 px-5 py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {campaign.subject}
                          </h3>
                          {campaign.preview_text && (
                            <p className="text-sm text-gray-600">{campaign.preview_text}</p>
                          )}
                          <p className="mt-2 text-xs text-gray-500">
                            Sent {campaign.sent_at ? formatDate(campaign.sent_at) : "Not sent"}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${campaign.status === "sent"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 px-5 py-3">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {campaign.recipients_count}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            RECIPIENTS
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {campaign.opens_count}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            OPENS
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {campaign.clicks_count}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            CLICKS
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }
    </div >
  );
}
