// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import { footerSections, footerAttribution } from "@/lib/config/footerConfig";
import { sectionClass } from "@/lib/config/sharedclassesConfig";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`${sectionClass} text-white !pt-8 !pb-4`}>
      <div className="bg-primary border-gray-300 rounded-2xl mx-auto px-6 sm:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          {/* Left Column: Logo */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <Link href="/" aria-label="A1 Education Home">
              <Image
                src="/logo.png"
                alt="A1 Education main logo"
                width={180}
                height={60}
                className="w-[140px] md:w-[180px] h-auto mb-6"
                priority
              />
            </Link>
          </div>

          {/* Right Column: Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 text-left">
            {Object.values(footerSections).map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="text-xl font-medium text-white">
                  {section.title}
                </h4>
                <div className="flex flex-col gap-3">
                  {section.links.map((link, idx) =>
                    link.external ? (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors text-sm sm:text-base"
                        aria-label={link.label}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={idx}
                        href={link.href}
                        className="text-white/80 hover:text-white transition-colors text-sm sm:text-base"
                        aria-label={link.label}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            <span>
              © {new Date().getFullYear()} A1 Education.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={footerAttribution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {footerAttribution.text}
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              Back to top
              <div className="border border-white/30 rounded p-1 group-hover:border-white transition-colors">
                <ArrowUp size={14} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
