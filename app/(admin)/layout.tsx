// app/(admin)/layout.tsx

import "../globals.css";
import { Providers } from "../providers";
import { generalSans } from "../fonts/fonts";
import type { Metadata } from "next";
import AdminHeader from "./components/AdminHeader";

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
    <html lang="en">
      <body className={`${generalSans.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <AdminHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
