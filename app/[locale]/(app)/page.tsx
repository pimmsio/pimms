import { WaitlistForm } from "@/components/waitlist-form";
import VideoSlide from "@/components/VideoSlide";
import Header from "@/components/header";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Offer } from "@/components/offer";
import WorkWith from "@/components/WorkWith";

const lkey = "home";
const tkey = `landing.${lkey}`;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground w-11/12 mx-auto">
      <Header tkey={tkey} />
      <Hero tkey={tkey} />
      <WaitlistForm tkey={tkey} type="sales" />
      <WorkWith tkey={tkey} />
      <VideoSlide />
      <Problem tkey={tkey} />
      <Offer tkey={tkey} />
    </div>
  );
}
