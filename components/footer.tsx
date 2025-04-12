import { useLocale, useTranslations } from "next-intl";
import Logo from "./logo";
import Link from "next/link";
import { getCanonicalLink } from "../lib/utils";
import { InstagramIcon } from "./icons/instagram-icon";
import { LinkedInIcon } from "./icons/linkedin-icon";
import { GithubIcon } from "./icons/github-icon";
import { Paragraph } from "./base/paragraph";

export const Footer = () => {
  const locale = useLocale();

  const t = useTranslations("general");

  return (
    <div className="mt-auto">
      <div className="py-10 mt-10 bg-white px-7">
        <div className="max-w-7xl text-sm mx-auto gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 6xl:flex flex-wrap">
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs mr-auto order-last md:order-first">
            <Logo />
            <div className="text-gray-500">{t("footer.description")}</div>
            <div className="opacity-60 text-xs font-semibold">
              {t("footer.copyright")}
            </div>
            <div className="flex gap-2">
              <Link
                href="https://github.com/getpimms/pim-ms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-6 h-6 opacity-80 hover:opacity-100" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/getpimms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="w-6 h-6 opacity-80 hover:opacity-100" />
              </Link>
              <Link
                href="https://www.instagram.com/getpimms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="w-6 h-6 opacity-80 hover:opacity-100" />
              </Link>
            </div>
          </nav>
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs">
            <div className="font-semibold text-gray-900">
              {t("footer.category.solutions")}
            </div>
            <Link
              aria-current="page"
              href={getCanonicalLink(locale, "/solutions/youtube")}
              className="router-link-active router-link-exact-active"
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.solutions.youtube")}
              </div>
            </Link>
            <Link
              aria-current="page"
              href={getCanonicalLink(locale, "/solutions/amazon")}
              className="router-link-active router-link-exact-active"
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.solutions.amazon")}
              </div>
            </Link>
          </nav>
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs">
            <div className="font-semibold text-gray-900">
              {t("footer.category.resources")}
            </div>
            <Link
              aria-current="page"
              href={getCanonicalLink(locale, "/blog")}
              className="router-link-active router-link-exact-active"
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.resources.blog")}
              </div>
            </Link>
          </nav>
          <nav className="flex flex-col flex-wrap gap-4 max-w-xs">
            <div className="font-semibold text-gray-900">Legal</div>
            <Link href={getCanonicalLink(locale, "/legal/terms")} className="">
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.nav.terms")}
              </div>
            </Link>
            <Link
              href={getCanonicalLink(locale, "/legal/imprint")}
              className=""
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.nav.imprint")}
              </div>
            </Link>
            <Link
              href={getCanonicalLink(locale, "/legal/privacy")}
              className=""
            >
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.nav.privacy")}
              </div>
            </Link>
            <Link href={getCanonicalLink(locale, "/legal/abuse")} className="">
              <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
                {t("footer.nav.report")}
              </div>
            </Link>
          </nav>
        </div>
        <Paragraph className="mx-auto max-w-7xl text-xs!">
          This project is based on open-source software licensed under the AGPL.{" "}
          <Link
            href="https://github.com/getpimms/pim-ms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#08272E] hover:underline"
          >
            See the full source code on GitHub.
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};

export default Footer;
