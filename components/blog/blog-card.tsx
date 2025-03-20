import Image from "next/image";
import Link from "next/link";
import { formatDate, PageMetadata } from "@/lib/mdx";
import Author from "./author";
import { H2 } from "@/components/base/h2";
import { Paragraph } from "@/components/base/paragraph";
import { notFound } from "next/navigation";

export default function BlogCard({
  slug,
  metadata,
  priority,
}: {
  slug: string;
  metadata: PageMetadata;
  priority?: boolean;
}) {
  if (!metadata || !slug) {
    return notFound();
  }

  const { title, summary, image, author, publishedAt } = metadata;

  return (
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col rounded-2xl ring-[6px] ring-[#F2F3F5] rounded-b-2xl bg-white"
    >
      <Image
        className="aspect-[1200/630] rounded-t-2xl object-cover"
        src={image}
        width={1200}
        height={630}
        alt={title}
        priority={priority}
      />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <H2>{title}</H2>
          <Paragraph className="mt-2 line-clamp-2">{summary}</Paragraph>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          {author && <Author username={author} imageOnly />}
          <time dateTime={publishedAt} className="text-sm">
            {formatDate(publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
