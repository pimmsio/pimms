import { twMerge } from "tailwind-merge";

export const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <label
      className={twMerge(
        "text-md font-semibold px-2.5 py-0.5 w-fit rounded-full tracking-tight",
        className
      )}
    >
      {children}
    </label>
  );
};
