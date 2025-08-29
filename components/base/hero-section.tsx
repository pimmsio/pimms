import { twMerge } from "tailwind-merge";

export const HeroSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className={twMerge("w-full max-w-5xl mx-auto px-4 md:px-6 py-16 sm:pt-24 sm:pb-20", className)} id="hero">
      {children}
    </section>
  );
};
