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
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 sm:p-5 my-6 sm:my-8`}>
      {title && (
        <h4 className={`${style.titleColor} font-medium text-base sm:text-lg mb-3 flex items-center gap-2`}>
          <span className="text-base sm:text-lg">{style.icon}</span>
          {title}
        </h4>
      )}
      <div className={`text-sm sm:text-base ${style.contentColor} leading-relaxed`}>{children}</div>
    </div>
  );
}
