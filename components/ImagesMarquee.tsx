// components/ImagesMarquee.tsx
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image, { StaticImageData } from "next/image";
import { heroImages } from "@/lib/config/heroConfig";

interface ImageCardProps {
  src: StaticImageData; // <-- Not string!
  alt: string;
}

const ImageCard = ({ src, alt }: ImageCardProps) => {
  return (
    <figure
      className={cn(
        "relative h-full w-full cursor-pointer overflow-hidden text-black",
        "border-gray-950/[.1]"
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="mb-2 h-auto hero-slide-img rounded-md"
        width={800}
        height={640}
        loading="eager"
        priority
      />
    </figure>
  );
};

export function ImagesMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:25s]">
        {heroImages.map((image) => (
          <ImageCard key={image.alt} {...image} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
    </div>
  );
}
