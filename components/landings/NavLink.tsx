import Link from "next/link";

export default function NavLink({ id, text }: { id: string; text: string }) {
  return (
    <Link href={`#${id}`} className="text-sm p-2 font-medium text-gray-600 hover:text-gray-900">
      {text}
    </Link>
  );
}
