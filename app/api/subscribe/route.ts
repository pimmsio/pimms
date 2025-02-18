import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../components/emails";
import WelcomeEmail from "../../../components/emails/templates/welcome-email";
import { subscribe } from "../../../components/emails/resend/subscribe";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  await subscribe({
    email,
  });

  await sendEmail({
    email,
    replyTo: "pimms@docduo.com",
    subject: "Welcome to Pimms!",
    react: WelcomeEmail({
      email,
    }),
    // send the welcome email 5 minutes after the user signed up
    marketing: true,
  });

  return NextResponse.json({ message: "Email received" });
}
