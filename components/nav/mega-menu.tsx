"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "@/components/icons/custom-icons";
import { type NavItem } from "./nav-config";

type ResolvedNavItem = NavItem & { label: string; description?: string; resolvedHref: string };

type MenuSection = {
  label: string;
  items: ResolvedNavItem[];
};

export function MegaMenu({
  sections,
  locale
}: {
  sections: MenuSection[];
  locale: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback((index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div ref={navRef} className="hidden lg:flex items-center gap-1">
      {sections.map((section, index) => (
        <div
          key={section.label}
          className="relative"
          onMouseEnter={() => handleEnter(index)}
          onMouseLeave={handleLeave}
        >
          <button
            className="flex items-center gap-1 text-sm px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            {section.label}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-3 min-w-[280px]">
                  <div className="grid gap-1">
                    {section.items.map((item) => {
                      const content = (
                        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-gray-900 group-hover:text-brand-primary transition-colors">
                                {item.label}
                              </span>
                              {item.external && (
                                <ExternalLink size={12} className="text-gray-400 shrink-0" />
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );

                      if (item.external) {
                        return (
                          <a
                            key={item.href}
                            href={item.resolvedHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenIndex(null)}
                          >
                            {content}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={item.href}
                          href={item.resolvedHref}
                          onClick={() => setOpenIndex(null)}
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
