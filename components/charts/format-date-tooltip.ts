// Function to get the number of days between two dates
export const getDaysDifference = (startDate: Date, endDate: Date) => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDateTooltip = (
  date: Date,
  {
    interval,
    start,
    end,
    dataAvailableFrom,
    locale,
  }: {
    interval?: string;
    start?: string | Date | null;
    end?: string | Date | null;
    dataAvailableFrom?: Date;
    locale?: string;
  }
) => {
  if (interval === "all" && dataAvailableFrom) {
    start = dataAvailableFrom;
    end = new Date(Date.now());
  }

  if (start && end) {
    const daysDifference = getDaysDifference(
      typeof start === "string" ? new Date(start) : start,
      typeof end === "string" ? new Date(end) : end
    );

    if (daysDifference <= 2)
      return date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "numeric",
      });
    else if (daysDifference > 180)
      return date.toLocaleDateString(locale, {
        month: "short",
        year: "numeric",
      });
  } else if (interval) {
    switch (interval) {
      case "24h":
        return date.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "numeric",
        });
      case "ytd":
      case "1y":
      case "all":
        return date.toLocaleDateString(locale, {
          month: "short",
          year: "numeric",
        });
      default:
        break;
    }
  }

  return date.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
