interface ShowMoreButtonProps {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
  translations?: {
    more: string;
  };
}

export function ShowMoreButton({
  showAll,
  setShowAll,
  translations,
}: ShowMoreButtonProps) {
  return !showAll ? (
    <div
      className="flex cursor-pointer items-center justify-center p-2 font-semibold"
      onClick={() => setShowAll(true)}
    >
      {translations ? translations.more : "+ More"}
    </div>
  ) : null;
}
