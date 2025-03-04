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
      <Preview>Stop losing subscribers on your YouTube channel</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] border border-solid border-neutral-200 px-10 py-5">
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
              <Link
                className="px-5 py-3 bg-[#dc2e65] text-white font-semibold outline outline-[6px] transition outline-[#ffeaf1] cursor-pointer no-underline rounded-xl"
                href="https://app.pimms.io/register"
                target="_blank"
                rel="noreferrer"
              >
                Access the dashboard
              </Link>
            </Section>

            <Hr className="mx-0 mt-8mb-6 w-full border border-neutral-200" />

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              I’m going to help you grow your YouTube channel with a unique
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
                youtu.be/BY_XwvKogC8
              </Link>
              ) into the dashboard.
            </Text>

            <Text className="mt-4 text-sm font-light leading-6 text-neutral-600">
              - Share the new links generated (e.g.,{" "}
              <Link href="#" className="text-black no-underline">
                pim.ms/NgQeWcP
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
              <Link href="https://pim.ms/youtube">pim.ms/youtube</Link>
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

export default InviteYoutubeEmail;
