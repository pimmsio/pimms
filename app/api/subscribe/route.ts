import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/components/emails";
import InviteYoutubeEmailFR from "@/components/emails/fr/templates/invite-youtube-email";
import InviteYoutubeEmailEN from "@/components/emails/en/templates/invite-youtube-email";
import InviteSalesEmailFR from "@/components/emails/fr/templates/invite-sales-email";
import InviteSalesEmailEN from "@/components/emails/en/templates/invite-sales-email";
import { subscribe } from "@/components/emails/resend/subscribe";

export async function POST(request: NextRequest) {
  const { email, locale, type } = await request.json();

  await subscribe({
    email,
  });

  if (locale === "fr") {
    await sendEmail({
      email,
      replyTo: "pimms@docduo.com",
      subject: "Invitation à rejoindre la plateforme de liens directs",
      react:
        type === "youtube"
          ? InviteYoutubeEmailFR({
              email,
            })
          : InviteSalesEmailFR({
              email,
            }),
      marketing: true,
      locale,
    });
  } else {
    await sendEmail({
      email,
      replyTo: "pimms@docduo.com",
      subject: "Invitation to join the pim.ms direct link platform",
      react:
        type === "youtube"
          ? InviteYoutubeEmailEN({
              email,
            })
          : InviteSalesEmailEN({
              email,
            }),
      marketing: true,
      locale,
    });
  }

  return NextResponse.json({ message: "Email received" });
}
