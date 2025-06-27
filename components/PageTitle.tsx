// components/PageTitle.tsx

import React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

const gradBg =
  "bg-[linear-gradient(to_bottom,_#4569F7_0%,_#5296E3_50%,_#7A8BD1_100%)]";

const PageTitle = ({
  heading,
  subheading,
  route,
}: {
  heading: string;
  subheading?: string;
  route?: string;
}) => {
  return (
    <section className="2xl:px-16 lg:px-12 md:px-8 px-4">
      <BlurFade delay={0.2} inView>
        <div
          className={`
            ${gradBg}
            relative overflow-hidden shadow-xl
            2xl:rounded-[32px] lg:rounded-[24px] md:rounded-[16px] rounded-[10px]
            flex flex-col items-center
            text-center
            2xl:py-[144px] lg:py-[96px] md:py-[72px] py-[48px]
            `}
        >
          {/* Shine/Glass overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-inherit bg-white/10 backdrop-blur-[2.5px]" />

          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-6 md:space-y-8 font-generalSans">
            {route && (
              <h5 className="h5 font-semibold uppercase tracking-widest text-white/80">
                {route}
              </h5>
            )}
            <h1 className="h1 font-bold text-white drop-shadow-lg md:px-10 px-4">
              {heading}
            </h1>
            {subheading && (
              <p className="h6 text-white/90 max-w-2xl mx-auto drop-shadow font-semibold">
                {subheading}
              </p>
            )}
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default PageTitle;
