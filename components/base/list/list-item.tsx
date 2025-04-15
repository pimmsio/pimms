import { twMerge } from "tailwind-merge";

export const ListItem = ({
  children,
  className,
  icon,
  variant = "default",
  size = "sm",
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "default" | "alert" | "success" | "primary";
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <li
      className={twMerge(
        "flex-row flex gap-2 items-center tracking-tight",
        className
      )}
    >
      <div
        className={twMerge(
          "w-fit h-fit rounded-full bg-[#E7EEFF] text-[#3970ff]",
          size === "sm" && "p-1",
          size === "md" && "p-1.5",
          size === "lg" && "p-2",
          variant === "alert" && "bg-[#FFEAF1] text-[#E0004B]",
          variant === "success" && "bg-[#f1fdf8] text-[#26CF64]",
          variant === "primary" && "bg-[#08272E] text-white"
        )}
      >
        {icon}
      </div>
      {children}
    </li>
  );
};
