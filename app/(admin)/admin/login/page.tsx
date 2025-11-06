// app/(admin)/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInClient } from "@/lib/supabase/auth-client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await signInClient(email, password);

      if (error) {
        console.error("Login error:", error);
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      } else {
        // Add a small delay to ensure session is established
        setTimeout(() => {
          router.push("/admin");
        }, 100);
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#e8ecff_0%,_#f0f4ff_50%,_#f5f7ff_100%)] px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4668f7]/20 blur-[200px]" />
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/15 blur-[180px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[450px] w-[450px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#4668f7]/10 blur-[160px]" />
      </div>

      <div className="relative grid w-full max-w-4xl gap-4 rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_40px_120px_-45px_rgba(70,104,247,0.55)] backdrop-blur-xl md:grid-cols-2 md:gap-6 md:p-6">
        <div className="hidden flex-col justify-center space-y-3 text-slate-700 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4668f7]/20 bg-[#4668f7]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4668f7]">
            A1 Education Admin
          </span>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Welcome Karan, let&apos;s get you signed in.
          </h1>
          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            Access your dashboard to manage submissions and stay on top of the
            latest updates securely.
          </p>
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm lg:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4668f7]/10 text-[#4668f7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 3h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-slate-900 md:text-sm">
                Secure access
              </h2>
              <p className="text-xs text-slate-500 md:text-sm">
                Encrypted sign-in ensures only authorised team members get in.
              </p>
            </div>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-inner shadow-[#4668f7]/10 backdrop-blur-md md:gap-5 md:p-7"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Sign in to Admin
            </h2>
            <p className="text-xs text-slate-500 md:text-sm">
              Use your A1 Education admin credentials.
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-700 md:text-sm"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-[#4668f7] focus:outline-none focus:ring-4 focus:ring-[#4668f7]/15"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium text-slate-700 md:text-sm"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-[#4668f7] focus:outline-none focus:ring-4 focus:ring-[#4668f7]/15"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50/80 px-3 py-2 text-xs font-medium text-red-600 md:text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4668f7] via-[#5c7dfa] to-[#6f8bff] px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#4668f7]/30 transition hover:translate-y-[-1px] hover:shadow-xl hover:shadow-[#4668f7]/40 focus:outline-none focus:ring-4 focus:ring-[#4668f7]/30 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm md:py-3"
          >
            {isLoading ? "Signing you in..." : "Access dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
