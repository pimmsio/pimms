import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Footer } from "../components/footer";
import { WORDMARK } from "../../../app/constants";

export function WelcomeEmail({
  email = "alexandre@pimms.io",
}: {
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Offre exclusive : Accès en avant-première chez pim.ms</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Section className="mt-8">
              <Img src={WORDMARK} height="40" alt="pim.ms" />
            </Section>

            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-black">
              Bienvenue sur pim.ms !
            </Heading>

            <Text className="text-sm font-light leading-6 text-neutral-600">
              Alexandre vous invite à découvrir les liens directs pim.ms.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Arretez tout de suite de perdre des abonnés sur votre chaîne
              YouTube.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Chaque clic compte : finies les étapes frustrantes, vos visiteurs
              accèdent directement à vos vidéos YouTube et s&apos;abonnent.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Accès en avant-première – je vous offre 3 liens directs pour
              démarrer.
            </Text>

            <Section className="mt-6">
              <a
                href="https://app.pimms.io/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-[#dc2e65] text-white font-semibold outline outline-4 transition hover:outline-[#F0A8BF] cursor-pointer no-underline rounded-none"
              >
                🚀 Accéder au Dashboard
              </a>
            </Section>

            <Section className="mt-8">
              <Footer email={email} marketing />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default WelcomeEmail;
