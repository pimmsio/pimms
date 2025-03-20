import { H1 } from "@/components/base/h1";
import { Paragraph } from "@/components/base/paragraph";
import { Section } from "@/components/base/section";

export default function NotFound() {
  return (
    <Section className="flex flex-col items-center justify-center h-screen">
      <H1>404 - Page Not Found</H1>
      <Paragraph className="mt-4 font-semibold">
        The page you are looking for does not exist.
      </Paragraph>
    </Section>
  );
}
