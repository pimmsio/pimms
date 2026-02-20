"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

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

export default function RootProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PimmsAnalytics
          domainsConfig={{
            outbound: "tally.so,cal.com"
          }}
        />
        <VercelAnalytics />
        <SpeedInsights />
      </Suspense>
    </>
  );
}
