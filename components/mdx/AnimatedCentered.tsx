import { ReactNode } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

export const AnimatedCentered = ({ children }: { children: ReactNode }) => (
  <BlurFade
    direction="up"
    delay={0.8}
    inView={false}
    className="flex flex-col items-center text-center space-y-4 mb-12 max-w-4xl mx-auto px-4 w-full"
  >
    {children}
  </BlurFade>
);
