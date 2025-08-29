import { ReactNode } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const AnimatedCentered = ({ children, noPadding }: { children: ReactNode; noPadding?: boolean }) => (
  <BlurFade
    direction="up"
    delay={0.8}
    inView={false}
    className={`flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto px-4 w-full ${noPadding ? "mb-0" : "mb-6 sm:mb-16"}`}
  >
    {children}
  </BlurFade>
);
