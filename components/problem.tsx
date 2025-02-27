"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export const Problem = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-card outline outline-4 outline-[#D4F0FE] w-full py-6 px-1 flex flex-col md:flex-row items-start mx-auto max-w-7xl gap-4 mt-8 text-center md:text-left">
      <div className="flex flex-col w-full md:w-1/2 p-4">
        <h2 className="text-2xl md:text-3xl font-bold text-balance">
          {t("problem.title")}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
          {t("problem.description")}
        </p>
        {showMore ? (
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
        ) : (
          <button
            onClick={() => setShowMore(true)}
            className="text-primary font-bold w-fit my-2 py-4 hover:underline mx-auto md:mx-0"
          >
            {t("cta.show_more")}
          </button>
        )}
      </div>

      <div className="flex flex-col w-full md:w-1/2 p-4">
        <h2 className="text-2xl md:text-3xl font-bold text-balance">
          {t("solution.title")}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-balance mt-4">
          {t.rich("solution.description", {
            logo: () => (
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
        {showMore ? (
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
        ) : (
          <button
            onClick={() => setShowMore(true)}
            className="text-primary font-bold w-fit my-2 py-4 hover:underline mx-auto md:mx-0"
          >
            {t("cta.show_more")}
          </button>
        )}
      </div>
    </section>
  );
};
