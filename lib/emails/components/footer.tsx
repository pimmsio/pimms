import {
  Hr,
  Link,
  Text,
} from "@react-email/components";

const PIMMS_LOGO =
  "https://pimms.io/static/logo.svg";

export function EmailFooter({
  email,
  marketing,
}: {
  email: string;
  marketing?: boolean;
}) {
  return (
    <>
      <Hr className="my-6 w-full border border-neutral-200" />
      <Text className="text-[12px] leading-6 text-neutral-500">
        This email was sent to{" "}
        <Link
          href={`mailto:${email}`}
          className="text-neutral-700 underline"
        >
          {email}
        </Link>
        .{" "}
        {marketing && (
          <>
            If you don&apos;t want to receive emails like this in the future,{" "}
            <Link
              href="https://app.pimms.io/account/settings"
              className="text-neutral-700 underline"
            >
              unsubscribe here
            </Link>
            .
          </>
        )}
      </Text>
      <Link href="https://pimms.io">
        <img
          src={PIMMS_LOGO}
          height="20"
          alt="PIMMS"
          style={{ marginTop: 4 }}
        />
      </Link>
    </>
  );
}
