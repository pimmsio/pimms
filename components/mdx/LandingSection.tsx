import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  size?: "xs" | "sm" | "md" | "lg";
  spacing?: "none" | "bottom";
  maxWidth?: "full" | "6xl" | "4xl" | "2xl";
  id?: string;
  noPadding?: boolean;
}

export const Slide = ({
  children,
  variant = "primary",
  size = "md",
  spacing = "none",
  maxWidth = "6xl",
  id,
  noPadding = false
}: SlideProps) => {
  const variantClasses = {
    primary: "bg-background-secondary text-foreground",
    secondary: "bg-zinc-100",
    accent: "bg-background-secondary text-foreground"
  };

  const sizeClasses = {
    xs: "py-4",
    sm: "py-8",
    md: "py-16",
    lg: "py-24"
  };

  const spacingClasses = {
    none: "",
    bottom: "pb-16"
  };

  const widthClasses = {
    full: "",
    "6xl": "max-w-6xl mx-auto",
    "4xl": "max-w-4xl mx-auto",
    "2xl": "max-w-2xl mx-auto"
  };

  return (
    <section id={id} className={cn(variantClasses[variant], sizeClasses[size], spacingClasses[spacing], "w-full")}>
      <div className={cn(widthClasses[maxWidth], noPadding ? "" : "px-4 md:px-6")}>{children}</div>
    </section>
  );
};
