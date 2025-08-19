import { Bricolage_Grotesque } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h1
      className={twMerge(
        bricolage_grotesque.className,
        "text-4xl md:text-5xl lg:text-6xl !leading-10 sm:!leading-14 lg:!leading-16 font-extrabold !tracking-tight text-balance text-[#08272E]",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const H1Blog = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h1
      className={twMerge(
        bricolage_grotesque.className,
        "text-3xl md:text-4xl font-extrabold !leading-10 sm:!leading-14 lg:!leading-16 !tracking-tight text-balance text-[#08272E] text-center",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const H1Subtitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <p
      className={twMerge(
        "text-lg md:text-xl text-[#5C5B61] font-medium leading-relaxed text-balance text-center",
        className
      )}
    >
      {children}
    </p>
  );
};
