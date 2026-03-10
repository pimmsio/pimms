import { NextRequest, NextResponse } from "next/server";
import { sendEmailViaResend } from "@/lib/emails";
import { TrackingGuideEmail } from "@/lib/emails/templates/tracking-guide";

const GUIDE_URLS: Record<string, string> = {
  en: "https://pim.ms/LzUZtZq",
  fr: "https://pim.ms/Ag92Bhn",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale = "en" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const guideUrl = GUIDE_URLS[locale] || GUIDE_URLS.en;

    const result = await sendEmailViaResend({
      email,
      subject:
        locale === "fr"
          ? "Votre plan de tracking gratuit 🎯"
          : "Your free tracking plan 🎯",
      variant: "marketing",
      react: TrackingGuideEmail({ guideUrl, locale }),
    });

    if (result?.error) {
      console.error("Lead magnet email error:", result.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Guide sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
