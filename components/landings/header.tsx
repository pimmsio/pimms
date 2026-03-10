import Logo from "@/components/logo";
import CtaDemo from "@/components/cta/CtaDemo";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { APP_URL } from "../../app/constants";
import { SwapRotate } from "../magicui/swap-rotate";
import { getCanonicalLink } from "@/lib/utils";
import { MegaMenu } from "@/components/nav/mega-menu";
import { MobileNav } from "@/components/nav/mobile-nav";
import { LocaleSwitcher } from "@/components/nav/locale-switcher";
import { navGroups } from "@/components/nav/nav-config";

function resolveNavSections(t: (key: string) => string, locale: string) {
  return navGroups.map((group) => ({
    label: t(group.labelKey),
    items: group.items.map((item) => ({
      ...item,
      label: t(item.labelKey),
      description: item.descriptionKey ? t(item.descriptionKey) : undefined,
      resolvedHref: item.external ? item.href : getCanonicalLink(locale, item.href)
    }))
  }));
}

export default async function Header() {
  const tcommon = await getTranslations("landing");
  const locale = await getLocale();

  const sections = resolveNavSections(tcommon, locale);

  return (
    <header className="w-full sticky top-3 xl:top-0 z-50 bg-transparent xl:bg-white/90 xl:backdrop-blur-sm xl:border-b xl:border-gray-100/50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 xl:h-20 mt-3 xl:mt-0 bg-white/95 xl:bg-transparent border border-gray-100/60 xl:border-0 shadow-lg xl:shadow-none rounded-3xl xl:rounded-none flex items-center justify-between px-6 sm:px-8 relative">
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          <nav className="flex items-center justify-end gap-2 flex-1">
            <MegaMenu
              sections={sections}
              locale={locale}
            />

            <div className="hidden lg:block">
              <Link
                href={getCanonicalLink(locale, "/landings/pricing")}
                className="text-sm px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {tcommon("nav.pricing")}
              </Link>
            </div>

            <div className="hidden lg:block">
              <LocaleSwitcher />
            </div>

            <div className="w-fit flex items-center gap-4 lg:gap-6 ml-2">
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

            <MobileNav
              sections={sections}
              locale={locale}
              pricingLabel={tcommon("nav.pricing")}
              pricingHref={getCanonicalLink(locale, "/landings/pricing")}
              dashboardLabel={tcommon("nav.dashboard")}
              dashboardHref={`${APP_URL}/login`}
              demoLabel={tcommon("cta.demo")}
              demoHref="https://cal.com/getpimms/demo"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
