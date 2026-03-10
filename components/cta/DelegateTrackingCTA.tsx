"use client";

import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Check } from "@/components/icons/custom-icons";

export default function DelegateTrackingCTA({
  title = "Let us handle your tracking",
  description = "Privacy-first, no third-party cookies, GDPR-compliant by default. Our team sets up your tracking in under 48 hours.",
  buttonText = "Delegate my tracking",
  features
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  features?: string[];
}) {
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

  const defaultFeatures = [
    "Script installation & verification",
    "Stripe / Shopify revenue tracking",
    "Form & booking tool integrations",
    "UTM templates & conventions setup"
  ];

  const featureList = features ?? defaultFeatures;

  return (
    <div className="rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-200 p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <ul className="space-y-2">
            {featureList.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <Button
            size="lg"
            className="w-full md:w-auto min-w-[200px] rounded-full shadow-sm"
            data-cal-link="alexandre-sarfati/30-minutes-demo"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
