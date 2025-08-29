import Image from "next/image";
import Link from "next/link";
import { formatDate, PageMetadata } from "@/lib/mdx";
import Author from "./author";
import { notFound } from "next/navigation";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";
import { Clock, ArrowUpRight } from "lucide-react";

export default function BlogCard({ slug, metadata }: { slug: string; metadata: PageMetadata; priority?: boolean }) {
  const locale = useLocale();

  if (!metadata || !slug) {
    return notFound();
  }

  const { title, summary, image, author, publishedAt } = metadata;

  return (
    <Link
      href={getCanonicalLink(locale, `/articles/${slug}`)}
      className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-200"
    >
      <div className="relative overflow-hidden">
        <Image
          className="w-full h-full object-cover aspect-[1200/630] group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title}
          width={1200}
          height={630}
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-brand-primary text-xs font-semibold px-4 py-2 rounded-full capitalize shadow-sm">
          {/* Category badge */}
          {metadata.categories[0].replace("-", " ")}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg sm:text-xl text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-4">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-text-secondary line-clamp-2 mb-6 leading-relaxed">{summary}</p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {author && <Author username={author} imageOnly size="sm" noLink />}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 opacity-60" />
              <span className="font-medium">{formatDate(publishedAt)}</span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
