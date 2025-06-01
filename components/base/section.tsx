import { twMerge } from "tailwind-merge";

export const Section = ({
  id,
  children,
  className
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      id={id}
      className={twMerge("w-full max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-8 sm:py-12 md:py-16", className)}
    >
      {children}
    </section>
  );
};
