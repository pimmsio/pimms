interface HighlightProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

export function Highlight({ children, color = "blue" }: HighlightProps) {
  const colors = {
    blue: "bg-info-light text-info border-info-border",
    green: "bg-success-light text-success border-success-border",
    yellow: "bg-warning-light text-warning border-warning-border",
    red: "bg-error-light text-error border-error-border",
    purple: "bg-vibrant-purple/10 text-vibrant-purple border-vibrant-purple/20"
  };

  return (
    <span
      className={`${colors[color]} border px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm font-medium inline-block`}
    >
      {children}
    </span>
  );
}
