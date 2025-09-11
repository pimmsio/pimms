import { createContext, useContext } from "react";
import { Datum, type ChartContext as ChartContextType } from "./types";

export const ChartContext = createContext<ChartContextType | null>(null);

export function useChartContext<T extends Datum>(): ChartContextType<T> {
  const chartContext = useContext(ChartContext);
  if (!chartContext) throw new Error("No chart context");
  return chartContext;
}
