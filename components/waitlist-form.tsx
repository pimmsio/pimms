"use client";

import React, { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

export function WaitlistForm({ tkey }: { tkey: string }) {
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
        body: JSON.stringify({ email, locale }),
      });

      setMessage(t("form.success"));
      setEmail("");
    } catch {
      setMessage(t("form.error"));
      // Focus the input if an error occurs
      emailInputRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
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
            className="w-full px-4 py-3 rounded-lg ring-4 ring-white focus:ring-[#F0A8BF] focus:outline-none transition-all placeholder:text-sm placeholder:text-gray-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer block w-full md:w-auto px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-md outline outline-4 transition hover:outline-[#F0A8BF]"
        >
          {isLoading ? t("form.waiting") : t("form.button")}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
