import crypto from "crypto";

// Hash une adresse email en SHA256 (hex)
export function hashEmail(email: string): string {
  return crypto
    .createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex");
}

// Construit le corps de la requête LinkedIn selon le type d'événement
export function buildConversionPayload({
  conversionUrn,
  eventId,
  hashedEmail,
  timestamp,
  conversionValue,
}: {
  conversionUrn: string;
  eventId: string;
  hashedEmail: string;
  timestamp: number;
  conversionValue?: { currencyCode: string; amount: string };
}) {
  return {
    conversion: conversionUrn,
    conversionHappenedAt: timestamp,
    eventId,
    user: {
      userIds: [
        {
          idType: "SHA256_EMAIL",
          idValue: hashedEmail,
        },
      ],
    },
    ...(conversionValue && { conversionValue }),
  };
}

// Envoie la conversion à LinkedIn
export async function sendToLinkedIn(payload: any) {
  return await fetch("https://api.linkedin.com/rest/conversionEvents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202504",
    },
    body: JSON.stringify(payload),
  });
}
