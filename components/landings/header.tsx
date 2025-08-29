import Logo from "@/components/logo";
import CtaDemo from "@/components/cta/CtaDemo";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { APP_URL } from "../../app/constants";

export default function Header() {
  const tcommon = useTranslations("landing");
  return (
    <header className="w-full sticky top-3 xl:top-0 z-50 bg-transparent xl:bg-white/80 xl:backdrop-blur-md xl:border-b xl:border-gray-100/50">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-16 xl:h-20 mt-3 xl:mt-0 bg-white/90 xl:bg-transparent backdrop-blur-md xl:backdrop-blur-0 border border-gray-100/60 xl:border-0 shadow-[0_10px_40px_-15px_rgba(42,74,155,0.2)] xl:shadow-none rounded-3xl xl:rounded-none flex items-center justify-between px-6 sm:px-8 relative">
          <div className="flex-shrink-0 mr-8">
            <Logo />
          </div>
          <nav className="flex items-center gap-3 md:gap-4 flex-1">
            <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <NavLink id="features" text={tcommon("nav.features")} />
              <NavLink id="pricing" text={tcommon("nav.pricing")} />
              <NavLink id="onboarding" text={tcommon("nav.onboarding")} />
              <Link href={`${APP_URL}/login`}>
                <Button variant="link" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  {tcommon("nav.dashboard")}
                </Button>
              </Link>
            </div>
            <div className="ml-auto flex items-center">
              <CtaDemo variant="secondary" size="default">
                {tcommon("cta.demo")}
              </CtaDemo>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
