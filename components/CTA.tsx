// components/CTA.tsx

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ctaHeading, ctaSubheading, ctaButton } from "@/lib/config/ctaConfig";
import Link from "next/link";
import { sectionClass } from "@/lib/config/sharedclassesConfig";

const CTA = ({ contactPage }: { contactPage?: boolean }) => {
  const ButtonIcon = ctaButton.icon;
  return (
    <section className={`${sectionClass} !py-0`}>
      <BlurFade delay={0.1} inView>
        <div
          className="bg-primary/95 rounded-2xl shadow-xl
            flex flex-col items-center space-y-8 sm:space-y-10
            2xl:py-[96px] lg:py-[72px] md:py-[48px] py-[32px]
            text-center responsivePad"
        >
          <h3 className="h3 font-semibold text-white drop-shadow-lg">
            {ctaHeading}
          </h3>
          <h4 className="h6 text-white/90 max-w-3xl mx-auto">
            {ctaSubheading}
          </h4>
          <Link
            href={contactPage ? "#contact" : "/contact"}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-primary hover:bg-blue-600 hover:text-white transition-all font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            {ctaButton.label}
            <span className="transition-transform duration-150 group-hover:translate-x-1">
              <ButtonIcon size={20} />
            </span>
          </Link>
        </div>
      </BlurFade>
    </section>
  );
};

export default CTA;
