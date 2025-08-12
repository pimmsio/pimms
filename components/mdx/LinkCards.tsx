// components/mdx/LinkCards.tsx
import Link from "next/link";
import { getCanonicalLink } from "@/lib/utils";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

export function LinkCards({ children }: { children: React.ReactNode }) {
  return <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 my-6 sm:my-8">{children}</div>;
}

export function LinkCard({
  href,
  title,
  description,
  external = false
}: {
  href: string;
  title: string;
  description: string;
  external?: boolean;
}) {
  const locale = useLocale();

  const linkProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer"
      }
    : {};

  return (
    <Link
      href={external ? href : getCanonicalLink(locale, href)}
      {...linkProps}
      className="group not-prose block border border-gray-200 bg-white rounded-lg p-5 sm:p-6 transition-all hover:border-[#3970ff] hover:bg-[#f8fbff] no-underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3970ff] focus-visible:ring-offset-2 hover:shadow-sm"
    >
      <h3 className="text-base sm:text-lg font-semibold text-[#08272E] group-hover:text-[#3970ff] transition-colors mb-1.5 sm:mb-2 flex items-center justify-between">
        {title}
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#3970ff] transition group-hover:translate-x-0.5" />
      </h3>

      <p className="text-sm sm:text-[15px] text-[#5C5B61] leading-relaxed">{description}</p>
    </Link>
  );
}
