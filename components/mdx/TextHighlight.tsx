interface TextHighlightProps {
  children: React.ReactNode;
  color?: "blue" | "red" | "green" | "orange";
}

export function TextHighlight({ children, color = "blue" }: TextHighlightProps) {
  const base = "px-2 py-0.5 rounded-md align-baseline whitespace-nowrap";

  const colorClasses: Record<Required<TextHighlightProps>["color"], string> = {
    blue: "bg-brand-secondary-light text-brand-primary",
    red: "bg-vibrant-red/10 text-vibrant-red",
    green: "bg-vibrant-green/10 text-vibrant-green",
    orange: "bg-vibrant-orange/10 text-vibrant-orange"
  };

  return <span className={`${base} ${colorClasses[color]}`}>{children}</span>;
}
