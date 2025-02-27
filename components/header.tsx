"use client";
import CtaButton from "@/components/cta/CtaButton";
import Logo from "@/components/logo";

export default function Header({ tkey }: { tkey: string }) {
  return (
    <header className="w-full bg-white relative py-3 my-4 outline outline-4 outline-[#D4F0FE] px-1 md:px-6 flex justify-between items-center">
      <Logo />
      <CtaButton tkey={tkey} />
    </header>
  );
}
