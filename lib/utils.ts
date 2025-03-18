import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { THUMBNAIL, WEB_URL } from "@/app/constants";
import { getTranslations } from "next-intl/server";
import {
  AlternateLinkDescriptor,
  Languages,
} from "next/dist/lib/metadata/types/alternative-urls-types";
import { pathnames } from "../i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCanonicalLink = (locale: string, pathname: string) => {
  if (pathname === "/") {
    return locale === "en" ? "/" : `/${locale}`;
  }

  const langPath = pathnames[pathname];
  return locale === "en" ? langPath[locale] : `/${locale}${langPath[locale]}`;
};

const getFullLink = (path: string) => {
  return path === "/"
    ? `${WEB_URL}${path}`
    : `${WEB_URL}${path}`.replace(/\/$/, "");
};

export async function generateLandingMetadata({
  params,
  pathname,
  lkey,
}: MetadataProps & { lkey: string; pathname: string }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const langPath = pathnames[pathname];

  const canonical = getCanonicalLink(locale, pathname);

  return constructMetadata({
    title: t(`${lkey}.title`),
    description: t(`${lkey}.description`),
    image: t(`${lkey}.image`),
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(langPath["en"]),
        fr: getFullLink(`/fr${langPath["fr"]}`),
      },
    },
  });
}

export function constructMetadata({
  title,
  description,
  image = THUMBNAIL,
  icons = {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  noIndex = false,
  alternates,
}: {
  title: string;
  description: string;
  image?: string;
  icons?:
    | string
    | {
        icon: string;
        apple: string;
      };
  noIndex?: boolean;
  alternates: {
    canonical: string;
    languages?:
      | Languages<string | URL | AlternateLinkDescriptor[] | null>
      | undefined;
  };
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [image],
    //   creator: "@",
    // },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates,
  };
}
