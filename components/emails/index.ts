import { CreateEmailOptions } from "resend";
import { resend, sendEmailViaResend } from "./resend";
import { sendViaNodeMailer } from "./send-via-nodemailer";

export const sendEmail = async ({
  email,
  subject,
  from,
  bcc,
  text,
  react,
  scheduledAt,
  marketing,
  replyTo,
  locale,
}: Omit<CreateEmailOptions, "to" | "from"> & {
  email: string;
  from?: string;
  marketing?: boolean;
  replyTo?: string;
  locale: "fr" | "en";
}) => {
  if (resend) {
    console.log("Sending email via Resend");
    return await sendEmailViaResend({
      email,
      subject,
      from,
      bcc,
      text,
      react,
      scheduledAt,
      marketing,
      replyTo,
      locale,
    });
  }

  // Fallback to SMTP if Resend is not configured
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_PORT
  );

  if (smtpConfigured) {
    return await sendViaNodeMailer({
      email,
      subject,
      text,
      react,
    });
  }

  console.info(
    "Email sending failed: Neither SMTP nor Resend is configured. Please set up at least one email service to send emails."
  );
};
