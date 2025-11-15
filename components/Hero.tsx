// components/Hero.tsx

import { TextAnimate } from "@/components/magicui/text-animate";
import { Marquee } from "@/components/magicui/marquee";
import ClientButtons from "@/components/ClientButtons";
import Image from "next/image";
import { BlurFade } from "./magicui/blur-fade";
import {
  heroTopText,
  heroHeading,
  threeSteps,
  heroImages,
} from "@/lib/config/heroConfig";

const gradBg =
  "bg-[linear-gradient(to_bottom,_#4569F7_0%,_#5296E3_50%,_#7A8BD1_100%)]";

const Hero = () => {
  return (
    <BlurFade inView>
      <section className="md:py-2 text-white 2xl:px-16 lg:px-12 md:px-8 px-4">
        <div
          className={`${gradBg} 2xl:py-24 lg:py-18 md:py-16 py-6 text-center 2xl:rounded-xl lg:rounded-lg md:rounded-md rounded-sm`}
        >
          <div className="responsivePad 2xl:space-y-16 lg:space-y-12 md:space-y-8 space-y-4">
            <h4 className="h4 font-semibold">{heroTopText}</h4>
            <h1>
              <TextAnimate by="word" animation="blurInDown" className="h1">
                {heroHeading}
              </TextAnimate>
            </h1>
            <div className="gap-5 flex justify-center">
              {threeSteps.map((step, index) => (
                <div key={index} className="gap-2 flex items-center">
                  <div>{step.numberIcon}</div>
                  <h5 className="h5 font-semibold">{step.step}</h5>
                </div>
              ))}
            </div>
            <ClientButtons />
          </div>
          <div className="2xl:pt-16 lg:pt-12 md:pt-8 pt-4">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:70s]">
                {heroImages.map((image) => (
                  <figure
                    key={image.alt}
                    className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[380px] xl:h-[400px] cursor-pointer overflow-hidden text-black border-gray-950/[.1] flex-shrink-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="mb-2 hero-slide-img rounded-md w-full h-full"
                      width={800}
                      height={640}
                      loading="eager"
                      priority
                    />
                  </figure>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
            </div>
          </div>
        </div>
      </section>
    </BlurFade>
  );
};

export default Hero;
