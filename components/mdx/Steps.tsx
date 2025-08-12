interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return <div className="space-y-3 sm:space-y-4 my-4 sm:my-6">{children}</div>;
}

interface StepProps {
  children: React.ReactNode;
  number?: number;
}

export function Step({ children, number }: StepProps) {
  return (
    <div className="flex gap-3 sm:gap-4">
      {number != null ? (
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[#3970ff] text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
          {number}
        </div>
      ) : (
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 text-gray-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
          •
        </div>
      )}
      <div className="flex-1 text-sm sm:text-base text-[#5C5B61] leading-relaxed">{children}</div>
    </div>
  );
}

export function StepCompleted({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-1 text-sm sm:text-base text-[#5C5B61] leading-relaxed line-through">{children}</div>
    </div>
  );
}
