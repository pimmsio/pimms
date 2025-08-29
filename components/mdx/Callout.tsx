interface CalloutProps {
  type?: "info" | "tip" | "warn" | "note" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

const styles: Record<NonNullable<CalloutProps["type"]>, { container: string; title: string; icon: React.ReactNode }> = {
  info: {
    container: "border-info-border bg-info-light",
    title: "text-info",
    icon: (
      <svg className="w-4 h-4 text-info" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    )
  },
  tip: {
    container: "border-success-border bg-success-light",
    title: "text-success",
    icon: (
      <svg className="w-4 h-4 text-success" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 7l-6 6-3-3 1.4-1.4L11 12.2 15.6 7.6 17 9z" />
      </svg>
    )
  },
  warn: {
    container: "border-warning-border bg-warning-light",
    title: "text-warning",
    icon: (
      <svg className="w-4 h-4 text-warning" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    )
  },
  note: {
    container: "border-gray-200 bg-gray-50",
    title: "text-gray-800",
    icon: (
      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5a2 2 0 00-2 2v14l4-4h12a2 2 0 002-2V5a2 2 0 00-2-2z" />
      </svg>
    )
  },
  success: {
    container: "border-success-border bg-success-light",
    title: "text-success",
    icon: (
      <svg className="w-4 h-4 text-success" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 7l-6 6-3-3 1.4-1.4L11 12.2 15.6 7.6 17 9z" />
      </svg>
    )
  },
  error: {
    container: "border-error-border bg-error-light",
    title: "text-error",
    icon: (
      <svg className="w-4 h-4 text-error" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM13 15h-2V9h2v6zm0-8h-2V5h2v2z" />
      </svg>
    )
  }
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`not-prose border rounded-xl p-6 my-8 sm:my-12 ${s.container}`}>
      <div className="flex items-start gap-4">
        {s.icon}
        <div className="flex-1">
          {title && <div className={`font-semibold mb-3 ${s.title}`}>{title}</div>}
          <div className="text-base text-text-secondary leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
