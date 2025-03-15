"use client";
import Logo from "@/components/logo";
import CtaLink from "./cta/CtaLink";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import Link from "next/link";
import { APP_URL } from "../app/constants";

export default function Header({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);
  return (
    <>
      <header className="w-full relative flex flex-wrap items-center gap-y-2.5 gap-x-5 py-3.5 mt-2 px-6 max-w-7xl mx-auto justify-between">
        <div className="absolute w-full h-[135%] scale-y-150 left-0 top-0 -translate-y-1/2 bg-pattern blur-[25px] pointer-events-none"></div>
        <Logo />
        <nav className="flex-row items-center flex z-10 gap-x-3 md:gap-x-6 overflow-hidden">
          <NavLink id="video" text={t("nav.how_it_works")} />
          <NavLink id="solutions" text={t("nav.solutions")} />
          <NavLink id="lifetime" text={t("nav.pricing")} />
          <Link href={`${APP_URL}/login`} target="_blank" rel="noreferrer">
            <Button
              variant="link"
              className="px-0 cursor-pointer text-sm md:text-base font-medium text-slate-500 text-opacity-80 hover:text-slate-800 leading-none"
            >
              {t("nav.dashboard")}
            </Button>
          </Link>
          <CtaLink tkey={tkey} />
        </nav>
      </header>
    </>
  );
}
