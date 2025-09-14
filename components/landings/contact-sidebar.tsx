"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/magicui/blur-fade";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Calendar } from "@/components/icons/custom-icons";

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
    <div className={`${className}`}>
      <BlurFade direction="left" inView>
        <div
          className="relative bg-gradient-to-br from-primary/10 to-blue-50 p-6 rounded-2xl border border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          data-cal-link="alexandre-sarfati/30-minutes-demo?pimms_id=1"
        >
          {/* Profile Section */}
          <div className="flex items-start gap-4 mb-4">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                <img
                  src="https://assets.pimms.io/alexandre-sarfati.jpeg"
                  alt="Photo de profil d'Alexandre Sarfati"
                  width="64"
                  height="64"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Cal.com Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 border-3 border-primary/30 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary/80">{t("question")}</p>
            <p className="text-white font-semibold">{t("action")}</p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-50/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </BlurFade>
    </div>
  );
}
