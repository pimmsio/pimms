import Image from "next/image";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

interface AvatarsProps {
  children?: ReactNode;
}

export const Avatars = async ({ children }: AvatarsProps) => {
  // Always use home avatars since they're shared across all landing pages
  const t = await getTranslations("landing.hero");

  // Static avatars array (no need for useMemo in server components)
  const avatars = [
    {
      name: t("avatars.avatar1.name"),
      image: t("avatars.avatar1.image")
    },
    {
      name: t("avatars.avatar2.name"),
      image: t("avatars.avatar2.image")
    },
    {
      name: t("avatars.avatar3.name"),
      image: t("avatars.avatar3.image")
    },
    {
      name: t("avatars.avatar4.name"),
      image: t("avatars.avatar4.image")
    },
    {
      name: t("avatars.avatar5.name"),
      image: t("avatars.avatar5.image")
    }
  ];

  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      <div className="flex items-center gap-1" data-nosnippet data-noindex="true">
        <AvatarsLaurier direction="left" />
        <div className="flex flex-col sm:flex-row items-center gap-2 select-none cursor-default">
          <div className="flex -space-x-2 overflow-hidden">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="relative w-8 h-8 rounded-full outline-3 outline-white overflow-hidden"
                style={{ zIndex: avatars.length - index }}
              >
                <Image
                  src={avatar.image}
                  alt={avatar.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                  loading="lazy"
                  priority={false}
                  quality={75}
                  unoptimized={false}
                />
              </div>
            ))}
          </div>
          {children && <div className="text-sm text-brand-primary font-semibold ml-2">{children}</div>}
        </div>
        <AvatarsLaurier direction="right" />
      </div>
    </div>
  );
};

export const AvatarsLaurier = ({ direction }: { direction: "left" | "right" }) => {
  // Use external SVG to remove ~150 lines of inline SVG + gradients from HTML
  return (
    <img
      src={`/api/static-svg/laurier-${direction}`}
      alt=""
      className={`w-6 h-10 ${direction === "left" ? "scale-x-[-1]" : ""}`}
      loading="lazy"
      aria-hidden="true"
    />
  );
};
