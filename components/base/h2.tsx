import { Plus_Jakarta_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2
      className={twMerge(
        plus_jakarta_sans.className,
        "text-3xl md:text-4xl xl:text-5xl font-bold text-text-primary text-center !tracking-tight !leading-tight text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
};
