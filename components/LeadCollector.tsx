// components/LeadCollector.tsx

"use client";

import React, { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { sectionClass } from "@/lib/config/sharedclassesConfig";
import { createClient } from "@/lib/supabase/client";

const LeadCollector = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("email_marketing_submissions")
        .insert([
          {
            name: name.trim(),
            email: email.trim(),
            source: "lead_collector",
          },
        ]);

      if (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus({
          success: false,
          message: "Failed to subscribe. Please try again.",
        });
      } else {
        setSubmitStatus({
          success: true,
          message: "Thank you for subscribing! We'll be in touch soon.",
        });
        // Clear form on success
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSubmitStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${sectionClass}`}>
      <BlurFade delay={0.1} inView>
        <div
          className="bg-primary rounded-2xl shadow-xl
            flex flex-col items-center space-y-8 sm:space-y-10
            2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[32px]
            text-center responsivePad"
        >
          <h3 className="h3 font-semibold text-white drop-shadow-lg">
            Stay ahead with exclusive HSC Economics insights
          </h3>
          <h4 className="h6 text-white/90 max-w-3xl mx-auto">
            Join our newsletter and receive weekly study tips, exam strategies,
            and expert advice from Sydney&apos;s top Economics tutors delivered
            straight to your inbox.
          </h4>
          {submitStatus && (
            <div
              className={`p-4 rounded-lg max-w-2xl mx-auto ${
                submitStatus.success
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl items-center justify-center"
          >
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="flex-1 w-full sm:w-auto px-7 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="flex-1 w-full sm:w-auto px-7 pr-20 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-white text-primary hover:bg-blue-50 font-semibold text-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </BlurFade>
    </section>
  );
};

export default LeadCollector;
