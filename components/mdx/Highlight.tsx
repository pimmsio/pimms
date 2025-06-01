interface HighlightProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

export function Highlight({ children, color = "blue" }: HighlightProps) {
  const colors = {
    blue: "bg-blue-100 text-blue-900 border-blue-200",
    green: "bg-green-100 text-green-900 border-green-200",
    yellow: "bg-yellow-100 text-yellow-900 border-yellow-200",
    red: "bg-red-100 text-red-900 border-red-200",
    purple: "bg-purple-100 text-purple-900 border-purple-200"
  };

  return (
    <span
      className={`${colors[color]} px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm font-medium inline-block`}
    >
      {children}
    </span>
  );
}
