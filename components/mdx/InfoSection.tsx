// components/mdx/InfoSection.tsx
export function InfoSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#E0F1E5] bg-[#F5FBF8] px-6 py-4 text-[#225941] leading-relaxed">
      {children}
    </div>
  );
}
