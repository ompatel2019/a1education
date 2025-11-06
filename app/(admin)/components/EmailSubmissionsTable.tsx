"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface EmailSubmission {
  id: number;
  name: string | null;
  email: string;
  source: string | null;
  created_at: string;
}

export default function EmailSubmissionsTable() {
  const [submissions, setSubmissions] = useState<EmailSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const supabase = createClient();
        if (!supabase) {
          setError("Database connection failed");
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("email_marketing_submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setError("Failed to load submissions");
          console.error("Error fetching submissions:", error);
        } else {
          setSubmissions(data || []);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/70 bg-white/80 p-8 text-center text-slate-500 shadow-lg backdrop-blur">
        Loading submissions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50/90 p-8 text-center text-red-600 shadow-lg backdrop-blur">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-xl shadow-[#4668f7]/10 backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-slate-200/70 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Email submissions
          </h3>
          <p className="text-sm text-slate-500">
            A chronological list of every lead captured through the site forms.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-[#4668f7]">
          <span className="rounded-full bg-[#4668f7]/10 px-3 py-1">
            Total {submissions.length}
          </span>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="px-6 py-12 text-center text-slate-500">
          No email submissions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  Name
                </th>
                <th className="px-6 py-3">
                  Email
                </th>
                <th className="px-6 py-3">
                  Source
                </th>
                <th className="px-6 py-3">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/80">
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="transition hover:bg-[#4668f7]/5"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                    {submission.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                    {submission.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {submission.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                    {submission.source ? (
                      <span className="inline-flex items-center rounded-full border border-[#4668f7]/30 bg-[#4668f7]/10 px-2.5 py-1 text-xs font-medium text-[#4668f7]">
                        {submission.source}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {formatDate(submission.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
