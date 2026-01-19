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
  shopify: "/static/symbols/integrations/shopify.svg",
  calcom: "/static/symbols/integrations/calcom.svg",
  brevo: "/static/symbols/integrations/brevo.svg",
  stripe: "/static/symbols/integrations/stripe.svg",
  zapier: "/static/symbols/integrations/zapier.jpeg",
  tally: "/static/symbols/integrations/tally.svg",
  wordpress: "/static/symbols/integrations/wordpress.svg",
  webflow: "/static/symbols/integrations/webflow.svg"
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
    if (score >= 80)
      return {
        label: t("very_warm"),
        emoji: "🔥",
        color: "text-brand-primary",
        bg: "bg-muted/60"
      };
    if (score >= 50)
      return {
        label: t("warm"),
        emoji: "🔥",
        color: "text-brand-primary",
        bg: "bg-muted/60"
      };
    return {
      label: t("cold"),
      emoji: "❄️",
      color: "text-brand-primary",
      bg: "bg-muted/60"
    };
  };
}

function LeadCard({ item }: { item: LeadItem }) {
  const scoreLabel = useScoreLabel();
  const meta = scoreLabel(item.score);
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[640px] cursor-pointer overflow-hidden md:rounded-l-2xl bg-card/70 px-3 py-2 sm:px-4 sm:py-3",
        "transition-colors duration-200"
      )}
      data-noindex="true"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-muted/70">
          {sourceLogo[item.source].endsWith(".svg") ? (
            <img
              src={sourceLogo[item.source]}
              alt={item.source}
              width={28}
              height={28}
              className="object-contain grayscale"
              style={{ maxWidth: "28px", maxHeight: "28px" }}
              loading="lazy"
            />
          ) : (
            <Image
              src={sourceLogo[item.source]}
              alt={item.source}
              width={28}
              height={28}
              className="object-contain grayscale"
              sizes="28px"
              style={{ maxWidth: "28px", maxHeight: "28px" }}
              loading="lazy"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 whitespace-pre text-sm sm:text-base font-semibold text-foreground">
            <span className="truncate">{item.name}</span>
          </div>
          <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground">
            <span className="truncate w-full">{maskEmail(item.email)}</span>
            <span>{item.time}</span>
          </div>
        </div>
        <div className="flex items-end sm:items-center flex-col sm:flex-row gap-1.5">
          <div className="flex items-center rounded-full px-2.5 sm:py-1 bg-muted/70 shrink-0">
            <span className="text-sm font-semibold text-foreground">{item.score} %</span>
          </div>
          <div className={cn("flex items-center gap-1 rounded-full px-2 py-1 shrink-0", meta.bg)}>
            <span className="text-sm" aria-hidden>
              {meta.emoji}
            </span>
            <span className={cn("text-sm font-semibold", meta.color)}>{meta.label}</span>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Lead from {item.source}: {item.name} with {item.score}% score
      </figcaption>
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
    </div>
  );
}
