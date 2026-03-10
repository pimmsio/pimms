"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { LeadMagnetModal } from "./LeadMagnetModal";

const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const SCROLL_THRESHOLD = 0.5;
const DISMISSED_KEY = "lead_magnet_dismissed";
const COMPLETED_KEY = "lead_magnet_completed";

interface LeadMagnetProviderProps {
  locale: string;
  disabled?: boolean;
  children: ReactNode;
}

function isWithinCooldown(key: string): boolean {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return false;
    const { timestamp } = JSON.parse(stored);
    return Date.now() - timestamp < COOLDOWN_MS;
  } catch {
    return false;
  }
}

export function LeadMagnetProvider({ locale, disabled, children }: LeadMagnetProviderProps) {
  const t = useTranslations("landing.lead_magnet");
  const [open, setOpen] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [shouldSuppress, setShouldSuppress] = useState(true);

  useEffect(() => {
    if (disabled) return;
    const suppress =
      isWithinCooldown(DISMISSED_KEY) || isWithinCooldown(COMPLETED_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reading from localStorage requires effect; initial state must match SSR
    setShouldSuppress(suppress);
  }, [disabled]);

  useEffect(() => {
    if (disabled || shouldSuppress || scrollTriggered) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollProgress = window.scrollY / scrollHeight;

      if (scrollProgress >= SCROLL_THRESHOLD) {
        setScrollTriggered(true);
        setOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disabled, shouldSuppress, scrollTriggered]);

  useEffect(() => {
    if (disabled) return;

    const handleTriggerClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest("[data-lead-magnet-trigger]");
      if (trigger) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("click", handleTriggerClick);
    return () => document.removeEventListener("click", handleTriggerClick);
  }, [disabled]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      localStorage.setItem(
        DISMISSED_KEY,
        JSON.stringify({ timestamp: Date.now() })
      );
    }
  }, []);

  const translations = {
    modal_title: t("modal_title"),
    modal_subtitle: t("modal_subtitle"),
    modal_email_placeholder: t("modal_email_placeholder"),
    modal_submit: t("modal_submit"),
    modal_sending: t("modal_sending"),
    modal_success_title: t("modal_success_title"),
    modal_success_message: t("modal_success_message"),
    modal_no_spam: t("modal_no_spam"),
    modal_image_alt: t("modal_image_alt"),
  };

  return (
    <>
      {children}
      {!disabled && (
        <LeadMagnetModal
          open={open}
          onOpenChange={handleOpenChange}
          locale={locale}
          translations={translations}
        />
      )}
    </>
  );
}
