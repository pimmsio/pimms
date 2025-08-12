interface CalloutProps {
  type?: "info" | "tip" | "warn" | "note" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

const styles: Record<NonNullable<CalloutProps["type"]>, { container: string; title: string; icon: React.ReactNode }> = {
  info: {
    container: "border-blue-200 bg-blue-50",
    title: "text-blue-800",
    icon: (
      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    )
  },
  tip: {
    container: "border-emerald-200 bg-emerald-50",
    title: "text-emerald-800",
    icon: (
      <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 7l-6 6-3-3 1.4-1.4L11 12.2 15.6 7.6 17 9z" />
      </svg>
    )
  },
  warn: {
    container: "border-amber-200 bg-amber-50",
    title: "text-amber-800",
    icon: (
      <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
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
    container: "border-green-200 bg-green-50",
    title: "text-green-800",
    icon: (
      <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm5 7l-6 6-3-3 1.4-1.4L11 12.2 15.6 7.6 17 9z" />
      </svg>
    )
  },
  error: {
    container: "border-red-200 bg-red-50",
    title: "text-red-800",
    icon: (
      <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM13 15h-2V9h2v6zm0-8h-2V5h2v2z" />
      </svg>
    )
  }
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`not-prose border rounded-lg p-4 sm:p-5 my-6 sm:my-8 ${s.container}`}>
      <div className="flex items-start gap-3">
        {s.icon}
        <div className="flex-1">
          {title && <div className={`font-semibold mb-1 ${s.title}`}>{title}</div>}
          <div className="text-sm sm:text-base text-[#5C5B61]">{children}</div>
        </div>
      </div>
    </div>
  );
}
