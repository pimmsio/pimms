import Image from "next/image";

type FigureProps =
  | { src: string; alt?: string; caption?: string; width?: number; height?: number }
  | { children: React.ReactNode; caption?: string };

export function Figure(props: FigureProps) {
  const content =
    "src" in props ? (
      <Image
        src={props.src}
        alt={props.alt || ""}
        width={props.width || 1200}
        height={props.height || 630}
        className="w-full rounded-none sm:rounded-xl shadow-sm"
      />
    ) : (
      props.children
    );

  const caption = (props as any).caption as string | undefined;

  return (
    <figure className="my-8 sm:my-12 -mx-4 sm:-mx-6 md:mx-0 not-prose">
      {content}
      {caption && <figcaption className="mt-4 text-center text-sm text-gray-500 italic px-4">{caption}</figcaption>}
    </figure>
  );
}
