import { Toaster } from "@/components/ui/toaster";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("general");

  return (
    <>
      {children}
      <footer className="w-full py-6 bg-[#08272E] text-white text-center text-sm">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Solutions</h3>
          <Link className="underline" href="/solutions/youtube">
            {t("footer.solutions.youtube")}
          </Link>
          <Link className="underline" href="/">
            {t("footer.solutions.site")}
          </Link>
        </div>

        <div className="mt-4">{t("footer.copyright")}</div>
      </footer>

      <Toaster />
    </>
  );
}
