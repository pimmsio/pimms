import { useLocale, useTranslations } from "next-intl";
import Logo from "./logo";
import Link from "next/link";
import { getCanonicalLink } from "../lib/utils";

export const Footer = () => {
  const locale = useLocale();

  const t = useTranslations("general");

  return (
    <div className="mt-auto">
      <div className="py-10 mt-10 bg-white px-7">
        <div className="max-w-7xl text-sm mx-auto gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 6xl:flex flex-wrap">
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs mr-auto order-last md:order-first">
            <Logo />
            <div className="text-gray-500">{t("footer.description")}</div>
            <div className="opacity-60 text-xs font-semibold">
              {t("footer.copyright")}
            </div>
          </nav>
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs">
            <div className="font-semibold text-gray-900">
              {t("footer.category.solutions")}
            </div>
            <Link
              aria-current="page"
              href={getCanonicalLink(locale, "/")}
              className="router-link-active router-link-exact-active"
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.solutions.site")}
              </div>
            </Link>
            <Link
              aria-current="page"
              href={getCanonicalLink(locale, "/solutions/youtube")}
              className="router-link-active router-link-exact-active"
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.solutions.youtube")}
              </div>
            </Link>
          </nav>
          {/* <nav className="flex flex-col flex-wrap gap-4 max-w-xs">
            <div className="font-semibold text-gray-900">Legal</div>
            <Link href="/terms-of-service" className="">
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                Terms of Service
              </div>
            </Link>
            <Link href="/refunds" className="">
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                Refund Policy
              </div>
            </Link>
            <Link href="/privacy-policy" className="">
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                Privacy Policy
              </div>
            </Link>
          </nav> */}
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs">
            <div className="font-semibold text-gray-900">
              {t("footer.category.help")}
            </div>
            <Link href="mailto:alexandre@pimms.io" rel="noopener noreferrer">
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                alexandre@pimms.io
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
