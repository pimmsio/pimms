import Image from "next/image";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/magicui/blur-fade";

interface AvatarsProps {
  children?: ReactNode;
}

export const Avatars = ({ children }: AvatarsProps) => {
  // Always use home avatars since they're shared across all landing pages
  const t = useTranslations("landing.hero");

  // Get avatars from translations
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
    <BlurFade direction="up" delay={0.2} inView={false} className="flex items-center justify-center gap-3 mt-5">
      <li className="flex items-center gap-1" data-nosnippet>
        <AvatarsLaurier direction="left" />
        <div className="flex flex-col sm:flex-row items-center gap-2 select-none cursor-default">
          <div className="flex -space-x-2 overflow-hidden">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="relative w-8 h-8 rounded-full outline-3 outline-white overflow-hidden"
                style={{ zIndex: avatars.length - index }}
              >
                <Image src={avatar.image} alt={avatar.name} fill className="object-cover" sizes="32px" />
              </div>
            ))}
          </div>
          {children && <div className="text-sm text-brand-primary font-semibold ml-2">{children}</div>}
        </div>
        <AvatarsLaurier direction="right" />
      </li>
    </BlurFade>
  );
};

export const AvatarsLaurier = ({ direction }: { direction: "left" | "right" }) => {
  const uniqueId = `laurier-${direction}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width="97"
      height="166"
      viewBox="0 0 97 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`w-6 h-10 ${direction === "left" ? "scale-x-[-1]" : ""}`}
    >
      <path
        d="M62.3369 65.8905C73.2855 52.6181 85.8104 21.0356 48.3212 0.884247L62.3369 65.8905Z"
        fill={`url(#${uniqueId}_paint0_linear)`}
      />
      <path
        d="M62.7178 65.8084C47.2729 58.2266 22.8469 34.6109 48.7021 0.802185L62.7178 65.8084Z"
        fill={`url(#${uniqueId}_paint1_linear)`}
      />
      <path
        d="M62.7178 65.8084C47.2729 58.2266 22.8469 34.6109 48.7021 0.802185L62.7178 65.8084Z"
        fill={`url(#${uniqueId}_paint2_linear)`}
      />
      <path
        d="M60.4448 104.686C76.8309 99.4399 104.442 79.6422 83.7985 42.4218L60.4448 104.686Z"
        fill={`url(#${uniqueId}_paint3_linear)`}
      />
      <path
        d="M60.8097 104.823C51.9155 90.0949 44.1343 57.0224 84.1633 42.5587L60.8097 104.823Z"
        fill={`url(#${uniqueId}_paint4_linear)`}
      />
      <path
        d="M0.76416 147.5C11.4308 161 39.6642 179.9 67.2642 147.5H0.76416Z"
        fill={`url(#${uniqueId}_paint5_linear)`}
      />
      <path
        d="M0.76416 147.89C11.4308 134.39 39.6642 115.49 67.2642 147.89H0.76416Z"
        fill={`url(#${uniqueId}_paint6_linear)`}
      />
      <path
        d="M37.2304 128.187C52.7793 135.553 86.4671 139.965 96.8271 98.6834L37.2304 128.187Z"
        fill={`url(#${uniqueId}_paint7_linear)`}
      />
      <path
        d="M37.4033 128.537C40.9731 111.705 57.8903 82.2412 97 99.0326L37.4033 128.537Z"
        fill={`url(#${uniqueId}_paint8_linear)`}
      />
      <defs>
        <linearGradient
          id={`${uniqueId}_paint0_linear`}
          x1="49.9266"
          y1="-1.08543"
          x2="59.9506"
          y2="65.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#3970ff" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint1_linear`}
          x1="39.9582"
          y1="2.68742"
          x2="53.9739"
          y2="67.6937"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#3970ff" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint2_linear`}
          x1="39.9582"
          y1="2.68742"
          x2="53.9739"
          y2="67.6937"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint3_linear`}
          x1="92.3971"
          y1="45.57"
          x2="72.3838"
          y2="110.59"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint4_linear`}
          x1="75.7882"
          y1="39.4174"
          x2="52.4345"
          y2="101.682"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#3970ff" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint5_linear`}
          x1="67.2642"
          y1="147.695"
          x2="0.76416"
          y2="147.695"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#93c5fd" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint6_linear`}
          x1="67.2642"
          y1="138.945"
          x2="0.76416"
          y2="138.945"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#3970ff" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint7_linear`}
          x1="97"
          y1="113.516"
          x2="37.2304"
          y2="113.516"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient
          id={`${uniqueId}_paint8_linear`}
          x1="93.0315"
          y1="91.0163"
          x2="33.4347"
          y2="120.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2fcdfa" />
          <stop offset="1" stopColor="#3970ff" />
        </linearGradient>
      </defs>
    </svg>
  );
};
