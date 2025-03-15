import { WaitlistForm } from "@/components/waitlist-form";
import VideoSlide from "@/components/VideoSlide";
import Header from "@/components/header";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { FreeOffer } from "@/components/free-offer";
import { LifetimeOffer } from "@/components/lifetime-offer";

const lkey = "home";
const tkey = `landing.${lkey}`;

export default function Home() {
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
