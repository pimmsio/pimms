import { type ReactElement } from "react";

export type EmailVariant = "primary" | "notifications" | "marketing";

export interface ResendEmailOptions {
  email: string;
  from?: string;
  variant?: EmailVariant;
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  text?: string;
  react?: ReactElement;
  scheduledAt?: string;
}
