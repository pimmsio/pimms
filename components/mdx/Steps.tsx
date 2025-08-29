interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return <div className="not-prose space-y-6 sm:space-y-8 my-8 sm:my-12">{children}</div>;
}

interface StepProps {
  children: React.ReactNode;
  number?: number;
}

export function Step({ children, number }: StepProps) {
  return (
    <div className="flex gap-4 sm:gap-6">
      {number != null ? (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm sm:text-base font-semibold">
          {number}
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold">
          •
        </div>
      )}
      <div className="flex-1 text-base sm:text-lg text-text-secondary leading-relaxed">{children}</div>
    </div>
  );
}

export function StepCompleted({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 sm:gap-6">
      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-vibrant-green text-white rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-1 text-base sm:text-lg text-text-secondary leading-relaxed line-through">{children}</div>
    </div>
  );
}
