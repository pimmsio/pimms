"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Chrome, CircleCheck, CircleX, CreditCard, Wallet, Youtube } from "@/components/icons/custom-icons";
import { useTranslations } from "next-intl";
import React from "react";
import Logo from "../logo";
import { NeonGradientCard } from "../magicui/neon-gradient-card";

type ConversionFlipCardProps = {
  failures?: string[];
  successes?: string[];
  className?: string;
  /** CSS animation duration value, e.g. "15s" */
  duration?: string;
};

/**
 * Animated status card that travels vertically within its container.
 * When the card's center crosses the container's vertical midpoint,
 * it flips from a red X state (fail) to a green Check state (success)
 * and the text switches accordingly.
 */
export default function ConversionFlipCard({
  failures,
  successes,
  className,
  duration = "20s"
}: ConversionFlipCardProps) {
  const t = useTranslations("landing.conversion");
  const cardGap = "gap-3";
  const defaultFailures = [
    t("fail.paypal_failed"),
    t("fail.youtube_abandoned"),
    t("fail.signup_abandoned"),
    t("fail.appointment_cancelled"),
    t("fail.training_subscription_failed"),
    t("fail.magnet_lead_lost")
  ];
  const defaultSuccesses = [
    t("success.payment_completed"),
    t("success.youtube_success"),
    t("success.signup_completed"),
    t("success.appointment_scheduled"),
    t("success.training_subscription_success"),
    t("success.magnet_lead_captured")
  ];
  const timeLabels = [
    t("time.just_now"),
    t("time.1m"),
    t("time.2m"),
    t("time.5m"),
    t("time.8m"),
    t("time.12m"),
    t("time.20m")
  ];

  function StatusCard({ type, text, time }: { type: "fail" | "success"; text: string; time: string }) {
    const isSuccess = type === "success";
    const providerIcon = getProviderIcon(text);
    return (
      <div className="mx-auto w-[94%] rounded-2xl bg-muted/40 px-4 py-3">
        <div className={cn("flex items-center justify-between space-x-1 w-full", cardGap)}>
          <div
            className={cn(
              "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background",
              isSuccess ? "text-success" : "text-error"
            )}
          >
            {isSuccess ? <CircleCheck className="h-5 w-5" /> : <CircleX className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1 w-full">
            <div className="truncate font-medium w-full text-sm">{text}</div>
            <div className="text-xs text-muted-foreground">{time}</div>
          </div>
          <div className="ml-3 hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-background">
            <div className="text-muted-foreground">{providerIcon}</div>
          </div>
        </div>
      </div>
    );
  }

  function getProviderIcon(text: string) {
    const lower = text.toLowerCase();
    if (lower.includes("youtube")) return <Youtube className="h-5 w-5" />;
    if (lower.includes("paypal")) return <Wallet className="h-5 w-5" />;
    if (lower.includes("payment")) return <CreditCard className="h-5 w-5" />;
    if (lower.includes("signup") || lower.includes("sign up") || lower.includes("sign-up"))
      return <Chrome className="h-5 w-5" />;
    return <Chrome className="h-5 w-5" />;
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex h-[380px] w-full flex-col overflow-auto rounded-2xl bg-card px-4",
        className
      )}
      data-nosnippet
      data-noindex="true"
      style={{ contain: "layout paint" } as React.CSSProperties}
    >
      <div className="relative h-1/2">
        <Marquee
          direction="vertical"
          pauseOnHover
          reverse
          className={cn("h-full [--duration:var(--speed,15s)]")}
          style={{ ["--duration" as any]: duration } as React.CSSProperties}
        >
          {(failures ?? defaultFailures)
            .flatMap((_, idx) => (failures ?? defaultFailures)[idx % (failures ?? defaultFailures).length])
            .map((text, idx) => (
              <StatusCard key={`fail-${idx}`} type="fail" text={text} time={timeLabels[idx % timeLabels.length]} />
            ))}
        </Marquee>
      </div>

      <div className="relative h-1/2">
        <Marquee
          direction="vertical"
          reverse
          pauseOnHover
          className={cn("h-full [--duration:var(--speed,15s)]")}
          style={{ ["--duration" as any]: duration } as React.CSSProperties}
        >
          {(successes ?? defaultSuccesses)
            .map((_, idx) => (idx + 2) % (successes ?? defaultSuccesses).length)
            .flatMap((idx) => (successes ?? defaultSuccesses)[idx % (successes ?? defaultSuccesses).length])
            .map((text, idx) => (
              <StatusCard key={`ok-${idx}`} type="success" text={text} time={timeLabels[idx % timeLabels.length]} />
            ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2">
        <NeonGradientCard
          borderRadius={20}
          neonColors={{ firstColor: "#6bfbce90", secondColor: "#1ec19890" }}
          className="relative flex w-full items-center justify-center rounded-xl"
        >
          <Logo className="absolute inset-0 w-16 xl:w-16 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-[0px]" />
        </NeonGradientCard>
      </div>
    </div>
  );
}
