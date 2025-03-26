import VideoSlide from "@/components/landings/VideoSlide";
import Header from "@/components/landings/header";
import { Hero } from "@/components/landings/hero";
import { Problem } from "@/components/landings/problem";
import { FreeOffer } from "@/components/landings/free-offer";
import { LifetimeOffer } from "@/components/landings/lifetime-offer";
import WorkWith from "@/components/landings/WorkWith";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import MainTestimonial from "@/components/landings/main-testimonial";
import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";
import { Avatars } from "@/components/landings/avatars";

const lkey = "home";
const tkey = `landing.${lkey}`;

export default function Home() {
  const t = useTranslations(tkey);

  return (
    <div className="min-h-screen bg-background-secondary text-foreground w-11/12 mx-auto">
      <Header tkey={tkey} />
      <Hero tkey={tkey} />
      <CtaButtonBig
        type="sales"
        className="py-3 top-[-26px]"
        value={t.rich("form.button", {
          fast: () => <Zap size={32} fill="currentColor" />,
        })}
      />
      <Avatars tkey={tkey} />
      <VideoSlide tkey={tkey} />
      <MainTestimonial tkey={tkey} />
      <Problem tkey={tkey} />
      <WorkWith tkey={tkey} />
      <LifetimeOffer tkey={tkey} />
      <FreeOffer tkey={tkey} type="sales" />
    </div>
  );
}
