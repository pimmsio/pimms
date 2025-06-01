interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export function Quote({ children, author, role }: QuoteProps) {
  return (
    <blockquote className="relative border-l-4 border-[#3970ff] bg-gray-50 p-4 sm:p-6 my-4 sm:my-6 italic">
      <div className="text-sm sm:text-base text-[#5C5B61] mb-2 sm:mb-3">{children}</div>
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
