import { twMerge } from "tailwind-merge";

export const HeroSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section
      className={twMerge("w-full max-w-5xl mx-auto sm:px-4 md:px-6 py-8 sm:pt-18 sm:pb-16", className)}
      id="hero"
    >
      {children}
    </section>
  );
};
