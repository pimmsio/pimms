import { twMerge } from "tailwind-merge";

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center text-xs font-semibold uppercase tracking-wider rounded-full bg-gray-100 text-[#08272E] px-4 py-1.5",
        className
      )}
    >
      {children}
    </span>
  );
};
