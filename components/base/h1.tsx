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
        "max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto text-center",
        className
      )}
    >
      <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl !leading-10 sm:!leading-14 lg:!leading-16 font-black !tracking-tighter text-balance text-[#08272E]">
        {children}
      </h1>
    </div>
  );
};
