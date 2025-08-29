import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { getCanonicalLink } from "../../lib/utils";
import Logo from "../logo";
import { APP_URL } from "../../app/constants";

export default function BlogHeader() {
  const t = useTranslations("blog.nav");
  const locale = useLocale();

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 mr-6">
          <Logo />
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href={getCanonicalLink(locale, "/articles")}>
            <Button
              variant="link"
              className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 px-2 sm:px-3"
            >
              {t("articles")}
            </Button>
          </Link>
          <Link href={`${APP_URL}/login`}>
            <Button
              variant="link"
              className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 px-2 sm:px-3"
            >
              {t("dashboard")}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
