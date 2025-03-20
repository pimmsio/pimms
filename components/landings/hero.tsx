"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { H1 } from "@/components/base/h1";
import { HeroSection } from "@/components/base/hero-section";
import { Paragraph } from "@/components/base/paragraph";
import { List, ListItem } from "@/components/base/list";
import { Avatar } from "@/components/base/avatar";
export const Hero = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <HeroSection>
      <H1>
        {t.rich("hero.title", {
          youtube: () => (
            <Image
              src="/static/youtube.svg"
              alt="YouTube"
              className="w-32 md:w-48 lg:w-60 inline-block mx-0.5 md:mx-1.5 mb-1"
              width={800}
              height={178}
            />
          ),
        })}
      </H1>

      <div className="max-w-sm md:max-w-lg flex flex-col items-start justify-left mx-auto px-4">
        <Paragraph className="mt-6 text-[#08272E] font-semibold text-pretty">
          {t("hero.subtitle")}
        </Paragraph>
        <List className="mt-4 gap-4">
          <ListItem icon={<Check className="w-6 h-6" />}>
            <Paragraph>{t("hero.benefits.1")}</Paragraph>
          </ListItem>
          <ListItem icon={<Check className="w-6 h-6" />}>
            <Paragraph>{t("hero.benefits.2")}</Paragraph>
          </ListItem>
          <ListItem icon={<Check className="w-6 h-6" />}>
            <Paragraph>{t("hero.benefits.3")}</Paragraph>
          </ListItem>
        </List>
      </div>

      <div className="flex flex-col items-center justify-center gap-1.5 mt-8">
        <Paragraph>
          {t.rich("hero.avatars", {
            counter: (chunks) => (
              <span className="text-[#08272E]">{chunks}</span>
            ),
            linkedin: () => (
              <Image
                src="/static/linkedin.svg"
                alt="LinkedIn"
                className="w-20 inline-block ml-1 mb-1"
                width={800}
                height={195}
              />
            ),
          })}
        </Paragraph>
        <div className="flex -space-x-2 overflow-hidden">
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4E03AQGayq0O22-_Fw/profile-displayphoto-shrink_100_100/B4EZRovgymGwAU-/0/1736924073640?e=1747872000&v=beta&t=N_bGf_q-xUFZM1NRQJMPL7OW0apQm_rR3ExPSLaJT6s"
            alt=""
          />
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4D03AQF-vSGHgXopBA/profile-displayphoto-shrink_100_100/B4DZTRI9pqHYAU-/0/1738675576002?e=1747872000&v=beta&t=yMp1E-aA1ExH047TRX9s0BvZISZwv5RB0qDzIy5j0RA"
            alt=""
          />
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4E03AQFdJCLtt2k82g/profile-displayphoto-shrink_100_100/B4EZSEiVZxHAAU-/0/1737390381124?e=1747872000&v=beta&t=Qa-V22BWgOmJU1AE0iMAvHX4jVIzOIahjvdRuPpoMGk"
            alt=""
          />
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4E03AQFdJCLtt2k82g/profile-displayphoto-shrink_100_100/B4EZSEiVZxHAAU-/0/1737390381124?e=1747872000&v=beta&t=Qa-V22BWgOmJU1AE0iMAvHX4jVIzOIahjvdRuPpoMGk"
            alt=""
          />
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4D03AQFSuyeSk_Drcg/profile-displayphoto-shrink_100_100/B4DZVaytAkHIAY-/0/1740984996251?e=1747872000&v=beta&t=Ar2FcVzxmN4xR-fbKxcoBFCRtw45nwSyMdFsVDYad98"
            alt=""
          />
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4E03AQGaGFtbTpBWNw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721894724291?e=1747872000&v=beta&t=ngFGw1n97tBJCaghvCPyu9e9t_ytWk0xNUXjmSeJGXg"
            alt=""
          />
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D4E03AQHq46e5Mj5A0A/profile-displayphoto-shrink_400_400/B4EZWwVwDTGYBI-/0/1742420248481?e=1747872000&v=beta&t=uYStLFGB312Jy3_4sJVlcgF5uhVwYwTL4xhtz6w85EM"
            alt="Alexandre Sarfati"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <Avatar
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>
    </HeroSection>
  );
};
