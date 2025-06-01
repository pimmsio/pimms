import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  children,
  className,
  size = "md"
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "sm";
}) => {
  return (
    <p className={twMerge("text-base leading-relaxed text-[#5C5B61]", size === "sm" && "text-sm", className)}>
      {children}
    </p>
  );
};
