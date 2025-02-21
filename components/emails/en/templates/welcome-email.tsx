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
      <Preview>Stop loosing subs on YouTube</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Section className="my-8">
              <Img src={WORDMARK} height="20" alt="pim.ms" />
            </Section>

            <Text className="text-sm font-semibold leading-6 text-neutral-600">
              Alexandre invites you to join PIMMS
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Early access – I offer you 3 direct links to start.
            </Text>

            <Section className="my-8">
              <a
                href="https://app.pimms.io/register"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-[#dc2e65] text-white font-semibold outline outline-4 transition hover:outline-[#F0A8BF] cursor-pointer no-underline rounded-none"
              >
                Open the dashboard
              </a>
            </Section>

            <Hr className="mx-0 mt-8mb-6 w-full border border-neutral-200" />

            <Text className="mt-4 text-sm font-semibold leading-6 text-neutral-600">
              My mission is to help you grow your YouTube channel.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Trust me, the best way to promote your YouTube videos on Linkedin
              is to share direct links in your posts.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              To know more, full details on:{" "}
              <Link href="https://pim.ms/youtube">pim.ms/youtube</Link>
            </Text>

            <Hr className="mx-0 my-6 w-full border border-neutral-200" />
            <Text className="text-sm font-light leading-6 text-neutral-600">
              My name is Alexandre, I founded PIMMS. This is an automated email,
              but if you reply it will go straight to me.
            </Text>

            <Text className="text-sm font-light leading-6 text-neutral-600">
              If you have any feedback or comments on our product I would love
              to hear it. Thanks, Alexandre.
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default WelcomeEmail;
