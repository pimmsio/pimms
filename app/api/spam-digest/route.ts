import { NextRequest, NextResponse } from "next/server";
import { sendEmailViaResend } from "@/lib/emails";
import { SpamDigestEmail } from "@/lib/emails/templates/spam-digest";
import { drainDrops } from "@/lib/spam-log";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Vercel Cron sends this header when CRON_SECRET is set on the project.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await drainDrops();
  if (!report) {
    console.warn("[spam-digest] Upstash is not configured — nothing to report.");
    return NextResponse.json({ skipped: "no store configured" }, { status: 200 });
  }

  // Staying quiet on a quiet week was the whole point of a digest.
  if (report.total === 0) {
    return NextResponse.json({ sent: false, total: 0 }, { status: 200 });
  }

  const result = await sendEmailViaResend({
    email: "alexandre@pimms.io",
    subject: `${report.total} form submission${report.total === 1 ? "" : "s"} blocked this week`,
    variant: "notifications",
    react: SpamDigestEmail({ report, since: "the last 7 days" }),
  });

  if (result?.error) {
    console.error("[spam-digest] Resend error:", result.error);
    return NextResponse.json({ error: "Failed to send digest" }, { status: 500 });
  }

  return NextResponse.json({ sent: true, total: report.total }, { status: 200 });
}
