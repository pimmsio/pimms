// components/mdx/LinkCards.tsx
import Link from "next/link";
import { getCanonicalLink } from "@/lib/utils";
import { ArrowRight } from "@/components/icons/custom-icons";

export function LinkCards({ children }: { children: React.ReactNode }) {
  return <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8 sm:my-12">{children}</div>;
}

export function LinkCard({
  href,
  title,
  description,
  locale,
  external = false
}: {
  href: string;
  title: string;
  description: string;
  locale: string;
  external?: boolean;
}) {
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
      className="group not-prose block border border-gray-200 bg-white rounded-xl p-6 transition-colors hover:border-brand-primary no-underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
    >
      <h3 className="text-lg sm:text-xl font-semibold text-text-primary group-hover:text-brand-primary transition-colors mb-3 relative">
        {title}
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition group-hover:translate-x-0.5 absolute right-0 top-0.5" />
      </h3>

      <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">{description}</p>
    </Link>
  );
}
