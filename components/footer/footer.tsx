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

const linkClass = "text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200";

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
            {/* Logo and description */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
              <Logo />
              <p className="text-gray-500 leading-relaxed max-w-sm text-sm">{t("footer.description")}</p>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/pimmsio/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Follow us on GitHub"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                    <GithubIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Follow us on LinkedIn"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                    <LinkedInIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/getpimms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Follow us on Instagram"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center transition-colors duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                    <InstagramIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-4">
                {t("footer.category.usecases")}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/tracking")} className={linkClass}>
                    {t("footer.usecases.tracking")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/landing-page-tracking")} className={linkClass}>
                    {t("footer.usecases.landing-page")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/linkedin-tracker")} className={linkClass}>
                    {t("footer.usecases.linkedin")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/youtube")} className={linkClass}>
                    {t("footer.usecases.youtube")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/systemeio")} className={linkClass}>
                    {t("footer.usecases.systemeio")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Integrations */}
            <div>
              <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-4">
                {t("footer.category.integrations")}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/stripe")} className={linkClass}>
                    Stripe
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/calcom")} className={linkClass}>
                    Cal.com
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/calendly")} className={linkClass}>
                    Calendly
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/brevo")} className={linkClass}>
                    Brevo
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/tally")} className={linkClass}>
                    Tally
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/webflow")} className={linkClass}>
                    Webflow
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/framer")} className={linkClass}>
                    Framer
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/elementor")} className={linkClass}>
                    Elementor
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/podia")} className={linkClass}>
                    Podia
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/iclosed")} className={linkClass}>
                    iClosed
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-4">
                {t("footer.category.resources")}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/category/guides")} className={linkClass}>
                    {t("footer.resources.guides")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/category/tutorials")} className={linkClass}>
                    {t("footer.resources.tutorials")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/category/digital-marketing")} className={linkClass}>
                    {t("footer.resources.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://pim.ms/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {t("footer.resources.api")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://pim.ms/sdk-ts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {t("footer.resources.sdk-ts")}
                  </Link>
                </li>
              </ul>

              <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-4 mt-8">
                {t("footer.category.freetools")}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={getCanonicalLink(locale, "/freetools/site-checker")} className={linkClass}>
                    {t("footer.freetools.site-checker")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company + Legal */}
            <div>
              <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-4">
                {t("footer.category.company")}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/pricing")} className={linkClass}>
                    {t("footer.company.pricing")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/landings/contact-sales")} className={linkClass}>
                    {t("footer.company.contact-sales")}
                  </Link>
                </li>
              </ul>

              <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-4 mt-8">
                {t("footer.category.legal")}
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/terms")} className={linkClass}>
                    {t("footer.nav.terms")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/imprint")} className={linkClass}>
                    {t("footer.nav.imprint")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/privacy")} className={linkClass}>
                    {t("footer.nav.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href={getCanonicalLink(locale, "/articles/abuse")} className={linkClass}>
                    {t("footer.nav.report")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Compare — separate row, multi-column */}
          <div className="mt-10 pt-10 border-t border-gray-200 mb-16">
            <h3 className="text-gray-900 font-semibold text-xs uppercase tracking-wider mb-5">
              {t("footer.category.compare")}
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-2.5">
              <li>
                <Link
                  href={getCanonicalLink(
                    locale,
                    "/articles/bitly-vs-pimms-what-founders-really-need-beyond-click-tracking"
                  )}
                  className={linkClass}
                >
                  {t("footer.alternatives.bitly")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/dubco-alternatives-comparison-2025")}
                  className={linkClass}
                >
                  {t("footer.alternatives.dubco")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/rebrandly-alternatives-comparison-2025")}
                  className={linkClass}
                >
                  {t("footer.alternatives.rebrandly")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/short-io-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.short-io")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/linktree-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.linktree")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/tinyurl-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.tinyurl")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/switchy-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.switchy")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/pixelme-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.pixelme")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/blink-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.blink")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/sniply-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.sniply")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/pretty-links-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.prettylinks")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/cuttly-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.cuttly")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/tly-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.tly")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/replug-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.replug")}
                </Link>
              </li>
              <li>
                <Link
                  href={getCanonicalLink(locale, "/articles/taapit-vs-pimms-comparison-2026")}
                  className={linkClass}
                >
                  {t("footer.alternatives.taapit")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">{t("footer.copyright")}</p>
                {showRef && (
                  <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                    The PIMMS team builds powerful, privacy-conscious marketing tools — helping anyone grow online with
                    smart links and QR codes. &apos;QR Code&apos; is a registered trademark of DENSO WAVE INCORPORATED.
                    This project is based on <DubRef /> open-source software licensed under the AGPL.{" "}
                    <Link
                      href="https://github.com/pimmsio/getpimms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
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
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-400 transition-colors duration-200"
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
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-400 transition-colors duration-200"
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
