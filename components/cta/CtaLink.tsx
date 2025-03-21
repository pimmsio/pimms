"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { APP_URL } from "../../app/constants";
import Link from "next/link";

export default function CtaLink({ tkey }: { tkey: string }) {
  const t = useTranslations(tkey);
  return (
    <Link href={`${APP_URL}/register`}>
      <Button
        variant="link"
        className="text-sm md:text-base font-bold hidden md:block cursor-pointer"
      >
        {t("cta.button")}
      </Button>
    </Link>
  );
}
