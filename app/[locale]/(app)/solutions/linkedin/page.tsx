import VideoSlide from "@/components/landings/VideoSlide";
import Header from "@/components/landings/header";
import { Hero } from "@/components/landings/hero";
import { FreeOffer } from "@/components/landings/free-offer";
import { LifetimeOffer } from "@/components/landings/lifetime-offer";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";
import { Avatars } from "@/components/landings/avatars";
import { TheNeed } from "@/components/landings/the-need";
import { Problem } from "@/components/landings/problem";

const lkey = "linkedin";
const tkey = `landing.${lkey}`;

export default function Home() {
  const t = useTranslations(tkey);

  return (
    <>
      <div className="min-h-screen bg-background-secondary text-foreground w-11/12 mx-auto">
        <Header tkey={tkey} />
        <Hero tkey={tkey} />
        <CtaButtonBig
          type="sales"
          className="py-3 top-[-12px]"
          value={t.rich("form.button", {
            fast: () => <Zap size={32} fill="currentColor" />,
          })}
        />
        <Avatars tkey={tkey} />
        <VideoSlide tkey={tkey} />
      </div>

      <div className="bg-zinc-100 w-full py-16">
        <TheNeed tkey={tkey} />
        <div className="w-11/12 mx-auto">
          <LifetimeOffer tkey={tkey} />
          <Problem tkey={tkey} />
        </div>
      </div>

      <div className="bg-background-secondary text-foreground w-11/12 mx-auto">
        <FreeOffer tkey={tkey} type="sales" />
      </div>
    </>
  );
}
