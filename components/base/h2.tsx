import { twMerge } from "tailwind-merge";

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-2xl font-bold text-balance", className)}>
      {children}
    </h2>
  );
};
