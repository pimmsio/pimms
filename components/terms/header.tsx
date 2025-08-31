import Logo from "@/components/logo";
import NavLink from "@/components/NavLink";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/app/constants";
import { getCanonicalLink } from "@/lib/utils";

export default function Header({ tkey }: { tkey: string }) {
  const locale = useLocale();
  const t = useTranslations(tkey);

  return (
    <>
      <header className="w-full relative flex flex-wrap items-center gap-y-1 gap-x-5 py-3.5 mt-2 px-6 max-w-7xl mx-auto justify-between">
        <div className="hidden md:block absolute w-full h-[135%] scale-y-150 left-0 top-0 -translate-y-1/2 bg-pattern blur-[25px] pointer-events-none"></div>
        <Logo />
        <nav className="flex flex-row flex-wrap w-full items-center z-10 gap-x-3 md:gap-x-6 text-text-secondary">
          <NavLink url={getCanonicalLink(locale, "/articles/terms")} text={t("nav.terms")} />
          <NavLink url={getCanonicalLink(locale, "/articles/privacy")} text={t("nav.privacy")} />
          <NavLink url={getCanonicalLink(locale, "/articles/imprint")} text={t("nav.imprint")} />
          <Link href={`${APP_URL}/login`} target="_blank" rel="noreferrer">
            <Button
              variant="link"
              className="px-0 cursor-pointer text-sm md:text-base font-medium text-slate-500 text-opacity-80 hover:text-slate-800 leading-none"
            >
              {t("nav.dashboard")}
            </Button>
          </Link>
        </nav>
      </header>
    </>
  );
}
