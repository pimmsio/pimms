"use client";

import { Analytics as PimmsAnalytics } from "@getpimms/analytics/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PosthogPageview } from "@/components/posthog-pageview copy";

if (typeof window !== "undefined" && !!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    // api_host: "/_proxy/posthog/ingest",
    api_host: "https://eu.i.posthog.com",
    // ui_host: "https://eu.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture
  });
}

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PosthogPageview />
      {children}
      <PimmsAnalytics />
      <Analytics />
      <SpeedInsights />
    </PostHogProvider>
  );
}
