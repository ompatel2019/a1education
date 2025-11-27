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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", source: "" });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMassDeleteConfirm, setShowMassDeleteConfirm] = useState(false);

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

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatSource = (source: string) => {
    if (!source) return "";

    // Specific mappings
    if (source === "lead_collector") return "Lead Collector";
    if (source === "Inquiry") return "Inquiry Form";

    // Handle "Blog Resources: slug"
    if (source.startsWith("Blog Resources:")) {
      return "Blog Resource";
    }

    // Generic fallback: replace underscores/hyphens with spaces and Title Case
    return source
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === submissions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(submissions.map(s => s.id)));
    }
  };

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleMassDelete = async () => {
    if (selectedIds.size === 0) return;

    setIsDeleting(true);
    try {
      await Promise.all(
        Array.from(selectedIds).map(id =>
          fetch(`/api/email-submissions?id=${id}`, { method: "DELETE" })
        )
      );
      await fetchSubmissions();
      setSelectedIds(new Set());
      setShowMassDeleteConfirm(false);
    } catch (error) {
      console.error("Mass delete error:", error);
      alert("Failed to delete some entries");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (submission: EmailSubmission) => {
    setEditingId(submission.id);
    setEditForm({
      name: submission.name || "",
      email: submission.email,
      source: submission.source || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "", source: "" });
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await fetch("/api/email-submissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editForm }),
      });

      if (response.ok) {
        await fetchSubmissions();
        setEditingId(null);
      } else {
        alert("Failed to update entry");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update entry");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/email-submissions?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSubmissions();
        setDeleteConfirmId(null);
      } else {
        alert("Failed to delete entry");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete entry");
    }
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
    <>
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-xl shadow-[#4668f7]/10 backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-slate-200/70 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Email Notifications
            </h3>
            <p className="text-sm text-slate-500">
              A chronological list of every email notification sent.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.size > 0 && (
              <button
                onClick={() => setShowMassDeleteConfirm(true)}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                Delete {selectedIds.size} selected
              </button>
            )}
            <span className="rounded-full bg-[#4668f7]/10 px-3 py-1 text-sm font-medium text-[#4668f7]">
              Total {submissions.length}
            </span>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            No email notifications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === submissions.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-slate-300 text-[#4668f7] focus:ring-[#4668f7]"
                    />
                  </th>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Submitted At</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/80">
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="transition hover:bg-[#4668f7]/5"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(submission.id)}
                        onChange={() => toggleSelect(submission.id)}
                        className="h-4 w-4 rounded border-slate-300 text-[#4668f7] focus:ring-[#4668f7]"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {submission.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                      {editingId === submission.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                        />
                      ) : (
                        submission.name || "—"
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {editingId === submission.id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                        />
                      ) : (
                        submission.email
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                      {editingId === submission.id ? (
                        <input
                          type="text"
                          value={editForm.source}
                          onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                        />
                      ) : submission.source ? (
                        <span className="inline-flex items-center rounded-full border border-[#4668f7]/30 bg-[#4668f7]/10 px-2.5 py-1 text-xs font-medium text-[#4668f7]">
                          {formatSource(submission.source)}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {formatDate(submission.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-right">
                      {editingId === submission.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSaveEdit(submission.id)}
                            className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="rounded bg-slate-400 px-3 py-1 text-xs font-medium text-white hover:bg-slate-500"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(submission)}
                            className="rounded bg-[#4668f7] px-3 py-1 text-xs font-medium text-white hover:bg-[#3557e6]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(submission.id)}
                            className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Confirm Deletion</h3>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this entry? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mass Delete Confirmation Modal */}
      {showMassDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Confirm Mass Deletion</h3>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete <strong>{selectedIds.size}</strong> {selectedIds.size === 1 ? 'entry' : 'entries'}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowMassDeleteConfirm(false)}
                disabled={isDeleting}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleMassDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
