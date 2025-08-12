interface InfoSectionProps {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}

export function InfoSection({ type = "info", title, children }: InfoSectionProps) {
  const styles = {
    info: {
      bg: "bg-[#3970ff]/5",
      border: "border-[#3970ff]/20",
      icon: "💡",
      titleColor: "text-[#3970ff]",
      contentColor: "text-gray-700"
    },
    warning: {
      bg: "bg-amber-50/50",
      border: "border-amber-200/50",
      icon: "⚠️",
      titleColor: "text-amber-700",
      contentColor: "text-gray-700"
    },
    tip: {
      bg: "bg-emerald-50/50",
      border: "border-emerald-200/50",
      icon: "✨",
      titleColor: "text-emerald-700",
      contentColor: "text-gray-700"
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg sm:rounded-xl p-4 sm:p-5 my-6 sm:my-8`}>
      {title && (
        <h4 className={`${style.titleColor} font-semibold text-sm sm:text-base mb-2 flex items-center gap-2`}>
          <span className="text-base sm:text-lg">{style.icon}</span>
          {title}
        </h4>
      )}
      <div className={`text-xs sm:text-sm ${style.contentColor} leading-relaxed`}>{children}</div>
    </div>
  );
}
