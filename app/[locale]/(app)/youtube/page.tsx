"use client";
import { WaitlistForm } from "@/components/waitlist-form";
import CtaButton from "@/components/cta/CtaButton";
import BouncingImages from "@/components/BouncingImages";
import VideoSlide from "@/components/VideoSlide";
import { useTranslations } from "next-intl";
import Logo from "@/components/logo";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextTransition from "@/components/TextTransition";

const tkey = "landing.youtube";
export default function Home() {
  const t = useTranslations(tkey);

  const TEXTS = [
    "Linkedin",
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
    <div className="min-h-screen bg-background text-foreground w-11/12 mx-auto">
      <header className="w-full bg-white relative py-3 my-4 outline outline-4 outline-[#D4F0FE] px-1 md:px-6 flex justify-between items-center">
        <Logo />
        <CtaButton tkey={tkey} />
      </header>

      <section
        className="w-full my-12 md:my-20 text-center px-1 md:px-6"
        id="waitlist"
      >
        <div className="max-w-sm md:max-w-4xl mx-auto">
          <h1 className="text-2xl/relaxed md:text-4xl/relaxed font-extrabold tracking-tight text-balance">
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
                  className="w-32 md:w-40 inline-block mx-2 mb-2"
                  width={800}
                  height={178}
                />
              ),
            })}
          </h1>
          <p className="text-lg md:text-xl mt-3 max-w-3xl mx-auto leading-relaxed text-balance">
            {t.rich("hero.description", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
      </section>

      <section className="w-full my-12 md:my-20 md px-1 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <WaitlistForm tkey={tkey} />
        </div>
      </section>

      <section className="w-full max-w-7xl my-12 md:my-20 md mx-auto relative overflow-hidden outline outline-4 outline-[#D4F0FE] flex justify-center items-center">
        <VideoSlide />
      </section>

      <section className="bg-card outline outline-4 outline-[#D4F0FE] w-full py-6 px-1 flex flex-col md:flex-row items-start mx-auto max-w-7xl gap-4 mt-8 text-center md:text-left">
        <div className="flex flex-col w-full md:w-1/2 p-4">
          <h2 className="text-2xl md:text-3xl font-bold text-balance">
            {t("problem.title")}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
            {t("problem.description")}
          </p>
          <ul className="list-decimal list-inside gap-2 flex flex-col mt-4">
            <li className="text-balance text-md md:text-lg">
              {t.rich("problem.more.1", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li className="text-balance text-md md:text-lg">
              {t.rich("problem.more.2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li className="text-balance text-md md:text-lg">
              {t.rich("problem.more.3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li className="text-balance text-md md:text-lg">
              {t.rich("problem.more.4", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          </ul>
        </div>

        <div className="flex flex-col w-full md:w-1/2 p-4">
          <h2 className="text-2xl md:text-3xl font-bold text-balance">
            {t("solution.title")}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
            {t.rich("solution.description", {
              strong: () => (
                <Image
                  src="/static/logo.svg"
                  alt="pim.ms"
                  className="w-20 inline-block mb-[2px] mr-1"
                  width={1000}
                  height={179}
                />
              ),
            })}
          </p>
          <ul className="list-decimal list-inside gap-2 flex flex-col mt-4">
            <li className="text-balance text-md md:text-lg">
              {t.rich("solution.more.1", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li className="text-balance text-md md:text-lg">
              {t.rich("solution.more.2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li className="text-balance text-md md:text-lg">
              {t.rich("solution.more.3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full py-6 md:py-12 px-1 flex flex-col md:flex-row items-center mx-auto max-w-7xl gap-6 mt-8">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-balance mb-4">
            {t.rich("offer_details.title", {
              strong: () => (
                <Image
                  src="/static/logo.svg"
                  alt="pim.ms"
                  className="w-32 inline-block mb-[6px] ml-1"
                  width={1000}
                  height={179}
                />
              ),
            })}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-balance">
            {t("offer_details.description")}
          </p>
          <div className="mt-8 w-full">
            <CtaButton tkey={tkey} show />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <BouncingImages tkey={`${tkey}.offer_details`} />
        </div>
      </section>
    </div>
  );
}
