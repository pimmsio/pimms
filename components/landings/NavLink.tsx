"use client";
import { Button } from "../ui/button";

export default function NavLink({ id, text }: { id: string; text: string }) {
  const handleClickFocus = () => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={handleClickFocus}
      variant="link"
      className="cursor-pointer text-sm md:text-base font-medium text-slate-500 text-opacity-80 hover:text-slate-800 leading-none p-2.5 -m-2.5"
    >
      {text}
    </Button>
  );
}
