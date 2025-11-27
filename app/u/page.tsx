"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const [status, setStatus] = useState<"processing" | "unsubscribed" | "resubscribed" | "error">("processing");
    const [message, setMessage] = useState("Processing your request...");

    useEffect(() => {
        if (!email) {
            setStatus("error");
            setMessage("Invalid link. No email address found.");
            return;
        }

        const unsubscribe = async () => {
            try {
                const response = await fetch("/api/unsubscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, name, action: "unsubscribe" }),
                });

                if (response.ok) {
                    setStatus("unsubscribed");
                    setMessage("You have been successfully unsubscribed.");
                } else {
                    setStatus("error");
                    setMessage("Failed to unsubscribe. Please try again.");
                }
            } catch {
                setStatus("error");
                setMessage("An unexpected error occurred.");
            }
        };

        unsubscribe();
    }, [email, name]);

    const handleResubscribe = async () => {
        if (!email) return;
        setStatus("processing");
        setMessage("Re-subscribing...");

        try {
            const response = await fetch("/api/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, action: "resubscribe" }),
            });

            if (response.ok) {
                setStatus("resubscribed");
                setMessage("Welcome back! You have been re-subscribed.");
            } else {
                setStatus("error");
                setMessage("Failed to re-subscribe. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white p-8 shadow-xl text-center">
                {status === "processing" && (
                    <div className="animate-pulse">
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">Processing...</h1>
                        <p className="text-gray-500">{message}</p>
                    </div>
                )}

                {status === "unsubscribed" && (
                    <div>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">Unsubscribed</h1>
                        <p className="text-gray-500 mb-6">{message}</p>

                        <button
                            onClick={handleResubscribe}
                            className="inline-flex items-center justify-center rounded-xl bg-[#4668f7] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4668f7]/25 transition hover:-translate-y-[1px]"
                        >
                            Unsubbed by accident?
                        </button>
                    </div>
                )}

                {status === "resubscribed" && (
                    <div>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">Welcome Back!</h1>
                        <p className="text-gray-500">{message}</p>
                    </div>
                )}

                {status === "error" && (
                    <div>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">Error</h1>
                        <p className="text-gray-500">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><p>Loading...</p></div>}>
            <UnsubscribeContent />
        </Suspense>
    );
}
