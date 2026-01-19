import Link from "next/link";

export default function NavLink({ id, text }: { id: string; text: string }) {
  return (
    <Link
      href={`#${id}`}
      className="text-sm px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {text}
    </Link>
  );
}
