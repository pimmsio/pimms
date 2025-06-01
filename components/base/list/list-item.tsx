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
    <li className={twMerge("flex-row flex gap-2 items-center tracking-tight", className)}>
      <div
        className={twMerge(
          "w-fit h-fit rounded-full bg-[#3970ff]/10 text-[#3970ff]",
          size === "sm" && "p-1",
          size === "md" && "p-1.5",
          size === "lg" && "p-2",
          variant === "alert" && "bg-gray-100 text-[#5C5B61]",
          variant === "success" && "bg-[#3970ff]/10 text-[#3970ff]",
          variant === "primary" && "bg-[#08272E] text-white"
        )}
      >
        {icon}
      </div>
      {children}
    </li>
  );
};
