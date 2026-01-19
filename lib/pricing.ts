export type PlanFeature = {
  id?: string;
  text: string;
  tooltip?: {
    title: string;
    cta: string;
    href: string;
  };
};

export type BillingPeriod = "monthly" | "yearly" | "lifetime";
export type PaidPlanId = "pro" | "business";
export type PlanId = "free" | PaidPlanId;

type PlanPrice = {
  monthly?: number;
  yearly?: number;
  lifetime?: number;
  /**
   * Stripe price IDs, in the same order as the periods defined above.
   * Note: these are copied from `apps/web/packages/utils/src/constants/pricing.tsx`
   */
  ids?: string[];
};

export type Plan = {
  name: "Free" | "Pro" | "Business";
  price: PlanPrice;
  limits: {
    links: number;
    clicks: number;
    sales: number;
    domains: number;
    tags: number;
    folders: number;
    users: number;
    ai: number;
    api: number;
    utmTemplates: number;
    utmParameters: number;
    bulkLinks: number;
    retention: string;
  };
  featureTitle?: string;
  features?: PlanFeature[];
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0,
      ids: [""]
    },
    limits: {
      links: 5,
      clicks: 200,
      sales: 0,
      domains: 1,
      tags: 5,
      folders: 0,
      users: 1,
      ai: 10,
      api: 60,
      utmTemplates: 3,
      utmParameters: 10,
      bulkLinks: 0,
      retention: "30-day"
    }
  },
  {
    name: "Pro",
    price: {
      monthly: 19,
      lifetime: 129,
      // Pro: [monthly, lifetime]
      ids: ["price_1SQBYHBN5sOoOmBUxCM8iTy8", "price_1SQBYHBN5sOoOmBUs2reZG2N"]
    },
    limits: {
      links: 500,
      clicks: 3_000,
      sales: 30_000_00,
      domains: 3,
      tags: 100,
      folders: 1,
      users: 5,
      ai: 1000,
      api: 3000,
      utmTemplates: 10,
      utmParameters: 100,
      bulkLinks: 150,
      retention: "1-year"
    },
    featureTitle: "Everything in Free, plus:",
    features: [
      { id: "links", text: "50 links /month" },
      { id: "sales", text: "Sales tracking up to 30k€ /month" },
      { id: "stripe", text: "Stripe payments integration" },
      { id: "testing", text: "A/B testing" },
      { id: "webhooks", text: "Webhooks & API" },
      { id: "users", text: "5 team members" },
      { id: "retention", text: "12 months of data" },
      { id: "support", text: "3 months priority support included" }
    ]
  },
  {
    name: "Business",
    price: {
      monthly: 69,
      yearly: 690,
      // Business: [monthly, yearly]
      ids: ["price_1SQBqRBN5sOoOmBUMXE1IUA8", "price_1SQBqRBN5sOoOmBUkOtzh1lV"]
    },
    limits: {
      links: 2000,
      clicks: 20_000,
      sales: 30_000_00,
      domains: 10,
      tags: 100,
      folders: 5,
      users: 10,
      ai: 10000,
      api: 10000,
      utmTemplates: 200,
      utmParameters: 200,
      bulkLinks: 200,
      retention: "2-year"
    },
    featureTitle: "Everything in Pro and more:",
    features: [
      { id: "links", text: "200 links /month" },
      { id: "tracking", text: "20k events tracked /month" },
      { id: "sales", text: "Sales tracking" },
      { id: "users", text: "Unlimited team members" },
      { id: "domains", text: "10 custom domains" },
      { id: "bulk", text: "Bulk link operations" },
      { id: "retention", text: "More than a year of data" },
      { id: "support", text: "Priority support" }
    ]
  }
];

export const FREE_PLAN = PLANS.find((plan) => plan.name === "Free")!;
export const PRO_PLAN = PLANS.find((plan) => plan.name === "Pro")!;
export const BUSINESS_PLAN = PLANS.find((plan) => plan.name === "Business")!;

export const SELF_SERVE_PAID_PLANS = PLANS.filter((p) => ["Pro", "Business"].includes(p.name));

export function getPlanFromPriceId(priceId: string) {
  return PLANS.find((plan) => plan.price.ids?.includes(priceId)) || null;
}

export function getPlanDetails(plan: PaidPlanId) {
  return SELF_SERVE_PAID_PLANS.find((p) => p.name.toLowerCase() === plan)!;
}

export function getCurrentPlan(plan: string) {
  return PLANS.find((p) => p.name.toLowerCase() === plan) || FREE_PLAN;
}

export function getPriceIdForCheckout({
  plan,
  period
}: {
  plan: PaidPlanId;
  period: Exclude<BillingPeriod, "yearly"> | "yearly";
}) {
  const p = getPlanDetails(plan);

  if (plan === "pro") {
    if (period === "monthly") return p.price.ids?.[0] ?? null;
    if (period === "lifetime") return p.price.ids?.[1] ?? null;
    return null;
  }

  // business
  if (period === "monthly") return p.price.ids?.[0] ?? null;
  if (period === "yearly") return p.price.ids?.[1] ?? null;
  return null;
}
