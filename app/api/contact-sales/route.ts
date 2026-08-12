import { NextRequest, NextResponse } from "next/server";
import { sendEmailViaResend } from "@/lib/emails";
import { ContactSalesEmail } from "@/lib/emails/templates/contact-sales";
import {
  COMPANY_SIZES,
  CONTACT_REASONS,
  assessSpam,
  asString,
  getClientIp,
  isValidEmail,
  rateLimit,
  verifyFormToken,
} from "@/lib/anti-spam";
import { HONEYPOT_FIELD, MIN_FILL_MS } from "@/lib/forms";
import { recordDrop, summariseFields } from "@/lib/spam-log";


// One submission per IP per day. Note this is best-effort: the counter lives in
// instance memory, so a recycled serverless instance starts fresh. It's a
// backstop — the honeypot and token checks do the real work.
const RATE_LIMIT = { max: 1, windowMs: 24 * 60 * 60 * 1000 };

// Bots learn from error messages, so rejections look exactly like success.
const pretendSuccess = () =>
  NextResponse.json({ success: true, message: "Request submitted successfully" }, { status: 200 });

const reject = async (reason: string, ip: string, body?: Record<string, unknown>) => {
  console.warn(`[contact-sales] dropped: ${reason}`, { ip });
  await recordDrop({
    form: "contact-sales",
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

    // 1. Honeypot — a field hidden from real users, irresistible to form-fillers.
    if (asString(body[HONEYPOT_FIELD], 200) !== null) {
      return reject("honeypot filled", ip, body);
    }

    // 2. Proof the payload came from a form that was actually rendered, and
    //    that a plausible amount of time was spent on it.
    const token = await verifyFormToken(body.formToken, MIN_FILL_MS.contactSales);
    if (!token.ok) {
      return reject(token.reason, ip, body);
    }

    // 3. Burst protection.
    if (!rateLimit(`contact-sales:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs)) {
      return reject("rate limited", ip, body);
    }

    // 4. Strict validation. The selects are closed vocabularies, so anything
    //    outside them means the payload wasn't produced by our form.
    const fullName = asString(body.fullName, 100);
    const company = asString(body.company, 100);
    const phone = asString(body.phone, 40);
    const website = asString(body.website, 200);
    const message = asString(body.message, 2_000);
    const email = isValidEmail(body.email) ? body.email.trim() : null;
    const companySize = COMPANY_SIZES.find((s) => s === body.companySize) ?? null;
    const reason = CONTACT_REASONS.find((r) => r === body.reason) ?? null;

    if (!fullName || !company || !email) {
      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    }

    if (!companySize || !reason) {
      return reject("invalid select value", ip, body);
    }

    // 5. Heuristics only *tag* — a false positive here would cost a real lead,
    //    so the mail is still delivered and can be filtered on the subject.
    const spam = assessSpam({ fullName, company, email, website, message });
    if (spam.isLikelySpam) {
      console.warn(`[contact-sales] tagged (score ${spam.score})`, { ip, reasons: spam.reasons });
    }

    const result = await sendEmailViaResend({
      email: "alexandre@pimms.io",
      subject: `${spam.isLikelySpam ? "[likely spam] " : ""}New Sales Inquiry from ${fullName} (${company})`,
      variant: "notifications",
      replyTo: email,
      react: ContactSalesEmail({
        fullName,
        email,
        phone: phone ?? undefined,
        company,
        companySize,
        website: website ?? undefined,
        reason,
        message: message ?? undefined,
      })
    });

    if (result?.error) {
      console.error("Resend email error:", result.error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return pretendSuccess();
  } catch (error) {
    console.error("Contact sales error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
