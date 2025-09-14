"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Lazy load analytics components for better initial bundle size
const PimmsAnalytics = dynamic(() => import("@getpimms/analytics/react").then((mod) => ({ default: mod.Analytics })), {
  ssr: false
});

const VercelAnalytics = dynamic(() => import("@vercel/analytics/next").then((mod) => ({ default: mod.Analytics })), {
  ssr: false
});

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => ({ default: mod.SpeedInsights })),
  {
    ssr: false
  }
);

const PostHogPageView = dynamic(() => import("@/components/posthog-pageview"), {
  ssr: false
});

// Initialize PostHog with lazy loading and optimized settings
if (typeof window !== "undefined" && !!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "https://eu.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    // Disable heavy features to reduce bundle size
    disable_surveys: true,
    disable_session_recording: true,
    disable_web_experiments: true,
    loaded: (posthog) => {
      // Only load essential features
      if (process.env.NODE_ENV === "development") {
        posthog.debug();
      }
    }
  });
}

export default function RootProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <PimmsAnalytics />
        <VercelAnalytics />
        <SpeedInsights />
      </Suspense>
    </PostHogProvider>
  );
}
