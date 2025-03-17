"use client";
import { Check, Split, TrendingDown, UserX } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export const Problem = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <section
        id="solutions"
        className="bg-card shadow-sm w-full py-6 px-1 flex flex-col items-start mx-auto max-w-5xl gap-4 mt-8 rounded-3xl"
      >
        <div className="flex flex-col w-full px-4 md:px-8 md:py-4">
          <span className="bg-[#FFEAF1] text-[#E0004B] text-md font-semibold me-2 px-2.5 py-0.5 w-fit rounded-full">
            {t("problem.title")}
          </span>
          <h2 className="text-2xl font-bold mt-4">
            {t.rich("problem.heading", {
              logo: () => (
                <Image
                  src="/static/logo.svg"
                  alt="pimms"
                  className="w-20 inline-block mb-[2px] mr-1"
                  width={1000}
                  height={179}
                />
              ),
            })}
          </h2>
          <p className="text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]">
            {t("problem.description")}
          </p>
          {showMore ? (
            <ul className="list-none list-inside gap-6 flex flex-col mt-4">
              <li className="flex-row flex gap-4">
                <div className="p-2 md:p-3 bg-[#FFEAF1] text-[#E0004B] w-fit h-fit mt-1 rounded-full">
                  <UserX className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md md:text-lg text-[#08272E] font-bold">
                    {t("problem.more.title1")}
                  </span>
                  <p className="text-md leading-relaxed text-balance text-[#5C5B61]">
                    {t.rich("problem.more.description1", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </p>
                </div>
              </li>
              <li className="flex-row flex gap-4">
                <div className="p-2 md:p-3 bg-[#FFEAF1] text-[#E0004B] w-fit h-fit mt-1 rounded-full">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md md:text-lg text-[#08272E] font-bold">
                    {t("problem.more.title2")}
                  </span>
                  <p className="text-md leading-relaxed text-balance text-[#5C5B61]">
                    {t.rich("problem.more.description2", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </p>
                </div>
              </li>
              <li className="flex-row flex gap-4">
                <div className="p-2 md:p-3 bg-[#FFEAF1] text-[#E0004B] w-fit h-fit mt-1 rounded-full">
                  <Split className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-md md:text-lg text-[#08272E] font-bold">
                    {t("problem.more.title3")}
                  </span>
                  <p className="text-md leading-relaxed text-balance text-[#5C5B61]">
                    {t.rich("problem.more.description3", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </p>
                </div>
              </li>
            </ul>
          ) : (
            <button
              onClick={() => setShowMore(true)}
              className="text-[#08272E] font-bold w-fit my-2 py-2 hover:underline"
            >
              {t("cta.show_more")}
            </button>
          )}
        </div>
      </section>

      <section
        id="solutions"
        className="bg-card w-full py-6 px-1 flex flex-col items-start mx-auto max-w-5xl gap-4 mt-8 rounded-3xl"
      >
        <div className="flex flex-col w-full px-4 md:px-8 md:py-4">
          <span className="bg-[#f1fdf8] text-[#26CF64] text-md font-semibold me-2 px-2.5 py-0.5 w-fit rounded-full">
            {t("solution.title")}
          </span>
          <h2 className="text-2xl font-bold mt-4">{t("solution.heading")}</h2>
          <p className="text-md md:text-lg leading-relaxed mt-4 text-[#5C5B61]">
            {t.rich("solution.description", {
              logo: () => (
                <Image
                  src="/static/logo.svg"
                  alt="pim.ms"
                  className="w-16 inline-block mb-[2px] mr-0.5"
                  width={1000}
                  height={179}
                />
              ),
            })}
          </p>
          <ul className="list-disc list-inside gap-2 flex flex-col mt-4">
            <li className="flex-row flex gap-4">
              <div className="p-2 md:p-3 bg-[#f1fdf8] text-[#26CF64] w-fit h-fit mt-1 rounded-full">
                <Check className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#08272E] font-bold">
                  {t("solution.more.title1")}
                </span>
                <p className="text-md leading-relaxed text-balance text-[#5C5B61]">
                  {t.rich("solution.more.description1", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </div>
            </li>
          </ul>
          <ul className="list-disc list-inside gap-2 flex flex-col mt-4">
            <li className="flex-row flex gap-4">
              <div className="p-2 md:p-3 bg-[#f1fdf8] text-[#26CF64] w-fit h-fit mt-1 rounded-full">
                <Check className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#08272E] font-bold">
                  {t("solution.more.title2")}
                </span>
                <p className="text-md leading-relaxed text-balance text-[#5C5B61]">
                  {t.rich("solution.more.description2", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </div>
            </li>
          </ul>
          <ul className="list-disc list-inside gap-2 flex flex-col mt-4">
            <li className="flex-row flex gap-4">
              <div className="p-2 md:p-3 bg-[#f1fdf8] text-[#26CF64] w-fit h-fit mt-1 rounded-full">
                <Check className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#08272E] font-bold">
                  {t("solution.more.title3")}
                </span>
                <p className="text-md leading-relaxed text-balance text-[#5C5B61]">
                  {t.rich("solution.more.description3", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
