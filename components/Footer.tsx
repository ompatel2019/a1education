// components/Footer.tsx

import React from "react";
import Image from "next/image";
import {
  footerLinks,
  footerSocials,
  footerAttribution,
} from "@/lib/config/footerConfig";
import { sectionClass } from "@/lib/config/sharedclassesConfig";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={`${sectionClass} text-white !pt-8 !pb-4`}>
      <div className=" bg-primary border-gray-300 rounded-2xl mx-auto px-4 sm:px-8 py-10 md:py-12 space-y-10">
        {/* Top Row */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" aria-label="A1 Education Home">
              <Image
                src="/logo.png"
                alt="A1 Education main logo"
                width={146}
                height={48}
                className="w-[110px] md:w-[146px] h-auto"
                priority
              />
            </Link>
          </div>
          {/* Main Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white text-[0.98rem] font-medium">
            {footerLinks.map((link, idx) =>
              link.external ? (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-200 transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                  {link.label === "Leave a Review" && (
                    <span className="inline-block align-middle ml-1">↗</span>
                  )}
                </a>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  className="hover:underline hover:text-blue-200 transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
          {/* Socials */}
          <div className="flex justify-center md:justify-end gap-2 items-center">
            {footerSocials.map((soc, idx) => {
              const Icon = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="hover:text-blue-200 text-white transition-colors"
                >
                  <Icon size={soc.size} />
                </a>
              );
            })}
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white/40 my-2"></div>
        {/* Bottom Row */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3 text-xs sm:text-sm">
          <span className="text-center md:text-left">
            © {new Date().getFullYear()} A1 Education. All rights reserved.
          </span>
          <a
            href={footerAttribution.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center md:text-right hover:underline"
            aria-label={footerAttribution.text}
          >
            {footerAttribution.text}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
