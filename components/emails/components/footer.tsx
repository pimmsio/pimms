import { Hr, Link, Tailwind, Text } from "@react-email/components";

export function Footer({
  email,
  marketing,
  notificationSettingsUrl,
}: {
  email: string;
  marketing?: boolean;
  notificationSettingsUrl?: string;
}) {
  if (marketing) {
    return (
      <Tailwind>
        <Hr className="mx-0 my-6 w-full border border-neutral-200" />
        <Text className="text-[12px] leading-6 text-neutral-500">
          Nous envoyons des emails de mises à jour produit – pas de spam. Vous
          ne souhaitez pas recevoir ces emails ?{" "}
          <Link
            className="text-neutral-700 underline"
            href="https://app.pimms.io/account/settings"
          >
            Désabonnez-vous ici
          </Link>
        </Text>
        <Text className="text-[12px] text-neutral-500">
          Pimms. Chemin de Louis-Hubert 2. Petit-Lancy, 1213
        </Text>
      </Tailwind>
    );
  }

  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-neutral-200" />
      <Text className="text-[12px] leading-6 text-neutral-500">
        This email was intended for <span className="text-black">{email}</span>.
        If you were not expecting this email, you can ignore this email. If you
        are concerned about your account&apos;s safety, please reply to this
        email to get in touch with us.
      </Text>

      {notificationSettingsUrl && (
        <Text className="text-[12px] leading-6 text-neutral-500">
          Don’t want to get these emails?{" "}
          <Link
            className="text-neutral-700 underline"
            href={notificationSettingsUrl}
          >
            Adjust your notification settings
          </Link>
        </Text>
      )}
      <Text className="text-[12px] text-neutral-500">
        Pimms. Chemin de Louis-Hubert 2. Petit-Lancy, 1213
      </Text>
    </Tailwind>
  );
}
