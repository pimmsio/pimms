import VideoSlide from "@/components/landings/VideoSlide";
import Header from "@/components/landings/header";
import { Hero } from "@/components/landings/hero";
import { generateLandingMetadata } from "@/lib/utils";
import { FreeOffer } from "@/components/landings/free-offer";
import { LifetimeOffer } from "@/components/landings/lifetime-offer";
import CtaButtonBig from "@/components/cta/CtaButtonBig";
import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";
import { Avatars } from "@/components/landings/avatars";
import { Problem } from "@/components/landings/problem";
import { TopFeatures } from "@/components/landings/top-features";
import FAQ from "@/components/faq";

const lkey = "amazon";
export async function generateMetadata({ params }: MetadataProps) {
  return generateLandingMetadata({
    params,
    lkey,
    pathname: "/solutions/amazon",
  });
}

export default function Amazon() {
  const tkey = `landing.${lkey}`;
  const fkey = `faq.${lkey}`;
  const tcommon = useTranslations("landing.common");

  return (
    <>
      <div className="min-h-screen bg-background-secondary text-foreground w-11/12 mx-auto">
        <Header tkey={tkey} />
        <Avatars tkey={tkey} />
        <Hero tkey={tkey} showBenefits />
        <CtaButtonBig
          type="sales"
          className="py-3 top-[-12px]"
          value={tcommon.rich("cta.main", {
            fast: () => <Zap size={32} fill="currentColor" />,
            large: (chunks) => (
              <span className="hidden md:block">{chunks}</span>
            ),
          })}
        />
        <div className="text-xs text-muted-foreground text-center font-semibold">
          {tcommon("cta.bottom")}
        </div>
        <VideoSlide tkey={tkey} />
      </div>

      <div className="bg-zinc-100 w-full py-16">
        <Problem tkey={tkey} />
      </div>

      <div className="bg-background-secondary text-foreground mx-auto my-8">
        <TopFeatures tkey={tkey} showConversions={false} />
        <div className="w-11/12 mx-auto">
          <CtaButtonBig
            type="sales"
            className="mt-12 mb-4"
            value={tcommon.rich("cta.main", {
              fast: () => <Zap size={32} fill="currentColor" />,
              large: (chunks) => (
                <span className="hidden md:block">{chunks}</span>
              ),
            })}
          />
          <div className="text-xs text-muted-foreground text-center font-semibold">
            {tcommon("cta.bottom")}
          </div>
        </div>
      </div>

      <div className="bg-zinc-100 w-full py-16">
        <LifetimeOffer tkey={tkey} />
      </div>

      <div className="bg-background-secondary text-foreground">
        <FAQ fkey={fkey} defaultFaqs={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </div>

      <div className="bg-background-secondary text-foreground w-11/12 mx-auto">
        <FreeOffer tkey={tkey} type="sales" />
      </div>
    </>
  );
}
