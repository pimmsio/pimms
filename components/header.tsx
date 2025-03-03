"use client";
import Logo from "@/components/logo";
import CtaLink from "./cta/CtaLink";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";

export default function Header({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);
  return (
    <>
      <header className="w-full relative flex flex-wrap items-center gap-y-2.5 gap-x-5 py-3.5 mt-2 px-6 max-w-7xl mx-auto justify-between">
        <div className="absolute w-full h-[135%] scale-y-150 left-0 top-0 -translate-y-1/2 bg-pattern blur-[25px] pointer-events-none"></div>
        <Logo />
        <nav className="flex-row items-center flex z-10 gap-x-3 overflow-hidden">
          <NavLink id="video" text={t("nav.how_it_works")} />
          <NavLink id="solutions" text={t("nav.solutions")} />
          <CtaLink tkey={tkey} />
        </nav>
      </header>
    </>
  );
}
