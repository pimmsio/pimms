import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "sm";
}) => {
  return (
    <p
      className={twMerge(
        "text-md md:text-lg leading-relaxed text-balance text-[#5C5B61]",
        size === "sm" && "text-sm md:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
