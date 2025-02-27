import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import BaseLayout from "@/components/LocaleLayout";
import "../globals.css";
import { use } from "react";
import { generateLandingMetadata } from "@/lib/utils";

export async function generateMetadata({ params }: MetadataProps) {
  return generateLandingMetadata({ params, lkey: "home" });
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
