import { useLocale } from "next-intl";
import Image from "next/image";

export default function Logo() {
  const locale = useLocale();
  const logoWidth = locale === "fr" ? "w-24" : "w-24";
  return (
    <div className="flex items-start flex-col space-y-2 z-10">
      <Image
        src="/static/logo.svg"
        alt="pim.ms"
        className={logoWidth}
        width={1000}
        height={179}
      />
    </div>
  );
}
