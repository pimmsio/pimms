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
      className={twMerge("w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20", className)}
    >
      {children}
    </section>
  );
};
