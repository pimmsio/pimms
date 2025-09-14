import { AUTHORS } from "../../app/constants";
import { getCanonicalLink } from "../../lib/utils";
import Link from "next/link";

interface AuthorProps {
  username: string;
  locale: string;
  imageOnly?: boolean;
  showRole?: boolean;
  size?: "sm" | "md" | "lg";
  noLink?: boolean;
}

export default function Author({
  username,
  locale,
  imageOnly = false,
  showRole = false,
  size = "md",
  noLink = false
}: AuthorProps) {
  const author = AUTHORS.find((author) => author.slug === username);

  if (!author) return null;

  const sizeClasses = {
    sm: {
      image: "w-7 h-7 sm:w-8 sm:h-8",
      name: "text-xs sm:text-sm",
      role: "text-xs"
    },
    md: {
      image: "w-8 h-8 sm:w-10 sm:h-10",
      name: "text-sm sm:text-base",
      role: "text-xs sm:text-sm"
    },
    lg: {
      image: "w-10 h-10 sm:w-12 sm:h-12",
      name: "text-base sm:text-lg",
      role: "text-sm sm:text-base"
    }
  };

  if (imageOnly) {
    const image = (
      <img
        alt={`${author.name} avatar`}
        loading="lazy"
        width={size === "sm" ? 32 : size === "md" ? 40 : 48}
        height={size === "sm" ? 32 : size === "md" ? 40 : 48}
        decoding="async"
        className={`${sizeClasses[size].image} rounded-full object-cover`}
        src={author.image}
      />
    );

    if (noLink) {
      return image;
    }

    return (
      <Link href={getCanonicalLink(locale, `/articles/author/${author.slug}`)} className="inline-block">
        {image}
      </Link>
    );
  }

  const content = (
    <>
      <img
        alt={`${author.name} avatar`}
        loading="lazy"
        width={size === "sm" ? 32 : size === "md" ? 40 : 48}
        height={size === "sm" ? 32 : size === "md" ? 40 : 48}
        decoding="async"
        className={`${sizeClasses[size].image} rounded-full object-cover`}
        src={author.image}
      />
      <div>
        <p className={`${sizeClasses[size].name} font-semibold text-text-primary`}>{author.name}</p>
        {showRole && <p className={`${sizeClasses[size].role} text-text-secondary`}>{author.role}</p>}
      </div>
    </>
  );

  if (noLink) {
    return <div className="flex items-center gap-3">{content}</div>;
  }

  return (
    <Link href={getCanonicalLink(locale, `/articles/author/${author.slug}`)} className="flex items-center gap-3">
      {content}
    </Link>
  );
}
