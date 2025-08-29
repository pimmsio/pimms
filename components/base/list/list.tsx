import { twMerge } from "tailwind-merge";

export const List = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <ul className={twMerge("list-none list-inside gap-4 flex flex-col", className)}>{children}</ul>;
};
