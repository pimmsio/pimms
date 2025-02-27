import { WaitlistForm } from "@/components/waitlist-form";
import VideoSlide from "@/components/VideoSlide";
import Header from "@/components/header";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Offer } from "@/components/offer";
import { generateLandingMetadata } from "@/lib/utils";

const lkey = "youtube";
export async function generateMetadata({ params }: MetadataProps) {
  return generateLandingMetadata({ params, lkey });
}

export default function Youtube() {
  const tkey = `landing.${lkey}`;
  return (
    <div className="min-h-screen bg-background text-foreground w-11/12 mx-auto">
      <Header tkey={tkey} />
      <Hero tkey={tkey} />
      <WaitlistForm tkey={tkey} type={lkey} />
      <VideoSlide />
      <Problem tkey={tkey} />
      <Offer tkey={tkey} />
    </div>
  );
}
