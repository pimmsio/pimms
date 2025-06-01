// components/mdx/LinkCards.tsx
import Link from "next/link";
import { getCanonicalLink } from "@/lib/utils";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

export function LinkCards({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">{children}</div>;
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
      className="group block border border-gray-200 bg-white rounded-lg hover:border-[#3970ff] transition-colors p-6 no-underline"
    >
      <h3 className="text-lg font-semibold text-[#08272E] group-hover:text-[#3970ff] transition-colors mb-2 flex items-center justify-between">
        {title}
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#3970ff] transition-colors" />
      </h3>

      <p className="text-sm text-[#5C5B61] leading-relaxed">{description}</p>
    </Link>
  );
}
