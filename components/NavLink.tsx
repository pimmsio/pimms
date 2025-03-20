"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavLink({ url, text }: { url: string; text: string }) {
  return (
    <Link href={url}>
      <Button
        variant="link"
        className="cursor-pointer text-sm md:text-base font-medium text-slate-500 text-opacity-80 hover:text-slate-800 leading-none p-2.5 -m-2.5 min-h-16"
      >
        {text}
      </Button>
    </Link>
  );
}
