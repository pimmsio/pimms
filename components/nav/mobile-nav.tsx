"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "@/components/icons/custom-icons";
import { type NavItem } from "./nav-config";
import { LocaleSwitcher } from "./locale-switcher";

type ResolvedNavItem = NavItem & { label: string; description?: string; resolvedHref: string };

type MenuSection = {
  label: string;
  items: ResolvedNavItem[];
};

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <span
        className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
      />
      <span
        className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
      />
    </div>
  );
}

export function MobileNav({
  sections,
  locale,
  pricingLabel,
  pricingHref,
  dashboardLabel,
  dashboardHref,
  demoLabel,
  demoHref
}: {
  sections: MenuSection[];
  locale: string;
  pricingLabel: string;
  pricingHref: string;
  dashboardLabel: string;
  dashboardHref: string;
  demoLabel: string;
  demoHref: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setExpandedIndex(null);
        }}
        className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <HamburgerIcon open={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 z-50 overflow-hidden"
          >
            <div className="mx-3 mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl p-4 max-h-[80vh] overflow-y-auto">
              {sections.map((section, index) => (
                <div key={section.label} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-900"
                  >
                    {section.label}
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${expandedIndex === index ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-2 space-y-1">
                          {section.items.map((item) => {
                            const content = (
                              <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-sm text-gray-700">{item.label}</span>
                                {item.external && (
                                  <ExternalLink size={12} className="text-gray-400" />
                                )}
                              </div>
                            );

                            if (item.external) {
                              return (
                                <a
                                  key={item.href}
                                  href={item.resolvedHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {content}
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={item.href}
                                href={item.resolvedHref}
                                onClick={() => setIsOpen(false)}
                              >
                                {content}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-3 space-y-2">
                <Link
                  href={pricingHref}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {pricingLabel}
                </Link>
                <div className="px-3 py-2">
                  <LocaleSwitcher />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    {dashboardLabel}
                  </Link>
                  <Link
                    href={demoHref}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-brand-primary rounded-xl hover:opacity-90 transition-opacity"
                  >
                    {demoLabel}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
