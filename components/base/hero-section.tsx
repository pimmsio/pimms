import { twMerge } from "tailwind-merge";

export const HeroSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className={twMerge("w-full max-w-5xl mx-auto px-4 md:px-6 my-14 sm:mt-24 sm:mb-16", className)} id="hero">
      {children}
    </section>
  );
};
