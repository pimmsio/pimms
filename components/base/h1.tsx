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
        "text-4xl md:text-5xl lg:text-6xl !leading-tight font-extrabold !tracking-tight text-balance text-text-primary",
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
        "text-3xl md:text-4xl font-extrabold !leading-tight !tracking-tight text-balance text-text-primary text-center",
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
        "text-lg md:text-xl lg:text-2xl text-text-secondary font-medium leading-relaxed text-balance text-center max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </p>
  );
};
