"use client";

import { ReactNode } from "react";

import PostHogPageView from "@/components/posthog-pageview";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <PostHogProvider client={posthog}>
        <PostHogPageView />
        {children}
      </PostHogProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
