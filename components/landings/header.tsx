import Logo from "@/components/logo";
import CtaDemo from "@/components/cta/CtaDemo";
import NavLink from "./NavLink";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { APP_URL } from "../../app/constants";
import { SwapRotate } from "../magicui/swap-rotate";

export default async function Header() {
  const tcommon = await getTranslations("landing");

  return (
    <header className="w-full sticky top-3 xl:top-0 z-50 bg-transparent xl:bg-white/90 xl:border-b xl:border-gray-100/50">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 xl:h-20 mt-3 xl:mt-0 bg-white/95 xl:bg-transparent border border-gray-100/60 xl:border-0 shadow-lg xl:shadow-none rounded-3xl xl:rounded-none flex items-center justify-between px-6 sm:px-8 relative">
          <div className="flex-shrink-0 mr-8">
            <Logo />
          </div>
          <nav className="flex items-center justify-end lg:justify-between gap-3 md:gap-4 flex-1">
            <div className="hidden lg:flex items-center gap-4 md:gap-6 mx-auto">
              <NavLink id="features" text={tcommon("nav.features")} />
              <NavLink id="pricing" text={tcommon("nav.pricing")} />
              <NavLink id="onboarding" text={tcommon("nav.onboarding")} />
            </div>
            <div className="w-fit flex items-center gap-8">
              <Link
                href={`${APP_URL}/login`}
                className="hidden sm:inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-medium leading-tight ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-3"
              >
                {tcommon("nav.dashboard")}
              </Link>
              <CtaDemo variant="secondary" size="default">
                <SwapRotate>{tcommon("cta.demo")}</SwapRotate>
              </CtaDemo>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
