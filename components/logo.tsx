import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function Logo() {
  const t = useTranslations("general");

  const locale = useLocale();
  const logoWidth = locale === "fr" ? "w-[147px]" : "w-[136px]";
  return (
    <div className="flex items-start flex-col space-y-2 mx-auto md:mx-0">
      <Image
        src="/static/logo.svg"
        alt="pim.ms"
        className={logoWidth}
        width={256}
        height={256}
      />{" "}
      <span className="font-bold text-sm tracking-wide">
        {t("header.tagline")}
      </span>
    </div>
  );
}
