import { twMerge } from "tailwind-merge";

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h1
      className={twMerge(
        "font-jakarta text-5xl md:text-6xl lg:text-7xl !leading-[1.1] font-bold !tracking-tighter text-text-primary mx-auto",
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
        "font-jakarta text-3xl md:text-4xl font-bold !leading-[1.1] !tracking-tighter text-text-primary text-center",
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
        "text-md md:text-lg lg:text-xl text-text-secondary leading-relaxed text-balance text-center max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </p>
  );
};
