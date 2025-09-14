"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, getCanonicalLink } from "../lib/utils";
import { useLocale } from "next-intl";

export default function Logo({ className }: { className?: string }) {
  const locale = useLocale();
  const href = getCanonicalLink(locale, "/");

  return (
    <Link href={href} className="flex items-start flex-col space-y-2 z-10">
      <Image
        src="/static/logo.svg"
        alt="pim.ms"
        className={cn("w-18 xl:w-22 mt-1", className)}
        width={72}
        height={13}
      />
    </Link>
  );
}
