import Logo from "@/components/logo";
import CtaLink from "../cta/CtaLink";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { APP_URL } from "../../app/constants";

export default function Header({ tkey }: { tkey: string }) {
  const tcommon = useTranslations("landing.common");
  return (
    <>
      <header className="w-full relative flex flex-wrap items-center gap-y-1 gap-x-5 py-3.5 mt-2 px-6 max-w-7xl mx-auto justify-between">
        <Logo />
        <nav className="flex-row items-center flex z-10 gap-x-2 md:gap-x-6 overflow-hidden text-[#5C5B61]">
          <NavLink id="video" text={tcommon("nav.how_it_works")} />
          <NavLink id="lifetime" text={tcommon("nav.pricing")} />
          <Link href={`${APP_URL}/login`}>
            <Button
              variant="link"
              className="px-0 cursor-pointer text-sm md:text-base font-medium text-slate-500 text-opacity-80 hover:text-slate-800 leading-none"
            >
              {tcommon("nav.dashboard")}
            </Button>
          </Link>
          <CtaLink tkey={tkey} />
        </nav>
      </header>
    </>
  );
}
