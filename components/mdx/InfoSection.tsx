interface InfoSectionProps {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}

export function InfoSection({ type = "info", title, children }: InfoSectionProps) {
  const styles = {
    info: {
      bg: "bg-brand-primary/5",
      border: "border-brand-primary/20",
      icon: "💡",
      titleColor: "text-brand-primary",
      contentColor: "text-gray-700"
    },
    warning: {
      bg: "bg-warning-light/50",
      border: "border-warning-border/50",
      icon: "⚠️",
      titleColor: "text-warning",
      contentColor: "text-gray-700"
    },
    tip: {
      bg: "bg-success-light/50",
      border: "border-success-border/50",
      icon: "✨",
      titleColor: "text-success",
      contentColor: "text-gray-700"
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-6 my-8 sm:my-12`}>
      {title && (
        <h4 className={`${style.titleColor} font-semibold text-base sm:text-lg mb-4 flex items-center gap-3`}>
          <span className="text-lg sm:text-xl">{style.icon}</span>
          {title}
        </h4>
      )}
      <div className={`text-base ${style.contentColor} leading-relaxed`}>{children}</div>
    </div>
  );
}
