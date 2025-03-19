import { WaitlistForm } from "@/components/landings/waitlist-form";
import VideoSlide from "@/components/landings/VideoSlide";
import Header from "@/components/landings/header";
import { Hero } from "@/components/landings/hero";
import { Problem } from "@/components/landings/problem";
import { generateLandingMetadata } from "@/lib/utils";
import { FreeOffer } from "@/components/free-offer";
import { LifetimeOffer } from "@/components/landings/lifetime-offer";

const lkey = "youtube";
export async function generateMetadata({ params }: MetadataProps) {
  return generateLandingMetadata({
    params,
    lkey,
    pathname: "/solutions/youtube",
  });
}

export default function Youtube() {
  const tkey = `landing.${lkey}`;
  return (
    <div className="min-h-screen bg-background text-foreground w-11/12 mx-auto">
      <Header tkey={tkey} />
      <Hero tkey={tkey} />
      <WaitlistForm tkey={tkey} type="sales" />
      <VideoSlide />
      <Problem tkey={tkey} />
      <LifetimeOffer tkey={tkey} />
      <FreeOffer tkey={tkey} />
    </div>
  );
}
