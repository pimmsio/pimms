export const Faq = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 my-6">
      <h3 className="text-lg font-semibold mb-3">{question}</h3>
      <p className="text-sm text-neutral-700 whitespace-pre-line">{answer}</p>
    </div>
  );
};
