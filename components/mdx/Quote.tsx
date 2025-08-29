interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export function Quote({ children, author, role }: QuoteProps) {
  return (
    <blockquote className="not-prose relative border-l-4 border-brand-primary bg-gradient-primary-soft p-4 sm:p-5 md:p-6 my-5 sm:my-6 italic rounded-r-lg">
      <div className="text-sm sm:text-base text-text-secondary mb-2 sm:mb-3 leading-relaxed">{children}</div>
      {author && (
        <footer className="text-xs sm:text-sm text-text-primary not-italic">
          <cite>
            — {author}
            {role && <span className="text-text-secondary">, {role}</span>}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}
