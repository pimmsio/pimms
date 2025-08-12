interface HighlightProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}

export function Highlight({ children, color = "blue" }: HighlightProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-800 border-blue-200",
    green: "bg-green-50 text-green-800 border-green-200",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-200",
    red: "bg-red-50 text-red-800 border-red-200",
    purple: "bg-purple-50 text-purple-800 border-purple-200"
  };

  return (
    <span
      className={`${colors[color]} border px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm font-medium inline-block`}
    >
      {children}
    </span>
  );
}
