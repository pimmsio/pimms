import Logo from "@/components/logo";
import CtaDemo from "@/components/cta/CtaDemo";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { APP_URL } from "../../app/constants";
import { SwapRotate } from "../magicui/swap-rotate";
import { getCanonicalLink } from "@/lib/utils";

export default async function Header() {
  const tcommon = await getTranslations("landing");
  const locale = await getLocale();

  return (
    <header className="w-full sticky top-3 xl:top-0 z-50 bg-transparent xl:bg-white/90 xl:border-b xl:border-gray-100/50">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 xl:h-20 mt-3 xl:mt-0 bg-white/95 xl:bg-transparent border border-gray-100/60 xl:border-0 shadow-lg xl:shadow-none rounded-3xl xl:rounded-none flex items-center justify-between px-6 sm:px-8 relative">
          <div className="flex-shrink-0 mr-8">
            <Logo />
          </div>
          <nav className="flex items-center justify-end gap-3 md:gap-4 flex-1">
            <div className="hidden lg:flex gap-4 md:gap-6">
              <Link
                href={getCanonicalLink(locale, "/landings/pricing")}
                className="text-sm px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {tcommon("nav.pricing")}
              </Link>
              <Link
                href={getCanonicalLink(locale, "/landings/contact-sales")}
                className="text-sm px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {tcommon("nav.contact")}
              </Link>
            </div>
            <div className="w-fit flex items-center gap-8">
              <Link
                href={`${APP_URL}/login`}
                className="hidden sm:inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-medium leading-tight ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 text-sm text-muted-foreground hover:text-foreground bg-muted/50 rounded-full px-4 py-3"
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
