import { twMerge } from "tailwind-merge";

export const ListItem = ({
  children,
  className,
  icon,
  variant = "default",
  size = "sm"
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "default" | "alert" | "success" | "primary";
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <li className={twMerge("flex-row flex gap-3 items-center tracking-tight", className)}>
      <div
        className={twMerge(
          "w-fit h-fit rounded-full bg-brand-primary/10 text-brand-primary",
          size === "sm" && "p-1.5",
          size === "md" && "p-2",
          size === "lg" && "p-2.5",
          variant === "alert" && "bg-gray-100 text-text-secondary",
          variant === "success" && "bg-brand-primary/10 text-brand-primary",
          variant === "primary" && "bg-text-primary text-white"
        )}
      >
        {icon}
      </div>
      {children}
    </li>
  );
};
