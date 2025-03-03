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
import { WORDMARK_BLACK } from "@/app/constants";

export function InviteYoutubeEmail({
  email = "alexandre@pimms.io",
}: {
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Arretez de perdre des ventes sur votre funnel d&apos;acquisition
        LinkedIn
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] border border-solid border-neutral-200 px-10 py-5">
            <Section className="my-8">
              <Img src={WORDMARK_BLACK} height="20" alt="pim.ms" />
            </Section>

            <Text className="text-sm font-semibold leading-6 text-neutral-600">
              Alexandre vous invite à rejoindre la plateforme de liens directs{" "}
              <Link href="https://pimms.io" className="text-black no-underline">
                pim.ms
              </Link>
              .
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
                className="px-5 py-2 bg-[#dc2e65] text-white font-semibold outline outline-[6px] transition hover:outline-[#F0A8BF] cursor-pointer no-underline"
              >
                Accéder au dashboard
              </a>
            </Section>

            <Hr className="mx-0 mt-8mb-6 w-full border border-neutral-200" />

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Je vais booster vos conversions grâce à un concept unique: les
              liens directs{" "}
              <Link href="https://pimms.io" className="text-black no-underline">
                pim.ms
              </Link>
              .
            </Text>

            <Text className="mt-4 text-sm font-bold leading-6 text-neutral-600">
              Comment ça marche ?
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              - Copiez collez des liens classiques (exemple:{" "}
              <Link href="#" className="text-black no-underline">
                pimms.io
              </Link>
              ) dans le dashboard.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              - Partagez les nouveaux liens générés (exemple:{" "}
              <Link href="#" className="text-black no-underline">
                pim.ms/xD6vrXI
              </Link>
              ) sur les réseaux sociaux.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Nos liens réussissent à convertir sur mobile, là où les autres ont
              échoué.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Pour en savoir plus, j&apos;ai détaillé le concept des liens{" "}
              <Link href="https://pimms.io" className="text-black no-underline">
                pim.ms
              </Link>{" "}
              sur{" "}
              <Link href="https://pim.ms/salesfunnel">pim.ms/salesfunnel</Link>
            </Text>

            <Hr className="mx-0 my-6 w-full border border-neutral-200" />
            <Text className="text-xs font-light leading-6 text-neutral-600">
              Je m&apos;appelle Alexandre Sarfati et j&apos;ai créé PIMMS. Ceci
              est un email automatique, mais si vous répondez, je vous lirai
              directement.
            </Text>

            <Text className="text-xs font-light leading-6 text-neutral-600">
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

export default InviteYoutubeEmail;
