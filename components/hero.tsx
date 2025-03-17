"use client";
import Image from "next/image";
import TextTransition from "@/components/TextTransition";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export const Hero = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);
  const TEXTS = [
    "LinkedIn",
    "Instagram",
    "Facebook",
    "TikTok",
    t("hero.social_media"),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1700 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <section className="w-full mt-4 mb-12 md:my-16 px-1 md:px-6" id="waitlist">
      <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl !leading-normal lg:!leading-tight font-extrabold !tracking-tighter text-balance text-[#08272E]">
          {t.rich("hero.title", {
            swap: () => (
              <TextTransition
                className="text-primary"
                allTexts={TEXTS}
                activeIndex={index % TEXTS.length}
                verticalAlign="baseline"
                direction="down"
              />
            ),
            youtube: () => (
              <Image
                src="/static/youtube.svg"
                alt="YouTube"
                className="w-32 md:w-48 lg:w-60 inline-block mx-0.5 md:mx-1.5 mb-1"
                width={800}
                height={178}
              />
            ),
            linkedin: () => (
              <Image
                src="/static/linkedin.svg"
                alt="LinkedIn"
                className="w-32 md:w-48 lg:w-60 inline-block ml-1 md:mx-1.5 mb-1.5"
                width={800}
                height={195}
              />
            ),
            small: (chunks) => <span className="text-sm">{chunks}</span>,
          })}
        </h1>
      </div>

      <div className="max-w-sm md:max-w-lg flex flex-col items-start justify-left mx-auto px-4">
        <p className="text-md md:text-lg mt-6 leading-relaxed text-[#08272E] font-semibold">
          {t("hero.subtitle")}
        </p>
        <ul className="list-none list-inside gap-2 flex flex-col mt-4">
          <li className="flex-row flex gap-2 items-center">
            <span>
              <Check className="w-6 h-6" />
            </span>
            <span className="text-md md:text-lg leading-relaxed text-[#5C5B61]">
              {t("hero.benefits.1")}
            </span>
          </li>
          <li className="flex-row flex gap-2 items-center">
            <span>
              <Check className="w-6 h-6" />
            </span>
            <span className="text-md md:text-lg leading-relaxed text-[#5C5B61]">
              {t("hero.benefits.2")}
            </span>
          </li>
          <li className="flex-row flex gap-2 items-center">
            <span>
              <Check className="w-6 h-6" />
            </span>
            <span className="text-md md:text-lg leading-relaxed text-[#5C5B61]">
              {t("hero.benefits.3")}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center gap-1.5 mt-8">
        <span className="text-md leading-relaxed text-[#5C5B61] font-medium">
          {t.rich("hero.avatars", {
            counter: (chunks) => (
              <span className="text-[#08272E]">{chunks}</span>
            ),
            linkedin: () => (
              <Image
                src="/static/linkedin.svg"
                alt="LinkedIn"
                className="w-20 inline-block ml-1 mb-1"
                width={800}
                height={195}
              />
            ),
          })}
        </span>
        <div className="flex -space-x-2 overflow-hidden">
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://media.licdn.com/dms/image/v2/D4E03AQGayq0O22-_Fw/profile-displayphoto-shrink_100_100/B4EZRovgymGwAU-/0/1736924073640?e=1747872000&v=beta&t=N_bGf_q-xUFZM1NRQJMPL7OW0apQm_rR3ExPSLaJT6s"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://media.licdn.com/dms/image/v2/D4D03AQF-vSGHgXopBA/profile-displayphoto-shrink_100_100/B4DZTRI9pqHYAU-/0/1738675576002?e=1747872000&v=beta&t=yMp1E-aA1ExH047TRX9s0BvZISZwv5RB0qDzIy5j0RA"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://media.licdn.com/dms/image/v2/D4E03AQFdJCLtt2k82g/profile-displayphoto-shrink_100_100/B4EZSEiVZxHAAU-/0/1737390381124?e=1747872000&v=beta&t=Qa-V22BWgOmJU1AE0iMAvHX4jVIzOIahjvdRuPpoMGk"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://media.licdn.com/dms/image/v2/D4D03AQFSuyeSk_Drcg/profile-displayphoto-shrink_100_100/B4DZVaytAkHIAY-/0/1740984996251?e=1747872000&v=beta&t=Ar2FcVzxmN4xR-fbKxcoBFCRtw45nwSyMdFsVDYad98"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://media.licdn.com/dms/image/v2/D4E03AQGaGFtbTpBWNw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721894724291?e=1747872000&v=beta&t=ngFGw1n97tBJCaghvCPyu9e9t_ytWk0xNUXjmSeJGXg"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://media.licdn.com/dms/image/v2/D4E03AQEZ9ryk-hPGsg/profile-displayphoto-shrink_200_200/B4EZTBvM9kHUAY-/0/1738417166061?e=1747872000&v=beta&t=7YZr4ItP6z74TCNQCAOcNNSfyyHI_H4__ZmAHp0PyN8"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block size-8 rounded-full ring-2 ring-background"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
