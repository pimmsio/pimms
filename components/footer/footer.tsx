"use client";

import { useLocale, useTranslations } from "next-intl";
import Logo from "../logo";
import Link from "next/link";
import { cn, getCanonicalLink } from "../../lib/utils";
import { InstagramIcon } from "../icons/instagram-icon";
import { LinkedInIcon } from "../icons/linkedin-icon";
import { GithubIcon } from "../icons/github-icon";
import { Paragraph } from "../base/paragraph";
import Image from "next/image";
import { DubRef } from "./dub-ref";

export const Footer = ({
  className,
  showApps = true,
  showRef = false,
}: {
  className?: string;
  showApps?: boolean;
  showRef?: boolean;
}) => {
  const locale = useLocale();

  const t = useTranslations("general");

  return (
    <div className={cn("py-10 mt-10 bg-white px-7", className)}>
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
          <Link
            aria-current="page"
            href="https://pim.ms/api"
            target="_blank"
            rel="noopener noreferrer"
            className="router-link-active router-link-exact-active"
          >
            <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
              {t("footer.resources.api")}
            </div>
          </Link>
          <Link
            aria-current="page"
            href="https://pim.ms/sdk-ts"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
              {t("footer.resources.sdk-ts")}
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
          <Link href={getCanonicalLink(locale, "/legal/imprint")} className="">
            <div className="font-medium hover:text-[#08272E] -my-1 py-1 hover:underline">
              {t("footer.nav.imprint")}
            </div>
          </Link>
          <Link href={getCanonicalLink(locale, "/legal/privacy")} className="">
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
      <div className="flex flex-col gap-8 items-start mx-auto max-w-7xl mt-8">
        {showRef && (
          <Paragraph className="text-xs!">
            The PIMMS team builds powerful, privacy-conscious marketing tools —
            helping anyone grow online with smart links and QR codes. ‘QR Code’
            is a registered trademark of DENSO WAVE INCORPORATED. This project
            is based on <DubRef /> open-source software licensed under the AGPL.{" "}
            <Link
              href="https://github.com/getpimms/pim-ms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#08272E] hover:underline"
            >
              You can view or contribute to the source code on GitHub.
            </Link>
          </Paragraph>
        )}
        {showApps && (
          <Paragraph className="text-xs! flex gap-6">
            <Link
              href="https://zapier.com/apps/pimms/integrations"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/static/zapier-apps.svg"
                alt="Zapier Apps"
                width={380}
                height={36}
                className="w-auto h-4.5"
              />
            </Link>
            <Link
              href="https://marketplace.stripe.com/apps/pimms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/static/stripe-apps.svg"
                alt="Stripe Apps"
                width={380}
                height={36}
                className="w-auto h-4.5"
              />
            </Link>
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default Footer;
