import { ReactNode } from "react";

export const AnimatedCentered = ({ children, noPadding }: { children: ReactNode; noPadding?: boolean }) => (
  <div
    className={`flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto px-4 w-full ${noPadding ? "mb-0" : "mb-6 sm:mb-16"}`}
  >
    {children}
  </div>
);
