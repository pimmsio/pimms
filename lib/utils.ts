import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { PageMetadata } from "@/lib/mdx";
import { twMerge } from "tailwind-merge";
import { AUTHORS, BLOG_CATEGORIES, THUMBNAIL, WEB_URL } from "@/app/constants";
import { getTranslations } from "next-intl/server";
import {
  AlternateLinkDescriptor,
  Languages,
} from "next/dist/lib/metadata/types/alternative-urls-types";
import { pathnames } from "@/i18n/pathnames";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCanonicalLink = (locale: string, pathname: string) => {
  if (pathname === "/") {
    return locale === "en" ? "/" : `/${locale}`;
  }

  const langPath = pathnames[pathname];

  if (!langPath) {
    console.log(pathname);
  }

  if (!langPath[locale]) {
    return langPath["en"];
  }

  return locale === "en" ? langPath[locale] : `/${locale}${langPath[locale]}`;
};

export const getFullLink = (path: string) => {
  return `${WEB_URL}${path}`.replace(/\/$/, "");
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
        ...(langPath["fr"] && {
          fr: getFullLink(`/fr${langPath["fr"]}`),
        }),
      },
    },
  });
}

export async function generateAuthorMetadata({
  params,
  slug,
}: MetadataProps & {
  slug: string;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const author = AUTHORS.find((author) => author.slug === slug);

  if (!author) {
    return;
  }

  const title = t(`authors.${slug}.title`);
  const summary = t(`authors.${slug}.description`);
  const metadataImage = t(`authors.${slug}.image`);

  const pathname = `/articles/author/${slug}`;
  const langPath = pathnames[pathname];
  const canonical = getCanonicalLink(locale, pathname);

  return constructMetadata({
    title,
    description: summary,
    image: metadataImage,
    author: author.name,
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(langPath["en"]),
        ...(langPath["fr"] && {
          fr: getFullLink(`/fr${langPath["fr"]}`),
        }),
      },
    },
  });
}

export async function generateCategoryMetadata({
  params,
  slug,
}: MetadataProps & {
  slug: string;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const category = BLOG_CATEGORIES.find((category) => category === slug);

  if (!category) {
    return;
  }

  const title = t(`articles.${slug}.title`);
  const summary = t(`articles.${slug}.description`);
  const metadataImage = t(`articles.${slug}.image`);

  const pathname = `/articles/category/${slug}`;
  const langPath = pathnames[pathname];
  const canonical = getCanonicalLink(locale, pathname);

  return constructMetadata({
    title,
    description: summary,
    image: metadataImage,
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(langPath["en"]),
        ...(langPath["fr"] && {
          fr: getFullLink(`/fr${langPath["fr"]}`),
        }),
      },
    },
  });
}

export async function generatePagesMetadata({
  params,
  dir,
  slug,
  metadata,
}: MetadataProps & {
  dir: string;
  slug: string;
  metadata: PageMetadata;
}) {
  const locale = (await params).locale;

  const pathname = `/${dir}/${slug}`;
  const langPath = pathnames[pathname];
  const canonical = getCanonicalLink(locale, pathname);

  const {
    updatedAt,
    publishedAt,
    image: metadataImage,
    title,
    summary,
    author,
  } = metadata;

  const authorName = author
    ? AUTHORS.find((a) => a.slug === author)?.name
    : undefined;

  const image = metadataImage
    ? metadataImage
    : `${WEB_URL}/api/og?title=${encodeURIComponent(
        title
      )}&description=${encodeURIComponent(summary)}`;

  console.log(pathname, langPath, canonical, image);

  return constructMetadata({
    title,
    description: summary,
    image,
    author: authorName,
    alternates: {
      canonical: getFullLink(canonical),
      languages: {
        en: getFullLink(langPath["en"]),
        ...(langPath["fr"] && {
          fr: getFullLink(`/fr${langPath["fr"]}`),
        }),
      },
    },
    publishedTime: publishedAt,
    modifiedTime: updatedAt,
    type: "article",
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
  publishedTime,
  modifiedTime,
  type,
  author,
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
  publishedTime?: string;
  modifiedTime?: string;
  type?: OpenGraphType;
  author?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: type || "article",
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }), // ✅ Ajouté ici
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      // creator: "@handle" si tu veux l'ajouter aussi
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates,
    ...(author && { other: { author } }), // ✅ Balise classique <meta name="author">
  };
}
