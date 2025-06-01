import Logo from "@/components/logo";
import CtaLink from "../cta/CtaLink";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { APP_URL } from "../../app/constants";

export default function Header() {
  const tcommon = useTranslations("landing");
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 mr-4">
          <Logo />
        </div>
        <nav className="flex items-center md:gap-x-6">
          <NavLink id="pricing" text={tcommon("nav.pricing")} />
          <Link href={`${APP_URL}/login`}>
            <Button variant="link" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              {tcommon("nav.dashboard")}
            </Button>
          </Link>
          <CtaLink />
        </nav>
      </div>
    </header>
  );
}
