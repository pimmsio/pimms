"use client";

import Image from "next/image";
import { useRouter } from "next/router";

export const LocalImage = ({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) => {
  const { locale } = useRouter();
  return (
    <Image
      src={`/static/${src}-${locale}.svg`}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
};
