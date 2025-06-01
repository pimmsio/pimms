import { ChevronDown } from "lucide-react";

export function Faq({ question, answer, children }: { question: string; answer?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-3 sm:mb-4 border border-gray-200 rounded-lg bg-white">
      <details className="group">
        <summary className="cursor-pointer p-3 sm:p-4 list-none [&::-webkit-details-marker]:hidden">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-[#08272E] pr-2 sm:pr-4">{question}</h3>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C5B61] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
          </div>
        </summary>
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="text-sm sm:text-base text-[#5C5B61]">{children ?? <p>{answer}</p>}</div>
        </div>
      </details>
    </div>
  );
}
