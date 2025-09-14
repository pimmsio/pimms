import { ChevronDown } from "@/components/icons/custom-icons";
import { slug } from "github-slugger";

export function Faq({ question, answer, children }: { question: string; answer?: string; children?: React.ReactNode }) {
  const questionId = slug(question);

  return (
    <div
      id={`faq-${questionId}`}
      className="mb-3 border border-gray-100 rounded-lg bg-white transition-colors hover:border-gray-200 hover:shadow-sm"
    >
      <details className="group" open={false}>
        <summary className="cursor-pointer p-4 sm:p-5 list-none [&::-webkit-details-marker]:hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 hover:bg-gray-50/50 transition-colors flex items-center justify-between gap-4">
          <h4 id={questionId} className="text-sm sm:text-base font-medium text-text-primary leading-relaxed">
            {question}
          </h4>
          <ChevronDown className="w-4 h-4 text-text-secondary transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
        </summary>
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="text-sm sm:text-base text-text-secondary leading-relaxed">{children ?? <p>{answer}</p>}</div>
        </div>
      </details>
    </div>
  );
}
