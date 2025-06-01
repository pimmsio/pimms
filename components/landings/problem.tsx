import { ReactNode } from "react";

interface ProblemProps {
  children?: ReactNode;
}

export const Problem = ({ children }: ProblemProps) => {
  return <div id="problem">{children}</div>;
};
