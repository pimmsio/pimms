import { twMerge } from "tailwind-merge";

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={twMerge(
        "text-2xl md:text-3xl font-extrabold text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
};
