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
        "text-md font-semibold me-2 px-2.5 py-0.5 w-fit rounded-full",
        className
      )}
    >
      {children}
    </label>
  );
};
