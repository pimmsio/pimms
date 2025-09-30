import { twMerge } from "tailwind-merge";
import { FloatingBadges } from "@/components/landings/FloatingBadges";

export const HeroSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section
      className={twMerge("relative w-full max-w-5xl mx-auto sm:px-4 md:px-6 py-6 sm:pb-16", className)}
      id="hero"
    >
      <FloatingBadges />
      <div className="relative z-20">{children}</div>
    </section>
  );
};
