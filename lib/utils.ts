import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { PageMetadata } from "@/lib/mdx";
import { twMerge } from "tailwind-merge";
import { AUTHORS, BLOG_CATEGORIES, BLOG_TAGS, THUMBNAIL, WEB_URL } from "@/app/constants";
import { getTranslations } from "next-intl/server";
import { AlternateLinkDescriptor, Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { pathnames } from "@/i18n/pathnames";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCanonicalLinkWithDomain = (locale: string, pathname: string, domain: string) => {
  return `${domain}${getCanonicalLink(locale, pathname)}`;
};

export const getCanonicalLink = (locale: string, pathname: string) => {
  if (pathname === "/") {
    return locale === "en" ? "/" : `/${locale}`;
  }

  try {
    const langPath = pathnames[pathname];

    if (!langPath) {
      console.log(pathname);
    }

    if (!langPath[locale]) {
      return langPath["en"];
    }

    return locale === "en" ? langPath[locale] : `/${locale}${langPath[locale]}`;
  } catch {
    console.error("Failed to get canonical link", pathname, locale);
    return "";
  }
};

export const getFullLink = (path: string) => {
  return `${WEB_URL}${path}`.replace(/\/$/, "");
};

export async function generateLandingMetadata({
  params,
  pathname,
  lkey
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
        // Only add French if the content actually exists in French (different from English path)
        ...(langPath["fr"] &&
          langPath["fr"] !== langPath["en"] && {
            fr: getFullLink(`/fr${langPath["fr"]}`)
          })
      }
    }
  });
}

export async function generateAuthorMetadata({
  params,
  slug
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
        // Only add French if the content actually exists in French (different from English path)
        ...(langPath["fr"] &&
          langPath["fr"] !== langPath["en"] && {
            fr: getFullLink(`/fr${langPath["fr"]}`)
          })
      }
    }
  });
}

export async function generateCategoryMetadata({
  params,
  slug
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
        // Only add French if the content actually exists in French (different from English path)
        ...(langPath["fr"] &&
          langPath["fr"] !== langPath["en"] && {
            fr: getFullLink(`/fr${langPath["fr"]}`)
          })
      }
    }
  });
}

export async function generatePagesMetadata({
  params,
  dir,
  slug,
  metadata
}: MetadataProps & {
  dir: string;
  slug: string;
  metadata: PageMetadata;
}) {
  const locale = (await params).locale;

  const pathname = `/${dir}/${slug}`;
  const langPath = pathnames[pathname];
  const canonical = getCanonicalLink(locale, pathname);

  const { updatedAt, publishedAt, image: metadataImage, title, summary, author } = metadata;

  const authorName = author ? AUTHORS.find((a) => a.slug === author)?.name : undefined;

  const image = metadataImage
    ? metadataImage
    : `${WEB_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(summary)}`;

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
        // Only add French if the content actually exists in French (different from English path)
        ...(langPath["fr"] &&
          langPath["fr"] !== langPath["en"] && {
            fr: getFullLink(`/fr${langPath["fr"]}`)
          })
      }
    },
    publishedTime: publishedAt,
    modifiedTime: updatedAt,
    type: "article"
  });
}

export function constructMetadata({
  title,
  description,
  image = THUMBNAIL,
  icons = {
    icon: "/favicon.ico",
    apple: "/apple-icon.png"
  },
  noIndex = false,
  alternates,
  publishedTime,
  modifiedTime,
  type,
  author
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
    languages?: Languages<string | URL | AlternateLinkDescriptor[] | null> | undefined;
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
          url: image
        }
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }) // ✅ Ajouté ici
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
      // creator: "@handle" si tu veux l'ajouter aussi
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    }),
    alternates,
    ...(author && { other: { author } }) // ✅ Balise classique <meta name="author">
  };
}

// Tag utility functions
export function getTagBySlug(slug: string, locale: "en" | "fr"): { key: string; slug: string; label: string } | null {
  // Find tag by slug in the specified locale
  for (const [key, value] of Object.entries(BLOG_TAGS)) {
    if (value[locale].slug === slug) {
      return {
        key,
        slug: value[locale].slug,
        label: value[locale].label
      };
    }
  }
  return null;
}

export function getTagLabel(tagKey: string, locale: "en" | "fr"): string {
  const tag = BLOG_TAGS[tagKey];
  return tag ? tag[locale].label : tagKey;
}

export function getTagSlug(tagKey: string, locale: "en" | "fr"): string {
  const tag = BLOG_TAGS[tagKey];
  return tag ? tag[locale].slug : tagKey;
}

export async function generateTagMetadata({
  params,
  slug
}: MetadataProps & {
  slug: string;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "blog" });

  // Get tag by slug in current locale
  const tag = getTagBySlug(slug, locale);

  if (!tag) {
    return;
  }

  // Get translations from messages
  const title = t(`tags.${tag.slug}.title`);
  const summary = t(`tags.${tag.slug}.description`);

  // Construct canonical URL manually for dynamic tag routes
  const canonicalPath = locale === "en" 
    ? `/articles/tag/${tag.slug}` 
    : `/fr/articles/tag/${tag.slug}`;

  return constructMetadata({
    title,
    description: summary,
    image: THUMBNAIL,
    alternates: {
      canonical: getFullLink(canonicalPath),
      languages: {
        en: getFullLink(`/articles/tag/${BLOG_TAGS[tag.key].en.slug}`),
        fr: getFullLink(`/fr/articles/tag/${BLOG_TAGS[tag.key].fr.slug}`)
      }
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getRelevantTagsForCategory(category: string, _locale: "en" | "fr"): string[] {
  const tagMapping: Record<string, string[]> = {
    "digital-marketing": ["utm-parameters"],
    guides: [
      "stripe",
      "calcom",
      "framer",
      "webflow",
      "calendly",
      "zapier",
      "iclosed",
      "elementor",
      "wordpress",
      "tally",
      "systemeio",
      "no-code",
      "developers",
      "payment-tracking",
      "booking-tracking",
      "form-tracking",
      "website-builder"
    ],
    overview: ["utm-parameters", "stripe", "calcom", "framer", "webflow", "no-code", "developers"]
  };

  return tagMapping[category] || [];
}

export function getTagCanonicalLink(tagKey: string, locale: "en" | "fr"): string {
  const tag = BLOG_TAGS[tagKey];
  if (!tag) return "";
  
  const slug = tag[locale].slug;
  return locale === "en" ? `/articles/tag/${slug}` : `/fr/articles/tag/${slug}`;
}
