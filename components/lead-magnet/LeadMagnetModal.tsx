"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "@/components/icons/custom-icons";

const GUIDE_IMAGE = "https://assets.pimms.io/tracking-plan.webp";

interface LeadMagnetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
  translations: {
    modal_title: string;
    modal_subtitle: string;
    modal_email_placeholder: string;
    modal_submit: string;
    modal_sending: string;
    modal_success_title: string;
    modal_success_message: string;
    modal_no_spam: string;
    modal_image_alt: string;
  };
}

export function LeadMagnetModal({
  open,
  onOpenChange,
  locale,
  translations: t,
}: LeadMagnetModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      setStatus("success");
      localStorage.setItem(
        "lead_magnet_completed",
        JSON.stringify({ timestamp: Date.now(), email })
      );
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen && status !== "success") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl">
        {status === "success" ? (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader className="sm:text-center">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                {t.modal_success_title}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 mt-2">
                {t.modal_success_message}
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            <div className="bg-linear-to-br from-amber-50 to-amber-100 p-6 flex justify-center">
              <Image
                src={GUIDE_IMAGE}
                alt={t.modal_image_alt}
                width={240}
                height={312}
                className="rounded-lg shadow-lg border border-white/80"
              />
            </div>

            <div className="p-6 sm:p-8">
              <DialogHeader className="sm:text-left mb-4">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t.modal_title}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-gray-600 mt-1.5">
                  {t.modal_subtitle}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.modal_email_placeholder}
                  required
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />

                {errorMessage && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-bold text-base rounded-xl"
                  size="lg"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.modal_sending}
                    </span>
                  ) : (
                    t.modal_submit
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center pt-1">
                  {t.modal_no_spam}
                </p>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
