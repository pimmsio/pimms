import pick from "lodash.pick";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { fetchFrames } from "@/lib/qr-codes/fetchFrames";
import { QrContainer as QrContainerSimple } from "@/components/qr-codes/simple/qr-container";
import { DEFAULT_FRAME_HOME } from "../../../../../components/qr-codes/frame-choices";
import { FrameChoicesMetadata } from "../../../../../components/react-qr";
import { QrCodesCustomization } from "../../../../../components/types";

export async function generateStaticParams() {
  return [
    { slug: "products/qr-codes" },
    { slug: "products/qr-codes/linkedin" },
    { slug: "products/google-reviews-card" },
  ];
}

export async function generateMetadata({ params }: any) {
  const { locale: loc, slug: sl } = await params;
  const locale = loc || "en";
  // unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);
  const slug = decodeURIComponent(sl);

  let baseFrames;
  switch (slug) {
    default:
      // case "products/qr-codes":
      baseFrames = DEFAULT_FRAME_HOME;
      break;
    // case "products/qr-codes/linkedin":
    //   baseFrames = FRAME_CHOICES_LINKEDIN;
    //   break;
    // case "products/google-reviews-card":
    //   baseFrames = FRAME_CHOICES_GOOGLE_CARD;
    //   break;
  }

  let frames:
    | Record<string, FrameChoicesMetadata<QrCodesCustomization>[]>
    | undefined = undefined;

  try {
    frames = await fetchFrames(baseFrames, locale);
  } catch (e) {
    console.error(e);
  }

  return {
    frames,
    messages,
    slug,
    revalidate: 86400, // Revalidate once every day (86400 seconds)
  };
}

export default async function QRCodeGenerator({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { frames, messages, slug } = await generateMetadata({
    params,
  });

  const id = decodeURIComponent(slug) || "products/qr-codes";

  let container;
  switch (id) {
    default:
    case "products/qr-codes/linkedin":
    case "products/qr-codes":
      container = <QrContainerSimple id={id} frames={frames} />;
      break;
  }

  return (
    <NextIntlClientProvider
      messages={pick(messages, ["generate", "faqs", "slides"])}
    >
      {container}
    </NextIntlClientProvider>
  );
}
