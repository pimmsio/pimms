"use client";

import { useTranslations } from "next-intl";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Image from "next/image";

interface ContactSidebarProps {
  className?: string;
}

export default function ContactSidebar({ className = "" }: ContactSidebarProps) {
  const t = useTranslations("landing.contact");

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "var(--color-brand-primary)" }
        }
      });
    })();
  }, []);

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div
        className="relative flex flex-row items-center bg-gradient-to-tr from-brand-primary to-brand-secondary p-6 rounded-3xl cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/30"
        data-cal-link="alexandre-sarfati/30-minutes-demo?pimms_id=1"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center gap-4 sm:gap-5">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img
                src="https://assets.pimms.io/linkedin-profile-alex.webp"
                alt="Alexandre Sarfati"
                width="80"
                height="80"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/static/symbols/integrations/calcom.svg"
                alt="Cal.com"
                width="28"
                height="28"
                className="w-6 h-6 sm:w-7 sm:h-7 scale-200"
              />
            </div>
          </div>

          {/* Spacer to push content */}
          <div className="flex-1" />
        </div>

        {/* Text Content */}
        <div className="space-y-1">
          <p className="text-sm sm:text-base font-medium text-white/95">{t("question")}</p>
          <p className="text-lg sm:text-xl font-bold text-white">{t("action")}</p>
        </div>
      </div>
    </div>
  );
}
