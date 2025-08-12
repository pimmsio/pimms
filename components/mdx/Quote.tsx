interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export function Quote({ children, author, role }: QuoteProps) {
  return (
    <blockquote className="not-prose relative border-l-4 border-[#3970ff] bg-gradient-to-r from-[#3970ff]/5 to-transparent p-4 sm:p-5 md:p-6 my-5 sm:my-6 italic rounded-r-lg">
      <div className="text-sm sm:text-base text-[#5C5B61] mb-2 sm:mb-3 leading-relaxed">{children}</div>
      {author && (
        <footer className="text-xs sm:text-sm text-[#08272E] not-italic">
          <cite>
            — {author}
            {role && <span className="text-[#5C5B61]">, {role}</span>}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}
