import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/mdx";
import { AUTHORS } from "../../app/constants";

export default async function Author({
  username,
  updatedAt,
  imageOnly,
}: {
  username: string;
  updatedAt?: string;
  imageOnly?: boolean;
}) {
  const name = username.toLocaleLowerCase().trim();

  const author = AUTHORS.find((author) => author.slug === name);

  if (!author) {
    return null;
  }

  return imageOnly ? (
    <Image
      src={author.image}
      alt={author.name}
      width={24}
      height={24}
      className="rounded-full transition-all group-hover:brightness-90"
    />
  ) : updatedAt ? (
    <div className="flex items-center space-x-3">
      <Image
        src={author.image}
        alt={author.name}
        width={24}
        height={24}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-sm">Written by {author.name}</p>
        <time dateTime={updatedAt} className="text-sm font-light text-gray-400">
          Last updated {formatDate(updatedAt)}
        </time>
      </div>
    </div>
  ) : (
    <Link
      href={`https://twitter.com/${name}`}
      className="group flex items-center space-x-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={author.image}
        alt={author.name}
        width={40}
        height={40}
        className="rounded-full transition-all group-hover:brightness-90"
      />
      <div className="flex flex-col">
        <p className="font-semibold text-gray-700">{author.name}</p>
        <p className="text-sm">@{name}</p>
      </div>
    </Link>
  );
}
