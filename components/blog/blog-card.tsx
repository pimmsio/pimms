import Image from "next/image";
import Link from "next/link";
import { formatDate, PageMetadata } from "@/lib/mdx";
import Author from "./author";
import { notFound } from "next/navigation";
import { getCanonicalLink } from "../../lib/utils";
import { useLocale } from "next-intl";

export default function BlogCard({
  slug,
  metadata,
  priority,
}: {
  slug: string;
  metadata: PageMetadata;
  priority?: boolean;
}) {
  const locale = useLocale();

  if (!metadata || !slug) {
    return notFound();
  }

  const { title, summary, image, author, publishedAt } = metadata;

  return (
    <Link
      href={getCanonicalLink(locale, `/blog/${slug}`)}
      className="flex flex-col bg-white overflow-hidden"
    >
      <Image
        className="aspect-[1200/630] object-cover"
        src={image}
        width={1200}
        height={630}
        alt={title}
        priority={priority}
      />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight line-clamp-2">
            {title}
          </h2>
          <p className="text-md text-[#5C5B61] tracking-tight line-clamp-1 mt-2">
            {summary}
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          {author && <Author username={author} imageOnly />}
          <time dateTime={publishedAt} className="text-xs">
            {formatDate(publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
