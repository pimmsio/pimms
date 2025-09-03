import { useTranslations } from "next-intl";
import Link from "next/link";
import { Check } from "lucide-react";
import { APP_URL } from "../../app/constants";
import { Button } from "@/components/ui/button";

interface FeatureItem {
  text: string;
  excluded?: boolean;
}

const renderFeatureList = (features: (string | FeatureItem)[], checkColor: string = "text-success") => {
  return features.map((feature, i) => {
    const isExcluded = typeof feature === "object" && feature.excluded;
    const featureText = typeof feature === "object" ? feature.text : feature;
    return (
      <li key={i} className="flex items-start gap-3 py-1">
        <Check className={`w-4 h-4 ${checkColor} flex-shrink-0 mt-0.5`} />
        <span className="text-sm text-foreground leading-relaxed font-medium">{featureText}</span>
      </li>
    );
  });
};

export const SystemeIoStarterCard = ({
  title = "Starter",
  subtitle = "Perfect for solo Systeme.io funnel builders",
  price = "59€",
  cta = "Get Starter Plan",
  href = "/api/pay?id=5kAeWJ8Q2f0O1e8dQS",
  features = []
}: {
  title?: string;
  subtitle?: string;
  price?: string;
  cta?: string;
  href?: string;
  features?: string[];
}) => {
  const defaultFeatures = [
    "200 smart links /month",
    "Unlimited click tracking",
    "Full conversion tracking",
    "Systeme.io webhook integration",
    "3 custom domains",
    "3 team members",
    "6 months of data retention",
    "1 month priority support"
  ];

  const finalFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="bg-white rounded-2xl outline outline-border h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6 sm:p-8 flex flex-col gap-8">
        <div className="text-left flex flex-col gap-1">
          <h3 className="text-xl font-semibold leading-tight text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[30ch]">{subtitle}</p>
        </div>

        <div className="text-left flex flex-col gap-0">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold leading-tight text-foreground">{price}</span>
            <span className="text-lg text-muted-foreground">HT</span>
          </div>
          <p className="text-muted-foreground text-sm">One-time payment, no subscription</p>
        </div>

        <Button size="lg" className="w-full" asChild>
          <Link href={href}>{cta}</Link>
        </Button>
      </div>

      <div className="bg-zinc-50 rounded-b-2xl flex-1 border-t border-primary/20 p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Essential Funnel Tracking
        </p>
        <ul className="space-y-3">{renderFeatureList(finalFeatures, "text-primary")}</ul>
      </div>
    </div>
  );
};

export const SystemeIoProCard = ({
  title = "Pro",
  subtitle = "For serious Systeme.io funnel optimizers",
  price = "99€",
  cta = "Unlock lifetime access",
  href = "/api/pay?id=9B66oG2VvcYq3STaGmc7u07",
  features = []
}: {
  title?: string;
  subtitle?: string;
  price?: string;
  cta?: string;
  href?: string;
  features?: string[];
}) => {
  const defaultFeatures = [
    "600 links /month",
    "Sales tracking up to 30k€ /month",
    "Stripe payments integration",
    "A/B testing",
    "Webhooks",
    "5 team members",
    "12 months of data",
    "3 months priority support included"
  ];

  const finalFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="bg-white rounded-2xl outline-1 outline-brand-primary h-full shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-6 sm:p-8 flex flex-col gap-8">
        <div className="text-left flex flex-col gap-1">
          <h3 className="text-xl font-semibold leading-tight text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[30ch]">{subtitle}</p>
        </div>

        <div className="text-left flex flex-col gap-0">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold leading-tight text-foreground">{price}</span>
            <span className="text-lg text-muted-foreground">HT</span>
          </div>
          <p className="text-muted-foreground text-sm">One-time payment, no subscription</p>
        </div>

        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-brand-secondary to-brand-primary hover:opacity-90"
          asChild
        >
          <Link href={href}>{cta}</Link>
        </Button>
      </div>

      <div className="bg-zinc-50 rounded-b-2xl flex-1 border-t border-brand-primary/20 p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Everything in Starter, Plus:
        </p>
        <ul className="space-y-3">{renderFeatureList(finalFeatures, "text-brand-primary")}</ul>
      </div>
    </div>
  );
};
