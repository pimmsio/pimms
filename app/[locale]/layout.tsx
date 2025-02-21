import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import BaseLayout from "@/components/LocaleLayout";
import "../globals.css";
import { use } from "react";

type MetadataProps = {
  params: Promise<{ locale: "en" | "fr" }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return constructMetadata({
    title: t("home.title"),
    description: t("home.description"),
    image: t("home.image"),
  });
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "fr" }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = use(params);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
