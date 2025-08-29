import { ChevronDown } from "lucide-react";

export function Faq({ question, answer, children }: { question: string; answer?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4 border border-gray-200 rounded-xl bg-white transition-colors hover:border-brand-primary/50">
      <details className="group" open={false}>
        <summary className="cursor-pointer p-6 list-none [&::-webkit-details-marker]:hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base md:text-lg font-semibold text-text-primary">{question}</h3>
            <ChevronDown className="w-5 h-5 text-text-secondary transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
          </div>
        </summary>
        <div className="px-6 pb-6">
          <div className="text-base text-text-secondary leading-relaxed">{children ?? <p>{answer}</p>}</div>
        </div>
      </details>
    </div>
  );
}
