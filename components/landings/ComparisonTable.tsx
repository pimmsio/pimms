import { type ReactNode } from "react";
import { Check, X } from "@/components/icons/custom-icons";
import Logo from "../logo";

export function ComparisonContainer({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-gray-200 overflow-hidden">{children}</div>;
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

function Pill({ value, rounded = true }: { value: boolean; rounded?: boolean }) {
  return (
    <div className="flex items-center justify-center">
      {value ? (
        <span
          className={`inline-flex items-center justify-center w-7 h-7 ${rounded ? "rounded-full bg-gradient-to-b from-white to-white/30 shadow-sm" : ""} text-primary`}
        >
          <Check className="w-4 h-4" />
        </span>
      ) : (
        <span
          className={`inline-flex items-center justify-center w-7 h-7 ${rounded ? "rounded-full bg-gray-100 border border-gray-200" : "text-vibrant-red bg-vibrant-red/10 rounded-full"} text-primary`}
        >
          <X className="w-5 h-5" />
        </span>
      )}
    </div>
  );
}

export function ComparisonRow({
  icon,
  children,
  others = false,
  pimms = true
}: {
  icon?: ReactNode;
  children: ReactNode;
  others?: boolean;
  pimms?: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_60px_80px] md:grid-cols-[1fr_160px_160px]">
      <div className="bg-white px-2 md:px-6 py-4 border-b border-gray-100">
        <div className="w-full flex items-center text-left gap-3">
          {icon && <span className="hidden md:block text-gray-700">{icon}</span>}
          <span className="text-xs md:text-base text-gray-900 font-medium">{children}</span>
        </div>
      </div>
      <div className="bg-white flex items-center justify-center border-b border-gray-100">
        <Pill value={others} rounded={false} />
      </div>
      <div className="bg-brand-primary/95 flex items-center justify-center border-b border-white/20">
        <Pill value={pimms} />
      </div>
    </div>
  );
}
