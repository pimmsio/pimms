import { NextRequest, NextResponse } from "next/server";
import { sendEmailViaResend } from "@/lib/emails";
import { ContactSalesEmail } from "@/lib/emails/templates/contact-sales";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, companySize, website, reason, message } = body;

    if (!fullName || !email || !company || !companySize || !reason) {
      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const result = await sendEmailViaResend({
      email: "alexandre@pimms.io",
      subject: `New Sales Inquiry from ${fullName} (${company})`,
      variant: "notifications",
      replyTo: email,
      react: ContactSalesEmail({
        fullName,
        email,
        phone,
        company,
        companySize,
        website,
        reason,
        message
      })
    });

    if (result?.error) {
      console.error("Resend email error:", result.error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Request submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Contact sales error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
