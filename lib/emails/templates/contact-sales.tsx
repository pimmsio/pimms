import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { EmailFooter } from "../components/footer";

const PIMMS_LOGO = "https://pimms.io/static/logo.svg";

interface ContactSalesEmailProps {
  fullName: string;
  email: string;
  phone?: string;
  company: string;
  companySize: string;
  website?: string;
  reason: string;
  message?: string;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Row className="border-b border-neutral-100">
      <Column className="w-[140px] py-2 pr-4 align-top">
        <Text className="m-0 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </Text>
      </Column>
      <Column className="py-2 align-top">
        <Text className="m-0 text-sm text-neutral-800">{value}</Text>
      </Column>
    </Row>
  );
}

export function ContactSalesEmail({
  fullName = "John Doe",
  email = "john@example.com",
  phone,
  company = "Acme Inc",
  companySize = "11-50",
  website,
  reason = "Enterprise pricing",
  message,
}: ContactSalesEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>
          New sales inquiry from {fullName} ({company})
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
              New Sales Contact Request
            </Heading>
            <Text className="text-sm leading-6 text-neutral-600">
              <strong>{fullName}</strong> from <strong>{company}</strong> has
              submitted a sales inquiry.
            </Text>

            <Section className="my-6 rounded-xl border border-neutral-100 p-4">
              <Field label="Name" value={fullName} />
              <Field
                label="Email"
                value={email}
              />
              {phone && <Field label="Phone" value={phone} />}
              <Field label="Company" value={company} />
              <Field label="Team size" value={companySize} />
              {website && <Field label="Website" value={website} />}
              <Field label="Reason" value={reason} />
              {message && <Field label="Message" value={message} />}
            </Section>

            <Section className="my-6 text-center">
              <Link
                href={`mailto:${email}`}
                className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white no-underline"
              >
                Reply to {fullName}
              </Link>
            </Section>

            <EmailFooter email="alexandre@pimms.io" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ContactSalesEmail;
