import Image from "next/image";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

interface AvatarsProps {
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="flex flex-col items-center justify-center gap-2 mt-5 mb-3 lg:mb-0">
      <div className="flex items-center gap-1" data-nosnippet data-noindex="true">
        <AvatarsLaurier direction="left" />
        <div className="flex flex-row justify-center items-center gap-3 select-none cursor-default">
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
          <FiveStars />
        </div>
        <AvatarsLaurier direction="right" />
      </div>
    </div>
  );
};

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

export const FiveStars = () => {
  return (
    <div className="lg:hidden flex justify-center">
      <div className="relative group">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 fill-vibrant-blue text-vibrant-blue" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const AvatarsLaurier = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <img
      src="/static/laurier.svg"
      alt=""
      className="w-6 h-10"
      style={{ transform: direction === "right" ? "translateX(0)" : "translateX(0) scaleX(-1)" }}
      loading="lazy"
      aria-hidden="true"
    />
  );
};
