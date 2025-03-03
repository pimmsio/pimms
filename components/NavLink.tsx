"use client";
import { Button } from "./ui/button";

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
      className="cursor-pointer hover:underline text-foreground font-semibold text-sm"
    >
      {text}
    </Button>
  );
}
