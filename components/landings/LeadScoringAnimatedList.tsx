"use client";

import Image from "next/image";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type LeadSource = "shopify" | "calcom" | "brevo" | "stripe" | "zapier" | "tally" | "wordpress" | "webflow";

export type LeadItem = {
  id: string | number;
  source: LeadSource;
  name: string;
  email: string;
  score: number; // 0-100
  time: string; // e.g. "1m ago"
};

const sourceLogo: Record<LeadSource, string> = {
  shopify: "/static/logos/integrations/shopify.svg",
  calcom: "/static/logos/integrations/calcom.jpeg",
  brevo: "/static/logos/integrations/brevo.jpeg",
  stripe: "/static/logos/integrations/stripe.svg",
  zapier: "/static/logos/integrations/zapier.jpeg",
  tally: "/static/logos/integrations/tally.svg",
  wordpress: "/static/logos/integrations/wordpress.svg",
  webflow: "/static/logos/integrations/webflow.svg"
};

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  // Keep first name (until first dot or plus) and mask the rest except domain TLD
  const first = user.split(/[.+]/)[0] ?? user;
  const maskedUser = `${first}${user.length > first.length ? ".***" : ""}`;
  const parts = domain.split(".");
  if (parts.length < 2) return `${maskedUser}@${domain}`;
  const tld = parts.pop();
  const domainName = parts.join(".");
  const maskedDomain = `${domainName.slice(0, 2)}***.${tld}`;
  return `${maskedUser}@${maskedDomain}`;
}

function useScoreLabel() {
  const t = useTranslations("landing.lead_list.score");
  return (score: number): { label: string; emoji: string; color: string; bg: string } => {
    if (score >= 80) return { label: t("very_warm"), emoji: "🔥", color: "text-red-600", bg: "bg-red-50 ring-red-200" };
    if (score >= 60)
      return { label: t("warm"), emoji: "🔥", color: "text-orange-600", bg: "bg-orange-50 ring-orange-200" };
    if (score >= 40)
      return { label: t("lukewarm"), emoji: "🔥", color: "text-amber-600", bg: "bg-amber-50 ring-amber-200" };
    return { label: t("cold"), emoji: "❄️", color: "text-sky-600", bg: "bg-sky-50 ring-sky-200" };
  };
}

function LeadCard({ item }: { item: LeadItem }) {
  const scoreLabel = useScoreLabel();
  const meta = scoreLabel(item.score);
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[640px] cursor-pointer overflow-hidden md:rounded-l-2xl md:border-l border-y border-gray-200 bg-white px-3 py-2 sm:px-4 sm:py-3",
        "transition-all duration-200 ease-in-out hover:scale-[101%]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-50 ring-1 ring-gray-200">
          <Image
            src={sourceLogo[item.source]}
            alt={item.source}
            width={28}
            height={28}
            className="object-contain grayscale"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <figcaption className="flex items-center gap-2 whitespace-pre text-sm sm:text-base font-semibold text-gray-900">
            <span className="truncate">{item.name}</span>
          </figcaption>
          <div className="flex flex-col gap-0.5 text-[11px] text-gray-500">
            <span className="truncate w-full">{maskEmail(item.email)}</span>
            <span>{item.time}</span>
          </div>
        </div>
        <div className="flex items-end sm:items-center flex-col sm:flex-row gap-1.5">
          <div className="flex items-center rounded-full px-2.5 ring-1 ring-gray-200 shrink-0" style={{}}>
            <span className="text-sm font-semibold text-gray-900">{item.score} %</span>
          </div>
          <div
            className={cn("flex items-center gap-1 rounded-full px-2 py-1 ring-1 shrink-0", meta.bg)}
            aria-label={meta.label}
          >
            <span className="text-sm" aria-hidden>
              {meta.emoji}
            </span>
            <span className={cn("text-sm font-semibold", meta.color)}>{meta.label}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

const demoLeads: LeadItem[] = [
  {
    id: 1,
    source: "shopify",
    name: "landing.lead_list.items.shopify_new_leads",
    email: "alexandre.dupont@example.com",
    score: 12,
    time: "landing.lead_list.time.1m"
  },
  {
    id: 2,
    source: "calcom",
    name: "landing.lead_list.items.meeting_booked",
    email: "marie.claire@company.io",
    score: 81,
    time: "landing.lead_list.time.1m"
  },
  {
    id: 3,
    source: "brevo",
    name: "landing.lead_list.items.newsletter_subscription",
    email: "thomas.leroy@acme.co",
    score: 56,
    time: "landing.lead_list.time.1m"
  },
  {
    id: 4,
    source: "stripe",
    name: "landing.lead_list.items.payment_received",
    email: "luc.martin@client.fr",
    score: 74,
    time: "landing.lead_list.time.2m"
  },
  {
    id: 5,
    source: "zapier",
    name: "landing.lead_list.items.form_submission",
    email: "emma.bernard@startup.dev",
    score: 63,
    time: "landing.lead_list.time.3m"
  },
  {
    id: 6,
    source: "tally",
    name: "landing.lead_list.items.survey_response",
    email: "paul.robin@brand.com",
    score: 48,
    time: "landing.lead_list.time.5m"
  },
  {
    id: 7,
    source: "wordpress",
    name: "landing.lead_list.items.blog_comment",
    email: "sophie.durand@press.fr",
    score: 41,
    time: "landing.lead_list.time.7m"
  },
  {
    id: 8,
    source: "webflow",
    name: "landing.lead_list.items.signup_landing",
    email: "antoine.roy@studio.io",
    score: 68,
    time: "landing.lead_list.time.8m"
  }
];

export default function LeadScoringAnimatedList({
  leads = demoLeads,
  className
}: {
  leads?: LeadItem[];
  className?: string;
}) {
  const t = useTranslations();
  return (
    <div
      className={cn("relative flex h-[360px] w-full flex-col overflow-hidden", className)}
      data-nosnippet
      aria-live="off"
      aria-busy="false"
    >
      <AnimatedList delay={2600}>
        {leads.map((lead) => (
          <LeadCard key={lead.id} item={{ ...lead, name: t(lead.name as any), time: t(lead.time as any) }} />
        ))}
      </AnimatedList>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white" />
    </div>
  );
}
