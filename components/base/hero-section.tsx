import { twMerge } from "tailwind-merge";

export const HeroSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={twMerge(
        "w-full mt-4 mb-12 md:my-16 px-1 md:px-6 max-w-4xl mx-auto",
        className
      )}
      id="hero"
    >
      {children}
    </section>
  );
};
