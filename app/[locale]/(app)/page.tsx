import VideoSlide from "@/components/landings/VideoSlide";
import Header from "@/components/landings/header";
import { Hero } from "@/components/landings/hero";
import { Problem } from "@/components/landings/problem";
import { FreeOffer } from "@/components/landings/free-offer";
import { LifetimeOffer } from "@/components/landings/lifetime-offer";
import WorkWith from "@/components/landings/WorkWith";
import CtaButtonBig from "@/components/cta/CtaButtonBig";

const lkey = "home";
const tkey = `landing.${lkey}`;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground w-11/12 mx-auto">
      <Header tkey={tkey} />
      <Hero tkey={tkey} />
      <div className="relative top-[-20px]">
        <CtaButtonBig tkey={tkey} type="sales" showFree className="py-2" />
      </div>
      <VideoSlide />
      <Problem tkey={tkey} />
      <WorkWith tkey={tkey} />
      <LifetimeOffer tkey={tkey} />
      <FreeOffer tkey={tkey} type="sales" />
    </div>
  );
}
