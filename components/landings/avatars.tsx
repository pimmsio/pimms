import { Avatar } from "@/components/base/avatar";
import { Paragraph } from "../base/paragraph";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Avatars = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Paragraph className="text-center text-sm">
        {t.rich("hero.avatars", {
          counter: (chunks) => <span className="text-[#08272E]">{chunks}</span>,
          linkedin: () => (
            <Image
              src="/static/linkedin.svg"
              alt="LinkedIn"
              className="w-16 inline-block ml-1 mb-0.5"
              width={800}
              height={195}
            />
          ),
        })}
      </Paragraph>
      <div className="flex -space-x-2 overflow-hidden">
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4E03AQGayq0O22-_Fw/profile-displayphoto-shrink_100_100/B4EZRovgymGwAU-/0/1736924073640?e=1747872000&v=beta&t=N_bGf_q-xUFZM1NRQJMPL7OW0apQm_rR3ExPSLaJT6s"
          alt="Mathieu Visière"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4D03AQF-vSGHgXopBA/profile-displayphoto-shrink_100_100/B4DZTRI9pqHYAU-/0/1738675576002?e=1747872000&v=beta&t=yMp1E-aA1ExH047TRX9s0BvZISZwv5RB0qDzIy5j0RA"
          alt="Damien LLADO"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D5603AQH6Fzldj_IWZQ/profile-displayphoto-shrink_400_400/B56ZU9YwKOHsAg-/0/1740491654292?e=1748476800&v=beta&t=D742ekUBEl6pVKZLgkdw_nwvFAZ4BfG-rzOsGQgDzWc"
          alt="Gabriel Jarrosson"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4E03AQFdJCLtt2k82g/profile-displayphoto-shrink_100_100/B4EZSEiVZxHAAU-/0/1737390381124?e=1747872000&v=beta&t=Qa-V22BWgOmJU1AE0iMAvHX4jVIzOIahjvdRuPpoMGk"
          alt="Mathieu Dos Santos"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4D03AQFSuyeSk_Drcg/profile-displayphoto-shrink_100_100/B4DZVaytAkHIAY-/0/1740984996251?e=1747872000&v=beta&t=Ar2FcVzxmN4xR-fbKxcoBFCRtw45nwSyMdFsVDYad98"
          alt="Mathieu Dacheux"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4E03AQGaGFtbTpBWNw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721894724291?e=1747872000&v=beta&t=ngFGw1n97tBJCaghvCPyu9e9t_ytWk0xNUXjmSeJGXg"
          alt="Florent Thurin"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4E03AQHq46e5Mj5A0A/profile-displayphoto-shrink_400_400/B4EZWwVwDTGYBI-/0/1742420248481?e=1747872000&v=beta&t=uYStLFGB312Jy3_4sJVlcgF5uhVwYwTL4xhtz6w85EM"
          alt="Alexandre Sarfati"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4E03AQF6Iz78jRaRYA/profile-displayphoto-shrink_800_800/B4EZWmhtt.GYAc-/0/1742255611118?e=1748476800&v=beta&t=N8ouqOgDhtL_YLFvwJIcTmJA_48hBo4GQIS-c7EG79s"
          alt="Ronan Jaffré"
        />
        <Avatar
          src="https://media.licdn.com/dms/image/v2/D4D03AQEzE2XS9bvu8Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714066067579?e=1748476800&v=beta&t=MYfnUnmDcYLNJXQhwFmHJZxt8PRCxBn4s9D6hyKhZZU"
          alt="Jean Castets"
        />
      </div>
    </div>
  );
};
