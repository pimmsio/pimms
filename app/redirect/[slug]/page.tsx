// app/redirect/[slug]/page.tsx
"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RedirectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  useEffect(() => {
    const hardcodedSlug = "a8b7c6d5";

    // YouTube video details
    const youtubeVideoId = "V9PVRfjEBTI?si=xlxAEUoVZesHI0Wb";
    const youtubeWebUrl = `https://youtu.be/${youtubeVideoId}`;
    const youtubeDeepLink = `vnd.youtube://${youtubeVideoId}`;

    if (slug !== hardcodedSlug) {
      router.replace("/");
      return;
    }

    // Attempt to open the YouTube app via the deep link.
    // If this fails (i.e. if the app is not installed), fallback to the web URL.
    window.location.href = youtubeDeepLink;

    // After a short delay, force navigation to the YouTube web URL.
    const timer = setTimeout(() => {
      window.location.href = youtubeWebUrl;
    }, 500);

    return () => clearTimeout(timer);
  }, [slug, router]);

  return null;
}
