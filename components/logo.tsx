import Image from "next/image";
import Link from "next/link";
import { getCanonicalLink } from "../lib/utils";
import { useLocale } from "next-intl";

export default function Logo() {
  const locale = useLocale();

  return (
    <Link
      href={getCanonicalLink(locale, "/")}
      className="flex items-start flex-col space-y-2 z-10"
    >
      <Image
        src="/static/logo.svg"
        alt="pim.ms"
        className="w-20 md:w-24"
        width={1000}
        height={179}
      />
    </Link>
  );
}
