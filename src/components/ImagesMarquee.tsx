import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/images-marquee";
import React from "react";

// Import your assets
import hero3 from '../assets/hero3.webp'
import hero6 from '../assets/hero6.webp'
import hero7 from '../assets/hero7.webp'
import hero8 from '../assets/hero8.webp'
import hero9 from '../assets/hero9.webp'

const heroImages = [
    { name: hero3, alt: 'High school students engaged in study #3' },
    { name: hero6, alt: 'High school students engaged in study #6' },
    { name: hero7, alt: 'High school students engaged in study #7' },
    { name: hero8, alt: 'High school students engaged in study #8' },
    { name: hero9, alt: 'High school students engaged in study #9' },
  ];  

const firstRow = heroImages;

interface ImageCardProps {
  name: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ name, alt }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden text-black",
        "border-gray-950/[.1]"
      )}
    >
      <div className="flex flex-row items-center gap-2 justify-center">
        <div className="flex flex-col justify-center items-center">
          <img src={name} alt={alt} className="mb-2 w-auto hero-slide-img rounded-md" />
        </div>
      </div>
    </figure>
  );
};

export default function ImagesMarqee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((image) => (
          <ImageCard key={image.alt} {...image} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
    </div>
  );
}
