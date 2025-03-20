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
        "max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto text-center",
        className
      )}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl !leading-normal lg:!leading-tight font-extrabold !tracking-tighter text-balance text-[#08272E]">
        {children}
      </h1>
    </div>
  );
};
