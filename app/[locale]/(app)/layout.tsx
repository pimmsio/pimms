import { Toaster } from "@/components/ui/toaster";
import { useTranslations } from "next-intl";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("general");

  return (
    <>
      {children}
      <footer className="w-full py-6 bg-[#08272E] text-white text-center text-sm">
        {t("footer.copyright")}
      </footer>

      <Toaster />
    </>
  );
}
