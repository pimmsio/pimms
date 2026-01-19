import { ChevronDown } from "@/components/icons/custom-icons";
import { slug } from "github-slugger";

export function Faq({ question, answer, children }: { question: string; answer?: string; children?: React.ReactNode }) {
  const questionId = slug(question);

  return (
    <div id={`faq-${questionId}`} className="mb-3 rounded-2xl bg-card">
      <details className="group" open={false}>
        <summary className="cursor-pointer py-3 px-4 sm:p-5 min-h-[44px] list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 flex items-center justify-between gap-4">
          <div id={questionId} className="text-base sm:text-lg font-semibold text-text-primary leading-relaxed flex-1">
            {question}
          </div>
          <ChevronDown className="w-4 h-4 text-text-secondary transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
        </summary>
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="text-sm sm:text-base text-text-secondary leading-relaxed">{children ?? <p>{answer}</p>}</div>
        </div>
      </details>
    </div>
  );
}
