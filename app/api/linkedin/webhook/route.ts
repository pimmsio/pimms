import { buildConversionPayload, hashEmail, sendToLinkedIn } from "@/lib/linkedin";

const LEAD_CONVERSION_URN = "urn:lla:llaPartnerConversion:20971594";
const SALE_CONVERSION_URN = "urn:lla:llaPartnerConversion:20971602";

export const POST = async (req: Request) => {
  const rawBody = await req.text();

  try {
    const body = JSON.parse(rawBody);
    const { event, id: eventId, data } = body;

    if (!event || !data?.customer?.email) {
      return new Response("Missing required fields", { status: 400 });
    }

    const email = data.customer.email;
    const hashedEmail = hashEmail(email);
    const timestamp = new Date(data.customer.createdAt || Date.now()).getTime();

    let payload: any;

    if (event === "lead.created") {
      payload = buildConversionPayload({
        conversionUrn: LEAD_CONVERSION_URN,
        eventId,
        hashedEmail,
        timestamp
      });
    } else if (event === "sale.created") {
      const sale = data.sale;
      if (!sale?.amount || !sale?.currency) {
        return new Response("Missing sale data", { status: 400 });
      }

      payload = buildConversionPayload({
        conversionUrn: SALE_CONVERSION_URN,
        eventId,
        hashedEmail,
        timestamp,
        conversionValue: {
          currencyCode: sale.currency.toUpperCase(),
          amount: sale.amount.toString()
        }
      });
    } else {
      return new Response("Unsupported event", { status: 200 });
    }

    const response = await sendToLinkedIn(payload);

    if (!response.ok) {
      const error = await response.text();
      console.error("LinkedIn API error", { event, error });
      return new Response("LinkedIn API error", { status: 500 });
    }

    console.log("LinkedIn conversion sent", {
      event,
      email,
      eventId
    });

    return new Response("OK", { status: 201 });
  } catch (err: any) {
    console.error("Webhook parsing failed", { error: err.message });
    return new Response("Invalid payload", { status: 400 });
  }
};
