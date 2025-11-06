// app/admin/page.tsx

import type { Metadata } from "next";
import EmailSubmissionsTable from "../components/EmailSubmissionsTable";

export const metadata: Metadata = {
  title: "Admin - Email Submissions | A1 Education",
  description: "Admin panel for viewing email marketing submissions.",
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
