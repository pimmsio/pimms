import { type ReactNode } from "react";
import { Check, X } from "@/components/icons/custom-icons";
import Logo from "../logo";

export function ComparisonContainer({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl bg-card overflow-hidden">{children}</div>;
}

export function ComparisonHeader() {
  return (
    <div className="grid grid-cols-[1fr_60px_80px] md:grid-cols-[1fr_160px_160px]">
      <div className="bg-white px-2 md:px-6 py-3 border-b border-gray-200 flex items-center">
        <span className="text-md font-semibold text-gray-600">Features</span>
      </div>
      <div className="bg-white px-2 md:px-6 py-3 border-b border-gray-200 text-md font-semibold text-gray-600 text-center flex items-center justify-center">
        Others
      </div>
      <div className="px-2 md:px-6 py-3 border-b border-gray-200 items-center justify-center flex">
        <Logo className="w-14" />
      </div>
    </div>
  );
}

export function ComparisonCategory({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_60px_80px] md:grid-cols-[1fr_160px_160px] border-t border-gray-200">
      <div className="col-span-3 bg-gray-50 px-2 md:px-6 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {children}
        </span>
      </div>
    </div>
  );
}

function Pill({ value, rounded = true }: { value: boolean; rounded?: boolean }) {
  return (
    <div className="flex items-center justify-center">
      {value ? (
        <span
          className={`inline-flex items-center justify-center w-7 h-7 ${rounded ? "rounded-full bg-muted text-brand-primary" : "text-brand-primary"}`}
        >
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span
          className={`inline-flex items-center justify-center w-7 h-7 ${
            rounded ? "rounded-full bg-muted text-muted-foreground" : "text-muted-foreground rounded-full"
          }`}
        >
          <X className="w-5 h-5" />
        </span>
      )}
    </div>
  );
}

function CellValue({ value, branded }: { value: boolean | string; branded?: boolean }) {
  if (typeof value === "string") {
    return (
      <span className={`text-xs md:text-sm font-medium text-center ${branded ? "text-brand-primary" : "text-gray-600"}`}>
        {value}
      </span>
    );
  }
  return <Pill value={value} rounded={branded} />;
}

/** Coerce prop: boolean, "true"/"false" string -> boolean; other strings kept as-is */
function coerceValue(v: unknown): boolean | string {
  if (typeof v === "boolean") return v;
  if (v === "true") return true;
  if (v === "false") return false;
  if (typeof v === "string" && v.length > 0) return v;
  return false;
}

export function ComparisonRow({
  icon,
  children,
  others = false,
  pimms = true,
  strikethrough = false,
  description
}: {
  icon?: ReactNode;
  children: ReactNode;
  others?: boolean | string;
  pimms?: boolean | string;
  strikethrough?: boolean | string;
  description?: string;
}) {
  const othersVal = coerceValue(others);
  const pimmsVal = coerceValue(pimms);
  const isStrike = coerceValue(strikethrough) === true;

  return (
    <div className="grid grid-cols-[1fr_60px_80px] md:grid-cols-[1fr_160px_160px]">
      <div className="bg-card px-2 md:px-6 py-4">
        <div className="w-full flex items-center text-left gap-3">
          {icon && <span className="hidden md:block text-muted-foreground">{icon}</span>}
          <div className="flex flex-col gap-0.5">
            <span
              className={`text-sm md:text-base font-medium ${
                isStrike
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {children}
            </span>
            {description && (
              <span className="text-xs text-muted-foreground leading-snug">{description}</span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-card flex items-center justify-center">
        <CellValue value={othersVal} branded={false} />
      </div>
      <div className="bg-card flex items-center justify-center">
        <CellValue value={pimmsVal} branded={true} />
      </div>
    </div>
  );
}
