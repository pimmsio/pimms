import { twMerge } from "tailwind-merge";

export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "max-w-sm sm:max-w-lg lg:max-w-3xl mx-auto text-center",
        className
      )}
    >
      <h1 className="text-4xl lg:text-6xl !leading-12 lg:!leading-16 font-black !tracking-tight text-balance text-[#08272E]">
        {children}
      </h1>
    </div>
  );
};
