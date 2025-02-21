import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Footer } from "../components/footer";
import { WORDMARK } from "@/app/constants";

export function WelcomeEmail({
  email = "alexandre@pimms.io",
}: {
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Arretez de perdre des abonnés sur votre chaîne YouTube</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Section className="my-8">
              <Img src={WORDMARK} height="20" alt="pim.ms" />
            </Section>

            <Text className="text-sm font-semibold leading-6 text-neutral-600">
              Alexandre vous invite sur la plateforme de liens directs pim.ms
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Accès en avant-première – je vous offre 3 liens directs pour
              démarrer.
            </Text>

            <Section className="my-8">
              <a
                href="https://app.pimms.io/register"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-[#dc2e65] text-white font-semibold outline outline-4 transition hover:outline-[#F0A8BF] cursor-pointer no-underline rounded-none"
              >
                Accéder au dashboard
              </a>
            </Section>

            <Hr className="mx-0 mt-8mb-6 w-full border border-neutral-200" />

            <Text className="mt-4 text-sm font-semibold leading-6 text-neutral-600">
              Ma mission est de vous faire gagner des abonnés sur votre chaîne
              YouTube.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Faites moi confiance, le seul moyen efficace de promouvoir vos
              vidéos Youtube sur Linkedin est de partager nos liens directs dans
              vos posts.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Pour en savoir plus, j&apos;ai tout expliqué en vidéo sur{" "}
              <Link href="https://pim.ms/youtube">pim.ms/youtube</Link>
            </Text>

            <Hr className="mx-0 my-6 w-full border border-neutral-200" />
            <Text className="text-sm font-light leading-6 text-neutral-600">
              Je m&apos;appelle Alexandre et j&apos;ai créé PIMMS. Ceci est un
              email automatique, mais si vous répondez, je vous lirai
              directement.
            </Text>

            <Text className="text-sm font-light leading-6 text-neutral-600">
              Si vous avez des retours ou des commentaires sur notre produit,
              j&apos;adorerais le savoir. Merci par avance, Alexandre.
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default WelcomeEmail;
