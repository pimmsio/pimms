import { twMerge } from "tailwind-merge";

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2
      className={twMerge(
        "text-3xl md:text-4xl font-extrabold text-[#08272E] text-center leading-tight text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
};
