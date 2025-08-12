import { useLocale, useTranslations } from "next-intl";
import Logo from "../logo";
import Link from "next/link";
import { cn, getCanonicalLink } from "../../lib/utils";
import { InstagramIcon } from "../icons/instagram-icon";
import { LinkedInIcon } from "../icons/linkedin-icon";
import { GithubIcon } from "../icons/github-icon";
import Image from "next/image";
import { DubRef } from "./dub-ref";

export const Footer = ({
  className,
  showApps = true,
  showRef = false
}: {
  className?: string;
  showApps?: boolean;
  showRef?: boolean;
}) => {
  const locale = useLocale();
  const t = useTranslations("general");

  return (
    <footer className={cn("bg-gray-50 border-t border-gray-100", className)}>
      <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Logo and description column */}
            <div className="lg:col-span-2 space-y-6">
              <Logo />
              <p className="text-[#5C5B61] leading-relaxed max-w-sm">{t("footer.description")}</p>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/pimmsio/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-[#3970ff] group-hover:bg-[#3970ff] group-hover:shadow-sm">
                    <GithubIcon className="w-4 h-4 text-[#5C5B61] group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-[#3970ff] group-hover:bg-[#3970ff] group-hover:shadow-sm">
                    <LinkedInIcon className="w-4 h-4 text-[#5C5B61] group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-[#3970ff] group-hover:bg-[#3970ff] group-hover:shadow-sm">
                    <InstagramIcon className="w-4 h-4 text-[#5C5B61] group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Solutions */}
              <div>
                <h6 className="text-[#08272E] font-semibold mb-4 text-sm uppercase tracking-wide">
                  {t("footer.category.solutions")}
                </h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/landings/youtube")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      YouTube
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/landings/amazon")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Amazon
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/landings/ab-testing")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      A/B Testing
                    </Link>
                  </li>
                </ul>

                <h6 className="text-[#08272E] font-semibold mb-4 mt-8 text-sm uppercase tracking-wide">
                  {t("footer.category.alternatives")}
                </h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(
                        locale,
                        "/articles/bitly-vs-pimms-what-founders-really-need-beyond-click-tracking"
                      )}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.alternatives.bitly")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h6 className="text-[#08272E] font-semibold mb-4 text-sm uppercase tracking-wide">
                  {t("footer.category.resources")}
                </h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/category/guides")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.guides")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/category/tutorials")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.tutorials")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://pim.ms/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.api")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://pim.ms/sdk-ts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.sdk-ts")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/category/digital-marketing")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.blog")}
                    </Link>
                  </li>
                </ul>

                <h6 className="text-[#08272E] font-semibold mb-4 mt-8 text-sm uppercase tracking-wide">
                  {t("footer.category.freetools")}
                </h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/freetools/site-checker")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.freetools.site-checker")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h6 className="text-[#08272E] font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/terms")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/imprint")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.imprint")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/privacy")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/abuse")}
                      className="text-[#5C5B61] hover:text-[#3970ff] transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.report")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <p className="text-[#5C5B61] text-sm mb-2">{t("footer.copyright")}</p>
                {showRef && (
                  <p className="text-[#5C5B61] text-xs max-w-2xl leading-relaxed">
                    The PIMMS team builds powerful, privacy-conscious marketing tools — helping anyone grow online with
                    smart links and QR codes. &apos;QR Code&apos; is a registered trademark of DENSO WAVE INCORPORATED.
                    This project is based on <DubRef /> open-source software licensed under the AGPL.{" "}
                    <Link
                      href="https://github.com/pimmsio/getpimms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3970ff] hover:underline"
                    >
                      View source on GitHub
                    </Link>
                  </p>
                )}
              </div>

              {showApps && (
                <div className="flex gap-4 items-center">
                  <Link
                    href="https://zapier.com/apps/pimms/integrations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3970ff] hover:shadow-sm transition-all duration-200"
                  >
                    <Image
                      src="/static/zapier-apps.svg"
                      alt="Zapier Apps"
                      width={380}
                      height={36}
                      className="w-auto h-5 opacity-80"
                    />
                  </Link>
                  <Link
                    href="https://marketplace.stripe.com/apps/pimms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-[#3970ff] hover:shadow-sm transition-all duration-200"
                  >
                    <Image
                      src="/static/stripe-apps.svg"
                      alt="Stripe Apps"
                      width={380}
                      height={36}
                      className="w-auto h-5 opacity-80"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
