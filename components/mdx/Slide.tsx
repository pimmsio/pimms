import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "inverse";
  size?: "xs" | "sm" | "md" | "lg";
  spacing?: "none" | "bottom";
  maxWidth?: "full" | "6xl" | "4xl" | "2xl";
  id?: string;
  noPadding?: boolean;
  noOverflow?: boolean;
}

export const Slide = ({
  children,
  variant = "primary",
  size = "md",
  spacing = "none",
  maxWidth = "6xl",
  id,
  noPadding = false,
  noOverflow
}: SlideProps) => {
  const variantClasses = {
    primary: "bg-background-secondary text-foreground",
    secondary: "bg-zinc-100",
    accent: "bg-background-secondary text-foreground",
    inverse: "bg-transparent text-white"
  };

  const sizeClasses = {
    xs: "py-4 sm:py-8",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-20",
    lg: "py-20 sm:py-28"
  };

  const spacingClasses = {
    none: "",
    bottom: "pb-20"
  };

  const widthClasses = {
    full: "",
    "6xl": "max-w-6xl mx-auto",
    "4xl": "max-w-4xl mx-auto",
    "2xl": "max-w-2xl mx-auto"
  };

  return (
    <section
      id={id}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        spacingClasses[spacing],
        "w-full",
        noOverflow ? "overflow-hidden" : ""
      )}
      style={variant === "inverse" ? { backgroundColor: "#08272e" } : undefined}
    >
      <div className={cn(widthClasses[maxWidth], noPadding ? "" : "px-4 md:px-6")}>{children}</div>
    </section>
  );
};
