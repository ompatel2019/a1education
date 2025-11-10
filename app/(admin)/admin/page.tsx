// app/admin/page.tsx

import type { Metadata } from "next";
import EmailSubmissionsTable from "../components/EmailSubmissionsTable";

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Admin - Email Notifications | A1 Education",
  description: "Admin panel for viewing email notifications.",
};

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Marketing Submissions</h1>
        <p className="text-gray-600">View all email marketing submissions from the website.</p>
      </div>

      <EmailSubmissionsTable />
    </div>
  );
}
