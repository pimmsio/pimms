import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { EmailFooter } from "../components/footer";

const PIMMS_LOGO = "https://pimms.io/static/logo.svg";
const GUIDE_IMAGE = "https://assets.pimms.io/tracking-plan.webp";

interface TrackingGuideEmailProps {
  guideUrl: string;
  locale?: string;
}

export function TrackingGuideEmail({
  guideUrl = "https://pim.ms/LzUZtZq",
  locale = "en",
}: TrackingGuideEmailProps) {
  const isEn = locale === "en";

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          {isEn
            ? "Your free tracking plan is ready"
            : "Votre plan de tracking gratuit est prêt"}
        </Preview>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded-3xl border border-solid border-neutral-100 px-10 py-5">
            <Section className="my-8">
              <Img
                src={PIMMS_LOGO}
                height="14"
                alt="PIMMS"
                className="my-0"
              />
            </Section>

            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-black">
              {isEn
                ? "Your tracking plan is here 🎯"
                : "Votre plan de tracking est arrivé 🎯"}
            </Heading>

            <Text className="text-sm leading-6 text-neutral-600">
              {isEn
                ? "Thanks for downloading the complete tracking plan. This is the exact framework used to set up real tracking systems behind real revenue."
                : "Merci d'avoir téléchargé le plan de tracking complet. C'est le framework exact utilisé pour mettre en place de vrais systèmes de tracking derrière de vrais revenus."}
            </Text>

            <Section className="my-6 text-center">
              <Img
                src={GUIDE_IMAGE}
                alt={
                  isEn
                    ? "The Complete Tracking Plan"
                    : "Le plan de tracking complet"
                }
                width="400"
                className="mx-auto rounded-xl"
              />
            </Section>

            <Text className="text-sm leading-6 text-neutral-600">
              {isEn
                ? "Inside, you'll find:"
                : "À l'intérieur, vous trouverez :"}
            </Text>

            <Text className="text-sm leading-6 text-neutral-600">
              {isEn ? (
                <>
                  • The 5 growth layers every business needs to track{"\n"}
                  • The golden rule of UTM architecture{"\n"}
                  • How to go from traffic noise to structured revenue data{"\n"}
                  • Free Google Sheet templates (SaaS + LinkedIn Creator)
                </>
              ) : (
                <>
                  • Les 5 couches de croissance à suivre{"\n"}
                  • La règle d&apos;or de l&apos;architecture UTM{"\n"}
                  • Comment transformer le trafic en données de revenus structurées{"\n"}
                  • Templates Google Sheet gratuits (SaaS + LinkedIn Creator)
                </>
              )}
            </Text>

            <Section className="my-8 text-center">
              <Link
                href={guideUrl}
                className="rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white no-underline"
              >
                {isEn ? "Read the guide" : "Lire le guide"}
              </Link>
            </Section>

            <Text className="text-sm leading-6 text-neutral-600">
              {isEn ? (
                <>
                  <strong>Bonus:</strong> Get 10% off PIMMS with code{" "}
                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-mono">
                    TRACKINGPLAN
                  </code>
                </>
              ) : (
                <>
                  <strong>Bonus :</strong> Obtenez 10% de réduction sur PIMMS
                  avec le code{" "}
                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-mono">
                    TRACKINGPLAN
                  </code>
                </>
              )}
            </Text>

            <Text className="mt-6 text-sm leading-6 text-neutral-500">
              Alexandre Sarfati
              <br />
              {isEn ? "Founder, PIMMS" : "Fondateur, PIMMS"}
            </Text>

            <EmailFooter email="alexandre@pimms.io" marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default TrackingGuideEmail;
