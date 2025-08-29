"use client";

import { useState, type ReactNode } from "react";
import {
  Check,
  X,
  Shield,
  Wallet,
  Link2,
  Headphones,
  Sparkles,
  BarChart2,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Brain
} from "lucide-react";
import Logo from "../logo";
import {
  ShieldAlert,
  Shuffle,
  Users,
  Store,
  Globe2,
  TrendingUp,
  FlaskConical,
  CreditCard,
  Lock,
  MousePointerClick
} from "lucide-react";

type Feature = {
  id: string;
  label: string;
  icon: ReactNode;
  others: boolean;
  pimms: boolean;
  onClick?: () => void;
};

export function ComparisonContainer({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-gray-200 overflow-hidden">{children}</div>;
}

export function ComparisonHeader() {
  return (
    <div className="grid grid-cols-[1fr_60px_80px] md:grid-cols-[1fr_160px_160px]">
      <div className="bg-white px-2 md:px-6 py-3 border-b border-gray-200 flex items-center">
        <span className="text-md font-semibold text-gray-600">Features</span>
      </div>
      <div className="bg-white px-2 md:px-6 py-3 border-b border-gray-200 text-md font-semibold text-gray-600 text-center flex items-center justify-center">
        Others
      </div>
      <div className="px-2 md:px-6 py-3 border-b border-gray-200 items-center justify-center flex">
        <Logo className="w-14" />
      </div>
    </div>
  );
}

function Pill({ value, rounded = true }: { value: boolean; rounded?: boolean }) {
  return (
    <div className="flex items-center justify-center">
      {value ? (
        <span
          className={`inline-flex items-center justify-center w-7 h-7 ${rounded ? "rounded-full bg-gradient-to-b from-white to-white/30 shadow-sm" : "rounded-md"} text-primary`}
        >
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span
          className={`inline-flex items-center justify-center w-7 h-7 ${rounded ? "rounded-full bg-gray-100 border border-gray-200" : "rounded-md"} text-primary`}
        >
          <X className="w-5 h-5" />
        </span>
      )}
    </div>
  );
}

export function ComparisonRow({
  icon,
  children,
  others = false,
  pimms = true
}: {
  icon?: ReactNode;
  children: ReactNode;
  others?: boolean;
  pimms?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_60px_80px] md:grid-cols-[1fr_160px_160px]">
      <div className="bg-white px-2 md:px-6 py-4 border-b border-gray-100">
        <div className="w-full flex items-center text-left gap-3">
          {icon && <span className="hidden md:block text-gray-700">{icon}</span>}
          <span className="text-xs md:text-base text-gray-900 font-medium">{children}</span>
        </div>
      </div>
      <div className="bg-white flex items-center justify-center border-b border-gray-100">
        <Pill value={others} rounded={false} />
      </div>
      <div className="bg-brand-primary/95 flex items-center justify-center border-b border-white/20">
        <Pill value={pimms} />
      </div>
    </div>
  );
}

export function ComparisonExtras({ children }: { children: ReactNode }) {
  return (
    <div className="hidden md:block px-3 md:px-6 py-5 bg-gray-50/60 border-t border-gray-200">
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

export function ComparisonExtra({
  children,
  Icon,
  color = "text-gray-700"
}: {
  children: ReactNode;
  Icon?: any;
  color?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm">
      {Icon && <Icon className={`w-5 h-5 ${color}`} />}
      <span className={`text-sm font-semibold ${color}`}>{children}</span>
    </span>
  );
}

export default function ComparisonTable() {
  const [open, setOpen] = useState(false);

  const DeeplinkList = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
      {[
        "YouTube",
        "Instagram",
        "LinkedIn",
        "X (Twitter)",
        "Facebook",
        "TikTok",
        "Snapchat",
        "Pinterest",
        "Reddit",
        "WhatsApp",
        "Telegram",
        "Messenger",
        "Gmail",
        "Maps",
        "App Store",
        "Play Store",
        "Amazon",
        "Shopify",
        "Stripe Links",
        "PayPal"
      ].map((p) => (
        <div key={p} className="rounded-md border border-gray-200 px-2 py-1 bg-white/70">
          {p}
        </div>
      ))}
    </div>
  );

  return (
    <ComparisonContainer>
      <ComparisonHeader />
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[720px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Supported apps & payment destinations</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Links open directly in official apps. Payments work reliably with Stripe Links, PayPal and more.
            </p>
            <DeeplinkList />
          </div>
        </div>
      )}
    </ComparisonContainer>
  );
}
