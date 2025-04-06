import { cn } from "../../lib/utils";

export const Column = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 sm:grid-cols-2 gap-6">
      {children}
    </div>
  );
};

export const ColumnItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="contents divide-neutral-200 max-sm:divide-y sm:divide-x">
      {children}
    </div>
  );
};

export const ColumnBlock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex flex-col", className)}>{children}</div>
  );
};
