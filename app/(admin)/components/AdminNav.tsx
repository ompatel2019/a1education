"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "Email submissions",
    description: "Monitor inbound leads from the marketing site.",
  },
  {
    href: "/admin/blog",
    label: "Blog posts",
    description: "Draft long-form updates and manage hero imagery.",
  },
  {
    href: "/admin/email-blast",
    label: "Email blast",
    description: "Send announcements to curated recipient lists.",
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="rounded-3xl border border-white/70 bg-white/80 p-3 shadow-sm backdrop-blur">
      <ul className="flex flex-col gap-3 md:flex-row md:gap-4">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`block rounded-2xl border px-4 py-3 transition ${
                  active
                    ? "border-[#4668f7] bg-[#4668f7]/10 text-[#4668f7]"
                    : "border-white/80 bg-white/70 text-gray-700 hover:border-[#4668f7]/40 hover:text-[#4668f7]"
                }`}
              >
                <div className="text-sm font-semibold capitalize">{item.label}</div>
                <p className="text-xs text-gray-500">{item.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
