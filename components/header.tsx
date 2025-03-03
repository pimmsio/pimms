"use client";
import Logo from "@/components/logo";
import CtaLink from "./cta/CtaLink";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";

export default function Header({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);
  return (
    <header className="w-full bg-white relative py-3 my-4 outline outline-[6px] outline-[#D4F0FE] px-1 md:px-6 flex justify-between items-center">
      <Logo />
      <nav className="flex-row items-center hidden md:flex">
        <NavLink id="video" text={t("nav.how_it_works")} />
        <NavLink id="solutions" text={t("nav.solutions")} />
        <CtaLink tkey={tkey} />
      </nav>
    </header>
  );
}
