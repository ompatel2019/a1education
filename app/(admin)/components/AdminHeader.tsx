"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientUser, signOutClient } from "@/lib/supabase/auth-client";

export default function AdminHeader() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getClientUser();
        setUser(user);
      } catch (error) {
        console.error("Unexpected error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOutClient();
    router.push("/admin/login");
  };

  const userEmail = typeof user?.email === "string" ? user.email : "";
  const displayName = userEmail ? userEmail.split("@")[0] : "Admin";
  const initials =
    displayName && displayName.length > 1
      ? displayName
          .split(/[\s._-]+/)
          .map((segment: string) => segment[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "A";

  if (isLoading) {
    return (
      <header className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-7 w-40 animate-pulse rounded-full bg-slate-200" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-r from-[#4668f7] via-[#5574fb] to-[#6f8bff] text-white shadow-xl">
      <div className="absolute -left-10 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-white/20 blur-2xl md:block" />
      <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Admin Dashboard
          </span>
          <h1 className="text-3xl font-semibold leading-tight">Admin Panel</h1>
          <p className="max-w-md text-sm text-white/80">
            Review submissions, monitor engagement, and manage your team&apos;s
            access from a single hub.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-white sm:items-end">
          {user && (
            <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 shadow-sm backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-lg font-semibold text-white">
                {initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium capitalize">
                  {displayName.replace(/[-_.]/g, " ")}
                </p>
                <p className="text-xs text-white/70">{userEmail}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4668f7] transition hover:-translate-y-[1px] hover:shadow-lg hover:shadow-white/40 focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
