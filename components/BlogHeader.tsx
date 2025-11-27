// components/BlogHeader.tsx

import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";

const gradBg =
  "bg-[linear-gradient(to_bottom,_#4569F7_0%,_#5296E3_50%,_#7A8BD1_100%)]";

type TagStyle = {
  label: string;
  bgColor?: string;
  textColor?: string;
};

interface BlogHeaderProps {
  title: string;
  subheading: string;
  tags: string[];
  tagStyles?: TagStyle[];
  headingColor?: string;
  subheadingColor?: string;
  blogHero?: string | null;
}

export default function BlogHeader({
  title,
  subheading,
  tags,
  tagStyles = [],
  headingColor = "#ffffff",
  subheadingColor = "#e2e8f0",
  blogHero,
}: BlogHeaderProps) {
  const resolveTagStyle = (label: string) => {
    const match = tagStyles.find(
      (style) => style.label.toLowerCase() === label.toLowerCase()
    );
    return {
      backgroundColor: match?.bgColor || "rgba(255,255,255,0.12)",
      color: match?.textColor || "#ffffff",
      borderColor: match?.bgColor ? "transparent" : "rgba(255,255,255,0.6)",
    };
  };

  return (
    <section className="2xl:px-8 lg:px-6 md:px-4 px-4">
      <BlurFade delay={0.2} inView>
        <div
          className={`
            ${gradBg}
            relative overflow-hidden shadow-xl
            2xl:rounded-[32px] lg:rounded-[24px] md:rounded-[16px] rounded-[10px]
            2xl:h-[600px] lg:h-[550px] md:h-[500px] h-[450px]
            flex flex-col justify-end
          `}
        >
          {/* Background Image */}
          {blogHero && (
            <Image
              src={blogHero}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}

          {/* Content */}
          <div className="relative z-10 w-full px-8 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16 font-generalSans">
            <div className="flex flex-col space-y-4 md:space-y-6">
              {/* Title */}
              <h1
                className="h1 font-bold drop-shadow-lg"
                style={{ color: headingColor }}
              >
                {title}
              </h1>

              {/* Subheading */}
              <p
                className="h6 max-w-3xl drop-shadow"
                style={{ color: subheadingColor }}
              >
                {subheading}
              </p>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-lg text-sm md:text-base font-medium border"
                      style={resolveTagStyle(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
