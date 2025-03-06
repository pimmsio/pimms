"use client";

import React, { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent } from "../lib/tracking";
import { Button } from "./ui/button";
import { APP_URL } from "../app/constants";
import { Crown } from "lucide-react";

export function WaitlistForm({
  tkey,
  type,
}: {
  tkey: string;
  type: "youtube" | "sales";
}) {
  const t = useTranslations(tkey);
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      // Focus the input if email is empty
      emailInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email, locale, type }),
      });

      trackEvent(
        "click_cta",
        {
          funnel: type,
        },
        email
      );
      setMessage(t("form.success"));
      setEmail("");
    } catch (error) {
      console.error("Error joining waitlist:", error);
      setMessage(t("form.error"));
    } finally {
      setIsLoading(false);
      window.location.href = `${APP_URL}/register?email=${email}`;
    }
  };

  const gotoPro = () => {
    const proSection = document.getElementById("lifetime");
    if (proSection) {
      proSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full md px-1 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-4xl w-full mx-auto flex flex-col gap-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row ring-[8px] ring-[#FFEAF1] rounded-xl"
          >
            <div className="flex-1">
              <label htmlFor="waitlist-form-input" className="sr-only">
                Email
              </label>
              <input
                ref={emailInputRef}
                id="waitlist-form-input"
                autoFocus
                type="email"
                required
                placeholder={t("form.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-t-xl md:rounded-tr-none md:rounded-l-xl px-4 py-[1.04em] md:py-[1.43em] focus:outline-none transition-all placeholder:text-sm placeholder:text-gray-500"
              />
            </div>
            <Button
              type="submit"
              variant="noring"
              size="lg"
              disabled={isLoading}
              className="block w-full md:w-auto min-w-52 py-2"
            >
              {isLoading ? t("form.waiting") : t("form.button")}
              <span className="inline text-sm">{t("form.button_free")}</span>
            </Button>
          </form>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-center">
            <div className="flex text-sm text-slate-600 font-semibold items-center">
              {t.rich("form.pro", {
                pro: (chunks) => (
                  <Button
                    variant="link"
                    className="text-sm w-fit hover:scale-105 text-[#08272E] font-semibold px-2"
                    onClick={gotoPro}
                  >
                    <span className="inline p-2 bg-[#FFD700] rounded-full">
                      <Crown className="w-4 h-4" />
                    </span>
                    {chunks}
                  </Button>
                ),
              })}
            </div>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
}
