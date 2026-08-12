import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Column,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { EmailFooter } from "../components/footer";
import type { DropReport } from "@/lib/spam-log";

const PIMMS_LOGO = "https://pimms.io/static/logo.svg";

/** Plain-English explanation of why each check fired. */
const REASON_LABELS: Record<string, string> = {
  "missing-token": "No form token — posted straight to the API",
  "bad-signature": "Forged form token",
  "submitted-too-fast": "Submitted faster than a human could type",
  "expired-token": "Form left open for more than 2 hours",
  "bad-timestamp": "Malformed form token",
  "honeypot filled": "Filled in the hidden decoy field",
  "invalid select value": "Dropdown value that isn't in the form",
  "unparseable body": "Request body wasn't valid JSON",
  "rate limited": "Already submitted from this IP today",
  "disposable email": "Throwaway email provider",
};

function Sample({ fields }: { fields: Record<string, string> }) {
  const entries = Object.entries(fields);
  if (entries.length === 0) {
    return <Text className="m-0 text-xs italic text-neutral-400">(no fields submitted)</Text>;
  }

  return (
    <Section className="mb-2 rounded-lg bg-neutral-50 px-3 py-2">
      {entries.map(([key, value]) => (
        <Row key={key}>
          <Column className="w-[90px] py-[2px] pr-2 align-top">
            <Text className="m-0 text-[11px] uppercase tracking-wide text-neutral-400">{key}</Text>
          </Column>
          <Column className="py-[2px] align-top">
            <Text className="m-0 text-[12px] text-neutral-700">{value}</Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

export function SpamDigestEmail({
  report = { total: 0, buckets: [] },
  since = "the last 7 days",
}: {
  report?: DropReport;
  since?: string;
}) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>{`${report.total} form submission${report.total === 1 ? "" : "s"} blocked in ${since}`}</Preview>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-3xl border border-solid border-neutral-100 px-10 py-5">
            <Section className="my-8">
              <Img src={PIMMS_LOGO} height="14" alt="PIMMS" className="my-0" />
            </Section>

            <Heading className="mx-0 my-7 p-0 text-xl font-semibold text-black">
              Blocked form submissions
            </Heading>

            {report.total === 0 ? (
              <Text className="text-sm leading-6 text-neutral-600">
                Nothing was blocked in {since}. Either the bots moved on, or every submission
                looked legitimate and reached your inbox as normal.
              </Text>
            ) : (
              <>
                <Text className="text-sm leading-6 text-neutral-600">
                  <strong>{report.total}</strong> submission{report.total === 1 ? " was" : "s were"}{" "}
                  discarded in {since}. Samples below — skim them to confirm none were real
                  enquiries. If one was, reply to this email and we&apos;ll loosen that check.
                </Text>

                {report.buckets.map((bucket) => (
                  <Section key={`${bucket.form}:${bucket.reason}`} className="my-6">
                    <Hr className="my-4 border-neutral-100" />
                    <Text className="m-0 text-sm font-semibold text-black">
                      {bucket.count}× {REASON_LABELS[bucket.reason] ?? bucket.reason}
                    </Text>
                    <Text className="m-0 mb-3 text-xs text-neutral-400">
                      {bucket.form} · showing {bucket.samples.length} of {bucket.count}
                    </Text>
                    {bucket.samples.map((sample, i) => (
                      <Sample key={i} fields={sample.fields} />
                    ))}
                  </Section>
                ))}
              </>
            )}

            <EmailFooter email="alexandre@pimms.io" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default SpamDigestEmail;
