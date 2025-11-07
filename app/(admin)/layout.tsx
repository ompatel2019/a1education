// app/(admin)/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | A1 Education",
  description: "Admin panel for A1 Education.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#e8ecff] via-white to-[#f5f7ff]">
      <div className="pointer-events-none absolute -left-24 top-0 hidden h-96 w-96 rounded-full bg-[#4668f7]/20 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -right-32 bottom-[-120px] hidden h-[420px] w-[420px] rounded-full bg-sky-200/30 blur-3xl lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#4668f7]/10 via-transparent to-transparent" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        {children}
      </main>
    </div>
  );
}
