"use client";

export const Avatar = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <img
      className={`inline-block size-8 rounded-full ring-2 ring-background ${className}`}
      src={src}
      alt={alt}
    />
  );
};
