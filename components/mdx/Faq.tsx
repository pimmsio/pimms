export function Faq({
  question,
  answer,
  children,
}: {
  question: string;
  answer?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <details className="group">
        <summary className="cursor-pointer font-semibold">{question}</summary>
        <div className="mt-2 text-gray-600">{children ?? <p>{answer}</p>}</div>
      </details>
    </div>
  );
}
