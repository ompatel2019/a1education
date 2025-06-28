import "../globals.css";
import { Providers } from "../providers";
import { generalSans } from "../fonts/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | A1 Education",
  description: "Content management for A1 Education",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 