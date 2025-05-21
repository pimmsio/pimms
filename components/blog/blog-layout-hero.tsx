"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { H1 } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { Paragraph } from "@/components/base/paragraph";
import { BLOG_CATEGORIES } from "../../app/constants";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function BlogLayoutHero() {
  const t = useTranslations("blog");
  const { slug } = useParams() as { slug?: string };
  const locale = useLocale();

  const allCategories = BLOG_CATEGORIES.filter(
    (category) => category !== "legal"
  );

  const category = slug && allCategories.includes(slug) ? slug : "overview";

  return (
    <>
      <HeroSection>
        <H1>{t(`category.${category}.title`)}</H1>
        <div className="max-w-sm md:max-w-lg flex flex-col items-center justify-left mx-auto px-4">
          <Paragraph className="mt-4">
            {t(`category.${category}.description`)}
          </Paragraph>
        </div>
        <nav className="mt-6 hidden w-fit mx-auto items-center space-x-2 rounded-full border-[6px] border-neutral-100 bg-white p-2 md:flex">
          <CategoryLink
            title={t("category.overview.title")}
            href={getCanonicalLink(locale, "/articles")}
            active={!slug}
          />
          {allCategories.map((category) => (
            <CategoryLink
              key={category}
              title={t(`category.${category}.title`)}
              href={getCanonicalLink(locale, `/articles/category/${category}`)}
              active={category === slug}
            />
          ))}
          {/* <CategoryLink title="Customer Stories" href="/customers" /> */}
          {/* <CategoryLink title="Changelog" href="/changelog" /> */}
        </nav>
      </HeroSection>
      {/* <Popover
        content={
          <div className="w-full p-4">
            <CategoryLink
              title="Overview"
              href="/blog"
              active={!slug}
              mobile
              setOpenPopover={setOpenPopover}
            />
            {allCategories.map((category) => (
              <CategoryLink
                key={category?.slug}
                title={category?.title}
                href={`/articles/category/${category?.slug}`}
                active={category?.slug === slug}
                mobile
                setOpenPopover={setOpenPopover}
              />
            ))}
            <CategoryLink title="Customer Stories" href="/customers" mobile />
            <CategoryLink title="Product updates" href="/changelog" mobile />
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        mobileOnly
      >
        <button
          onClick={() => {
            setOpenPopover(!openPopover);
          }}
          className="flex w-full items-center space-x-2 border-t border-gray-200 px-2.5 py-4 text-sm"
        >
          <List size={16} />
          <p>Categories</p>
        </button>
      </Popover> */}
    </>
  );
}

const CategoryLink = ({
  title,
  href,
  active,
  mobile,
  setOpenPopover,
}: {
  title: string;
  href: string;
  active?: boolean;
  mobile?: boolean;
  setOpenPopover?: (open: boolean) => void;
}) => {
  if (mobile) {
    return (
      <Link
        href={href}
        {...(setOpenPopover && {
          onClick: () => setOpenPopover(false),
        })}
        className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <p className={twMerge("text-sm", active && "font-bold")}>{title}</p>
        {active && <Check size={16} className="text-gray-600" />}
      </Link>
    );
  }
  return (
    <Link href={href} className="relative z-10">
      <div
        className={twMerge(
          "rounded-full px-4 py-2 text-sm text-gray-600 transition-all",
          active
            ? "text-white font-bold"
            : "hover:bg-gray-100 active:bg-gray-200"
        )}
      >
        {title}
      </div>
      {active && (
        <motion.div
          layoutId="indicator"
          className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800"
          style={{ zIndex: -1 }}
        />
      )}
    </Link>
  );
};
