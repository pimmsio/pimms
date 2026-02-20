"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MailPlus, UserPlus } from "@/components/icons/custom-icons";

const iconMap = {
  calendar: CalendarCheck,
  mail: MailPlus,
  user: UserPlus
} as const;

type Event = {
  label: string;
  iconKey: keyof typeof iconMap;
};

type Props = {
  events: Event[];
};

export function AvatarFunnelEvents({ events }: Props) {
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setEventIndex((i) => (i + 1) % events.length), 2000);
    return () => clearInterval(id);
  }, [events.length]);

  const centerY = 450;
  const bottomMargin = 240;
  const height = centerY + bottomMargin;
  const cardTopPercent = ((centerY + 40) / height) * 100;

  return (
    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2" style={{ top: `${cardTopPercent}%` }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={eventIndex}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-sm border rounded-2xl px-5 py-2 text-base md:text-lg font-semibold text-gray-900 flex items-center gap-3 whitespace-nowrap"
        >
          {(() => {
            const e = events[eventIndex];
            const Icon = iconMap[e.iconKey];
            return (
              <>
                <span className="inline-grid min-w-9 min-h-9 place-items-center w-9 h-9 rounded-full text-primary bg-gradient-to-r from-brand-secondary-light to-brand-primary-100">
                  <Icon size={18} />
                </span>
                <span>{e.label}</span>
              </>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
