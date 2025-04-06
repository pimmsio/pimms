import Image from "next/image";
import Link from "next/link";
import { cn, getCanonicalLink } from "../lib/utils";
import { useLocale } from "next-intl";

export default function Logo({ className }: { className?: string }) {
  const locale = useLocale();

  return (
    <Link
      href={getCanonicalLink(locale, "/")}
      className="flex items-start flex-col space-y-2 z-10"
    >
      <Image
        src="/static/logo.svg"
        alt="pim.ms"
        className={cn("w-20 md:w-24", className)}
        width={1000}
        height={179}
      />
    </Link>
  );
}
