import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { pathnames } from "./config";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
  pathnames,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
