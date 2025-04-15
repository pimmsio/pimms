"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { APP_URL } from "../../app/constants";
import Link from "next/link";

export default function CtaLink({}: { tkey: string }) {
  const tcommon = useTranslations("landing.common");
  return (
    <Link href={`${APP_URL}/register`} className="hidden md:block">
      <Button
        variant="link"
        className="text-sm md:text-base font-bold hidden md:block cursor-pointer tracking-tight"
      >
        {tcommon("cta.link")}
      </Button>
    </Link>
  );
}
