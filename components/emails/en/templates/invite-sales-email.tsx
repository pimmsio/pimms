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

export function InviteSalesEmail({
  email = "alexandre@pimms.io",
}: {
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Stop losing sales on your LinkedIn funnel acquisition</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Section className="my-8">
              <Img src={WORDMARK_BLACK} height="20" alt="pim.ms" />
            </Section>

            <Text className="text-sm font-semibold leading-6 text-neutral-600">
              Alexandre invites you to join the{" "}
              <Link href="https://pimms.io" className="text-black no-underline">
                pim.ms
              </Link>{" "}
              direct link platform.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Early access – I’m offering you 3 direct links to get started.
            </Text>

            <Section className="my-8">
              <a
                href="https://app.pimms.io/register"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-[#dc2e65] text-white font-semibold outline outline-4 transition hover:outline-[#F0A8BF] cursor-pointer no-underline rounded-none"
              >
                Access the dashboard
              </a>
            </Section>

            <Hr className="mx-0 mt-8mb-6 w-full border border-neutral-200" />

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              I’m going to help you boost your sales funnel with a unique
              concept:{" "}
              <Link href="https://pimms.io" className="text-black no-underline">
                pim.ms
              </Link>{" "}
              direct links.
            </Text>

            <Text className="mt-4 text-sm font-bold leading-6 text-neutral-600">
              How does it work?
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              - Copy and paste standard links (e.g.,{" "}
              <Link href="#" className="text-black no-underline">
                pimms.io
              </Link>
              ) into the dashboard.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              - Share the new links generated (e.g.,{" "}
              <Link href="#" className="text-black no-underline">
                pim.ms/xD6vrXI
              </Link>
              ) on social media.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              Our links convert on mobile where others have failed.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              To learn more, I’ve detailed the{" "}
              <Link href="https://pimms.io" className="text-black no-underline">
                pim.ms
              </Link>{" "}
              link concept at{" "}
              <Link href="https://pim.ms/salesfunnel">pim.ms/salesfunnel</Link>
            </Text>

            <Hr className="mx-0 my-6 w-full border border-neutral-200" />
            <Text className="text-xs font-light leading-6 text-neutral-600">
              My name is Alexandre Sarfati, and I created PIMMS. This is an
              automated email, but if you reply, I’ll read it personally.
            </Text>

            <Text className="text-xs font-light leading-6 text-neutral-600">
              If you have any feedback or comments about our product, I’d love
              to hear them. Thanks in advance, Alexandre.
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default InviteSalesEmail;
