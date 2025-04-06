"use client";
import { Laptop, Tag, Tablet, SmartphoneCharging } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Label } from "../base/label";

const getFlagUrl = (country: string) =>
  `https://flag.vercel.app/m/${country}.svg`;

const getFaviconUrl = (url: string) => {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
};

export const FilterFeature = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  const utmLabel = (
    <Label className="text-xs text-left capitalize font-light bg-zinc-100 text-[#08272E] border-1 border-zinc-200 ml-[-4px] mr-[-4px] px-1 rounded-sm">
      UTM
    </Label>
  );

  const ROWS = [
    [
      {
        icon: (
          <img alt="France" src={getFlagUrl("FR")} className="rounded-md" />
        ),
        label: t("filter_feature.country"),
        value: "France",
      },
      {
        icon: <img alt="CH" src={getFlagUrl("CH")} className="rounded-md" />,
        label: t("filter_feature.city"),
        value: "Zurich",
      },
      {
        icon: <img alt="US" src={getFlagUrl("US")} className="rounded-md" />,
        label: t("filter_feature.city"),
        value: "New York",
      },
      {
        icon: <img alt="FR" src={getFlagUrl("FR")} className="rounded-md" />,
        label: t("filter_feature.city"),
        value: "Lyon",
      },
      {
        icon: <img alt="AU" src={getFlagUrl("AU")} className="rounded-md" />,
        label: t("filter_feature.city"),
        value: "Melbourne",
      },
    ],
    [
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://linkedin.com")}
            alt="LinkedIn"
          />
        ),
        label: t("filter_feature.referral"),
        value: "LinkedIn",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://youtube.com")}
            alt="Youtube"
          />
        ),
        label: t("filter_feature.referral"),
        value: "Youtube",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://tally.so")}
            alt="Tally"
          />
        ),
        label: t("filter_feature.referral"),
        value: "Tally",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://calendly.com")}
            alt="Calendly"
          />
        ),
        label: t("filter_feature.referral"),
        value: "Calendly",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://lemlist.com")}
            alt="Lemlist"
          />
        ),
        label: t("filter_feature.referral"),
        value: "Lemlist",
      },
    ],
    [
      {
        icon: utmLabel,
        label: t("filter_feature.utm.campaign"),
        value: t("filter_feature.utm.linkedin_launch"),
      },
      {
        icon: utmLabel,
        label: t("filter_feature.utm.source"),
        value: t("filter_feature.utm.newsletter_april"),
      },
      {
        icon: utmLabel,
        label: t("filter_feature.utm.medium"),
        value: t("filter_feature.utm.google_promo"),
      },
      {
        icon: utmLabel,
        label: t("filter_feature.utm.campaign"),
        value: t("filter_feature.utm.calendly_partner"),
      },
      {
        icon: utmLabel,
        label: t("filter_feature.utm.medium"),
        value: t("filter_feature.utm.webinar_jean"),
      },
    ],
    [
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.launch"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.onboarding"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.retargeting"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.emailing"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.sales"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.demo"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.paid_ads"),
      },
      {
        icon: <Tag size={12} />,
        label: t("filter_feature.tag.title"),
        value: t("filter_feature.tag.beta"),
      },
    ],
    [
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://arc.net")}
            alt="Arc"
          />
        ),
        label: t("filter_feature.browser"),
        value: "Arc",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://chrome.com")}
            alt="Chrome"
          />
        ),
        label: t("filter_feature.browser"),
        value: "Chrome",
      },
      {
        icon: <SmartphoneCharging size={18} />,
        label: t("filter_feature.device"),
        value: "Mobile",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://www.apple.com/safari")}
            alt="Safari"
          />
        ),
        label: t("filter_feature.browser"),
        value: "Safari",
      },
      {
        icon: <Tablet size={18} />,
        label: t("filter_feature.device"),
        value: "Tablet",
      },
      {
        icon: (
          <img
            style={{ width: 16, height: 16 }}
            className="rounded-md"
            src={getFaviconUrl("https://firefox.com")}
            alt="Firefox"
          />
        ),
        label: t("filter_feature.browser"),
        value: "Firefox",
      },
      {
        icon: <Laptop size={18} />,
        label: t("filter_feature.device"),
        value: "Desktop",
      },
    ],
  ];

  return (
    <div className="relative [mask-image:linear-gradient(black_30%,transparent)]">
      <div className="relative [mask-image:linear-gradient(to right, transparent, black 10%, black 90%, transparent)] overflow-hidden w-full">
        <div className="flex flex-col gap-4 py-4">
          {ROWS.map((blocks, rowIndex) => (
            <InfiniteRow
              key={rowIndex}
              blocks={blocks}
              speed={getSpeed(rowIndex, blocks.length)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const getSpeed = (i: number, length: number) => {
  // Base duration on number of elements: more elements = longer loop
  const secondsPerBlock = 20;
  return `${(length / ((i % 2) + 1)) * secondsPerBlock}s`;
};

const InfiniteRow = ({
  blocks,
  speed,
}: {
  blocks: { icon: React.ReactNode; label: string; value: string }[];
  speed: string;
}) => {
  const duplicated = [...blocks, ...blocks];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex w-max whitespace-nowrap animate-scroll-loop"
        style={{ animationDuration: speed }}
      >
        {duplicated.map((block, idx) => (
          <div key={idx} className="flex gap-4 px-4 min-w-max items-center">
            <FilterBlock {...block} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FilterBlock = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex h-9 rounded-md border-[2px] border-neutral-200 text-sm leading-none text-neutral-800 [&>*]:h-full">
    <div className="flex items-center gap-2 px-2 text-neutral-500">
      <span className="shrink-0">{icon}</span>
      {label}
    </div>
    <div className="flex items-center text-neutral-500">=</div>
    <div className="flex items-center gap-2 px-2">{value}</div>
  </div>
);
