import { twMerge } from "tailwind-merge";
import { Paragraph } from "./paragraph";

export const H1Subtitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center",
        className
      )}
    >
      <Paragraph className="text-lg md:text-xl lg:text-2xl mt-8 mb-12 md:mt-12 lg:mt-16 text-[#08272E] font-semibold sm:text-pretty">
        {children}
      </Paragraph>
    </div>
  );
};
