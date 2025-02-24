import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/images-marquee";
import React from "react";

// Import your assets
import hero1 from '../assets/hero3.webp'
import hero2 from '../assets/hero6.webp'
import hero3 from '../assets/hero7.webp'
import hero4 from '../assets/hero8.webp'
import hero5 from '../assets/hero9.webp'

const heroImages = [
    { name: hero1, alt: 'Image of Students at A1 Education #1'},
    { name: hero2, alt: 'Image of Students at A1 Education #2'},
    { name: hero3, alt: 'Image of Students at A1 Education #3'},
    { name: hero4, alt: 'Image of Students at A1 Education #4'},
    { name: hero5, alt: 'Image of Students at A1 Education #5'},
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
          <img src={name} alt={alt} className="mb-2 w-auto hero-slide-img rounded-md" 
              width="200" 
              height="100" 
          />
        </div>
      </div>
    </figure>
  );
};

export default function ImagesMarqee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:15s]">
        {firstRow.map((image) => (
          <ImageCard key={image.alt} {...image} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
    </div>
  );
}
