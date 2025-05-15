// components/mdx/LinkCards.tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function LinkCards({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{children}</div>
  );
}

export function LinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="relative flex flex-col gap-1 border-[2px] border-[#F2F3F5] rounded-xl hover:bg-[#FAFAFA] transition-all p-4 cursor-pointer no-underline mt-4"
    >
      <ExternalLink
        className="absolute top-4 right-4 text-gray-400 group-hover:text-gray-600 w-4 h-4"
        strokeWidth={1.5}
      />
      <span className="text-md font-semibold text-[#08272E]">{title}</span>
      <span className="text-sm text-[#5C5B61]">{description}</span>
    </Link>
  );
}
