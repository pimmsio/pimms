import { twMerge } from "tailwind-merge";

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2
      className={twMerge(
        "font-jakarta text-3xl md:text-4xl xl:text-5xl font-bold text-text-primary text-center !tracking-tight !leading-tight md:text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
};
