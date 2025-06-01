export const Avatar = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  return (
    <img
      className={`inline-block size-8 rounded-full border border-gray-200 bg-white object-cover ${className ?? ""}`}
      src={src}
      alt={alt}
      width={32}
      height={32}
      loading="lazy"
    />
  );
};
