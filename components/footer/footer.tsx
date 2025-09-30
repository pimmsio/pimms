import { getTranslations, getLocale } from "next-intl/server";
import Logo from "../logo";
import Link from "next/link";
import { cn, getCanonicalLink } from "../../lib/utils";
import { InstagramIcon } from "../icons/instagram-icon";
import { LinkedInIcon } from "../icons/linkedin-icon";
import { GithubIcon } from "../icons/github-icon";
import Image from "next/image";
import { DubRef } from "./dub-ref";
import { OptimizedImage } from "../ui/optimized-image";

export const Footer = async ({
  className,
  showApps = true,
  showRef = false
}: {
  className?: string;
  showApps?: boolean;
  showRef?: boolean;
}) => {
  const t = await getTranslations("general");
  const locale = await getLocale();

  return (
    <footer className={cn("bg-gray-50 border-t border-gray-100 relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: "translateY(30%)",
          opacity: 0.03
        }}
      >
        <div className="scale-[11] sm:scale-[9] lg:scale-[4]">
          <OptimizedImage
            src="/static/logo.svg"
            alt="pim.ms logo"
            width={400}
            height={72}
            className="w-auto h-auto"
            loading="lazy"
          />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
            {/* Logo and description column */}
            <div className="lg:col-span-2 space-y-8">
              <Logo />
              <p className="text-text-secondary leading-relaxed max-w-sm">{t("footer.description")}</p>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/pimmsio/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Follow us on GitHub"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:shadow-sm">
                    <GithubIcon className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Follow us on LinkedIn"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:shadow-sm">
                    <LinkedInIcon className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Follow us on Instagram"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:shadow-sm">
                    <InstagramIcon className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Solutions */}
              <div>
                <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wide">
                  {t("footer.category.solutions")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/landings/linkedin-tracker")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      LinkedIn Profile Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/landings/youtube")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      YouTube Conversion Tracking
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/landings/systemeio")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Tracking funnels Systeme.io
                    </Link>
                  </li>
                </ul>

                <h3 className="text-text-primary font-semibold mb-4 mt-8 text-sm uppercase tracking-wide">
                  {t("footer.category.alternatives")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(
                        locale,
                        "/articles/bitly-vs-pimms-what-founders-really-need-beyond-click-tracking"
                      )}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.alternatives.bitly")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wide">
                  {t("footer.category.resources")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/category/guides")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.guides")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/category/tutorials")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.tutorials")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://pim.ms/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.api")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://pim.ms/sdk-ts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.sdk-ts")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/category/digital-marketing")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.resources.blog")}
                    </Link>
                  </li>
                </ul>

                <h3 className="text-text-primary font-semibold mb-4 mt-8 text-sm uppercase tracking-wide">
                  {t("footer.category.freetools")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/freetools/site-checker")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.freetools.site-checker")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/terms")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/imprint")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.imprint")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/privacy")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
                    >
                      {t("footer.nav.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getCanonicalLink(locale, "/articles/abuse")}
                      className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm"
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
                <p className="text-text-secondary text-sm mb-2">{t("footer.copyright")}</p>
                {showRef && (
                  <p className="text-text-secondary text-sm max-w-2xl leading-relaxed">
                    The PIMMS team builds powerful, privacy-conscious marketing tools — helping anyone grow online with
                    smart links and QR codes. &apos;QR Code&apos; is a registered trademark of DENSO WAVE INCORPORATED.
                    This project is based on <DubRef /> open-source software licensed under the AGPL.{" "}
                    <Link
                      href="https://github.com/pimmsio/getpimms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline underline-offset-2"
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
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-brand-primary hover:shadow-sm transition-all duration-200"
                  >
                    <Image
                      src="/static/zapier-apps.svg"
                      alt="Zapier Apps"
                      width={380}
                      height={36}
                      className="w-auto h-5 opacity-80"
                      loading="lazy"
                    />
                  </Link>
                  <Link
                    href="https://marketplace.stripe.com/apps/pimms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-brand-primary hover:shadow-sm transition-all duration-200"
                  >
                    <Image
                      src="/static/stripe-apps.svg"
                      alt="Stripe Apps"
                      width={380}
                      height={36}
                      className="w-auto h-5 opacity-80"
                      loading="lazy"
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
