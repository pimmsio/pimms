import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear, scaleUtc } from "@visx/scale";
import { PropsWithChildren, useMemo, useState } from "react";
import { ChartContext, ChartTooltipContext } from "./chart-context";
import { ChartProps, Datum, type ChartContext as ChartContextType } from "./types";
import { useTooltip } from "./useTooltip";

type TimeSeriesChartProps<T extends Datum> = PropsWithChildren<ChartProps<T>>;

export function TimeSeriesChart<T extends Datum>(props: TimeSeriesChartProps<T>) {
  return (
    <ParentSize className="relative w-full h-full min-w-0">
      {({ width, height }) => {
        return width > 0 && height > 0 && <TimeSeriesChartInner {...props} width={width} height={height} />;
      }}
    </ParentSize>
  );
}

function TimeSeriesChartInner<T extends Datum>({
  type = "area",
  width: outerWidth,
  height: outerHeight,
  children,
  data,
  series,
  tooltipContent = (d) => series[0].valueAccessor(d).toString(),
  tooltipClassName = "",
  defaultTooltipIndex = null,
  margin: marginProp = {
    top: 12,
    right: 5,
    bottom: 32,
    left: 5
  },
  padding: paddingProp
}: {
  width: number;
  height: number;
} & TimeSeriesChartProps<T>) {
  const [leftAxisMargin, setLeftAxisMargin] = useState<number>();

  const margin = {
    ...marginProp,
    left: marginProp.left + (leftAxisMargin ?? 0)
  };

  const padding = paddingProp ?? {
    top: 0.1,
    bottom: type === "area" ? 0.1 : 0
  };

  const width = Math.max(0, outerWidth - margin.left - margin.right);
  const height = Math.max(0, outerHeight - margin.top - margin.bottom);

  const { startDate, endDate } = useMemo(() => {
    const dates = data.map(({ date }) => date);
    const times = dates.map((d) => d.getTime());

    return {
      startDate: dates[times.indexOf(Math.min(...times))],
      endDate: dates[times.indexOf(Math.max(...times))]
    };
  }, [data]);

  const { minY, maxY } = useMemo(() => {
    const values = series
      .filter(({ isActive }) => isActive !== false)
      .map(({ valueAccessor }) => data.map((d) => valueAccessor(d)))
      .flat()
      .filter((v): v is number => v != null);

    return {
      // Start at 0 for bar charts
      minY: type === "area" ? Math.min(...values) : Math.min(0, ...values),
      maxY: Math.max(...values)
    };
  }, [data, series, type]);

  const { yScale, xScale } = useMemo(() => {
    const rangeY = maxY - minY;
    return {
      yScale: scaleLinear<number>({
        domain: [minY - rangeY * (padding.bottom ?? 0), maxY + rangeY * (padding.top ?? 0)],
        range: [height, 0],
        nice: true,
        clamp: true
      }),
      xScale:
        type === "area"
          ? scaleUtc<number>({
              domain: [startDate, endDate],
              range: [0, width]
            })
          : scaleBand({
              domain: data.map(({ date }) => date),
              range: [0, width],
              padding: Math.min(0.75, (width / data.length) * 0.02),
              align: 0.5
            })
    };
  }, [startDate, endDate, minY, maxY, height, width, data, padding.top, padding.bottom, type]);

  const chartContext: ChartContextType<T> = {
    type,
    width,
    height,
    data,
    series,
    startDate,
    endDate,
    xScale: xScale as any,
    yScale,
    minY,
    maxY,
    margin,
    padding,
    tooltipContent,
    tooltipClassName,
    defaultTooltipIndex,
    leftAxisMargin,
    setLeftAxisMargin
  };

  const tooltipContext = useTooltip({
    seriesId: series[0].id,
    chartContext,
    defaultIndex: defaultTooltipIndex ?? undefined
  });

  const { containerRef } = tooltipContext;

  return (
    <ChartContext.Provider value={chartContext}>
      <ChartTooltipContext.Provider value={tooltipContext}>
        <svg width={outerWidth} height={outerHeight} ref={containerRef}>
          {children}
        </svg>
      </ChartTooltipContext.Provider>
    </ChartContext.Provider>
  );
}
