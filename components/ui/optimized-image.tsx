import Image from "next/image";
import { ComponentProps } from "react";

interface OptimizedImageProps extends ComponentProps<typeof Image> {
  src: string;
  alt: string;
}

/**
 * Optimized image component that uses regular <img> for SVGs to avoid srcSet bloat
 * and Next.js Image for raster images to benefit from optimization
 */
export function OptimizedImage({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  width,
  height,
  ...props
}: OptimizedImageProps) {
  // Use regular img tag for SVGs to avoid unnecessary srcSet generation
  if (src.endsWith(".svg")) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={loading}
        {...(props as any)}
      />
    );
  }

  // Use Next.js Image for raster images (JPEG, PNG, WebP, etc.)
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={loading}
      {...props}
    />
  );
}
