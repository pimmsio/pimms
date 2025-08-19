import { Bricolage_Grotesque } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2
      className={twMerge(
        bricolage_grotesque.className,
        "text-3xl md:text-4xl font-extrabold text-[#08272E] text-center leading-tight text-balance",
        className
      )}
    >
      {children}
    </h2>
  );
};
