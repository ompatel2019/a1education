import { TextAnimate } from "@/components/magicui/text-animate";
import { ImagesMarquee } from "@/components/ImagesMarquee";
import ClientButtons from "@/components/ClientButtons";
import { heroTopText, heroHeading, threeSteps } from "@/lib/config/hero";
import { BlurFade } from "./magicui/blur-fade";

const gradBg =
  "bg-[linear-gradient(to_bottom,_#4569F7_0%,_#5296E3_50%,_#7A8BD1_100%)]";

const Hero = () => {
  return (
    <BlurFade inView>
      <section className="md:py-2 text-white 2xl:px-12 lg:px-8 md:px-4 px-1">
        <div
          className={`${gradBg} 2xl:py-24 lg:py-18 md:py-16 py-6 text-center 2xl:rounded-lg lg:rounded-md md:rounded-sm rounded-xs`}
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
            <ImagesMarquee />
          </div>
        </div>
      </section>
    </BlurFade>
  );
};

export default Hero;
