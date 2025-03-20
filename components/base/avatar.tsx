export const Avatar = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      className="inline-block size-8 rounded-full ring-2 ring-background"
      src={src}
      alt={alt}
    />
  );
};
