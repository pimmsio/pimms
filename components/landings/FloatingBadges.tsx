"use client";
import { useTranslations } from "next-intl";

const StarIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const FloatingBadges = () => {
  const t = useTranslations("landing.badges");
  return (
    <>
      {/* Desktop: 5-Star Reviews Badge - Positioned near CTA */}
      <div
        className="hidden lg:block absolute top-[360px] right-4 xl:right-8 z-10"
        style={{
          animation: "floatingBadgeDelay 3.5s ease-in-out infinite"
        }}
      >
        <div className="relative group">
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-400 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

          {/* Badge content */}
          <div className="relative bg-gradient-to-br from-white rounded-3xl px-6 py-4 shadow-2xl shadow-yellow-200/50 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-500 drop-shadow-sm"
                    style={{
                      animation: "pulseSubtle 2s ease-in-out infinite",
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>

              {/* Text */}
              <div className="text-xs text-gray-600 font-medium">{t("reviews")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Reviews Badge - Below content */}
      <div className="lg:hidden flex justify-center">
        {/* 5-Star Reviews Badge */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-500" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
