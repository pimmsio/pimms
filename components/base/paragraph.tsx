import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  children,
  className,
  size = "md"
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "sm" | "lg";
}) => {
  const sizeClasses = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl"
  };

  return <p className={twMerge(sizeClasses[size], "leading-relaxed text-text-secondary", className)}>{children}</p>;
};
