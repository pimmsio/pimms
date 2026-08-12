import { NextRequest, NextResponse } from "next/server";
import { sendEmailViaResend } from "@/lib/emails";
import { TrackingGuideEmail } from "@/lib/emails/templates/tracking-guide";
import {
  asString,
  getClientIp,
  isDisposableEmail,
  isValidEmail,
  rateLimit,
  verifyFormToken,
} from "@/lib/anti-spam";
import { HONEYPOT_FIELD, MIN_FILL_MS } from "@/lib/forms";
import { recordDrop, summariseFields } from "@/lib/spam-log";

const GUIDE_URLS: Record<string, string> = {
  en: "https://pim.ms/LzUZtZq",
  fr: "https://pim.ms/Ag92Bhn",
};


const RATE_LIMIT = { max: 1, windowMs: 24 * 60 * 60 * 1000 };

// This endpoint mails the *submitted* address, so abuse turns us into an open
// relay and burns our sending reputation. Rejections stay silent either way.
const pretendSuccess = () =>
  NextResponse.json({ success: true, message: "Guide sent successfully" }, { status: 200 });

const reject = async (reason: string, ip: string, body?: Record<string, unknown>) => {
  console.warn(`[lead-magnet] dropped: ${reason}`, { ip });
  await recordDrop({
    form: "lead-magnet",
    reason,
    ip,
    at: new Date().toISOString(),
    fields: body ? summariseFields(body) : {},
  });
  return pretendSuccess();
};

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Our own client always sends well-formed JSON, so a body we can't parse
    // is a bot or an aborted request — not something worth a 500.
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return reject("unparseable body", ip);
    }

    if (asString(body[HONEYPOT_FIELD], 200) !== null) {
      return reject("honeypot filled", ip, body);
    }

    const token = await verifyFormToken(body.formToken, MIN_FILL_MS.leadMagnet);
    if (!token.ok) {
      return reject(token.reason, ip, body);
    }

    if (!(await rateLimit(`lead-magnet:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs))) {
      return reject("rate limited", ip, body);
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const email = body.email.trim();
    if (isDisposableEmail(email)) {
      return reject("disposable email", ip, body);
    }

    const locale = body.locale === "fr" ? "fr" : "en";

    const result = await sendEmailViaResend({
      email,
      subject:
        locale === "fr"
          ? "Votre plan de tracking gratuit 🎯"
          : "Your free tracking plan 🎯",
      variant: "marketing",
      react: TrackingGuideEmail({ guideUrl: GUIDE_URLS[locale], locale }),
    });

    if (result?.error) {
      console.error("Lead magnet email error:", result.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return pretendSuccess();
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
