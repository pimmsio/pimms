import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/components/emails";
import WelcomeEmailFR from "@/components/emails/fr/templates/welcome-email";
import WelcomeEmailEN from "@/components/emails/en/templates/welcome-email";
import { subscribe } from "@/components/emails/resend/subscribe";

export async function POST(request: NextRequest) {
  const { email, locale } = await request.json();

  await subscribe({
    email,
  });

  if (locale === "fr") {
    await sendEmail({
      email,
      replyTo: "pimms@docduo.com",
      subject: "Invitation à rejoindre PIMMS",
      react: WelcomeEmailFR({
        email,
      }),
      marketing: true,
    });
  } else {
    await sendEmail({
      email,
      replyTo: "pimms@docduo.com",
      subject: "Invitation to join PIMMS",
      react: WelcomeEmailEN({
        email,
      }),
      marketing: true,
    });
  }

  return NextResponse.json({ message: "Email received" });
}
