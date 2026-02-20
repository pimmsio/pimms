import { Check } from "@/components/icons/custom-icons";

export function CheckList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-4">{children}</ul>;
}

export function CheckListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
      <span className="text-text-secondary">{children}</span>
    </li>
  );
}
