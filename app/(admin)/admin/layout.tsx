// app/(admin)/admin/layout.tsx

import type { ReactNode } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNav from "../components/AdminNav";

export default function AdminSectionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <AdminHeader />
      <AdminNav />
      {children}
    </div>
  );
}
