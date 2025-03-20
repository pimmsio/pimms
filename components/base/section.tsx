import { twMerge } from "tailwind-merge";

export const Section = ({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      id={id}
      className={twMerge(
        "w-full py-6 px-1 flex flex-col items-start mx-auto max-w-5xl gap-2 rounded-3xl",
        className
      )}
    >
      {children}
    </section>
  );
};
