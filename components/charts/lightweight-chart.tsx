import React, { useId, useMemo, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Lightweight alternatives to @visx types
export type Datum = Record<string, any>;

export type TimeSeriesDatum<T extends Datum = any> = {
  date: Date;
  values: T;
};

export type AccessorFn<T extends Datum, TValue = number> = (datum: TimeSeriesDatum<T>) => TValue;

export type Series<T extends Datum = any, TValue = number> = {
  id: string;
  isActive?: boolean;
  valueAccessor: AccessorFn<T, TValue>;
  colorClassName?: string;
  strokeColor?: string;
  strokeWidth?: number;
  type?: "line" | "bar";
  barFill?: string;
  showHoverCircle?: boolean;
  excludeFromYScale?: boolean;
};

export type Data<T extends Datum> = TimeSeriesDatum<T>[];

// Lightweight scale functions (replacing @visx/scale)
export const createLinearScale = (domain: [number, number], range: [number, number]) => {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const domainSpan = domainMax - domainMin;
  const rangeSpan = rangeMax - rangeMin;

  return (value: number) => {
    const normalized = (value - domainMin) / domainSpan;
    return rangeMin + normalized * rangeSpan;
  };
};

export const createTimeScale = (domain: [Date, Date], range: [number, number]) => {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const domainSpan = domainMax.getTime() - domainMin.getTime();
  const rangeSpan = rangeMax - rangeMin;

  return (value: Date) => {
    const normalized = (value.getTime() - domainMin.getTime()) / domainSpan;
    return rangeMin + normalized * rangeSpan;
  };
};

export const createBandScale = (domain: Date[], range: [number, number], padding = 0.1) => {
  const [rangeMin, rangeMax] = range;
  const rangeSpan = rangeMax - rangeMin;
  const step = rangeSpan / domain.length;
  const bandwidth = step * (1 - padding);

  const scale = (value: Date) => {
    const index = domain.findIndex((d) => d.getTime() === value.getTime());
    return rangeMin + index * step + (step - bandwidth) / 2;
  };

  scale.bandwidth = () => bandwidth;
  return scale;
};

// Lightweight curve function (replacing @visx/curve) - smooth monotone X interpolation
export const curveMonotoneX = (points: [number, number][]) => {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0][0]} ${points[0][1]} L ${points[1][0]} ${points[1][1]}`;
  }

  // Calculate tangents for smooth monotone cubic interpolation
  const tangents: number[] = [];
  const n = points.length;

  // Calculate slopes between consecutive points
  const slopes: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    slopes[i] = (points[i + 1][1] - points[i][1]) / (points[i + 1][0] - points[i][0]);
  }

  // Calculate tangents
  tangents[0] = slopes[0];
  for (let i = 1; i < n - 1; i++) {
    const s0 = slopes[i - 1];
    const s1 = slopes[i];

    if (s0 * s1 <= 0) {
      tangents[i] = 0;
    } else {
      tangents[i] = (s0 + s1) / 2;
    }
  }
  tangents[n - 1] = slopes[n - 2];

  // Build path with cubic bezier curves
  const path = [`M ${points[0][0]} ${points[0][1]}`];

  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const dx = x1 - x0;

    const cp1x = x0 + dx / 3;
    const cp1y = y0 + (tangents[i] * dx) / 3;
    const cp2x = x1 - dx / 3;
    const cp2y = y1 - (tangents[i + 1] * dx) / 3;

    path.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x1} ${y1}`);
  }

  return path.join(" ");
};

// Responsive container (replacing @visx/responsive)
interface ResponsiveContainerProps {
  children: (dimensions: { width: number; height: number }) => React.ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full min-w-0", className)}>
      {dimensions.width > 0 && dimensions.height > 0 && children(dimensions)}
    </div>
  );
};

// Chart context
interface ChartContextType<T extends Datum = any> {
  data: Data<T>;
  series: Series<T>[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  xScale: (value: Date) => number;
  yScale: (value: number) => number;
  startDate: Date;
  endDate: Date;
}

const ChartContext = React.createContext<ChartContextType | null>(null);

export const useChartContext = <T extends Datum>(): ChartContextType<T> => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChartContext must be used within a TimeSeriesChart");
  }
  return context as ChartContextType<T>;
};

// Main chart component
interface TimeSeriesChartProps<T extends Datum> {
  data: Data<T>;
  series: Series<T>[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  padding?: { top: number; bottom: number };
  children?: React.ReactNode;
  type?: "area" | "bar";
  defaultTooltipIndex?: number | null;
  tooltipClassName?: string;
}

export const TimeSeriesChart = <T extends Datum>({
  data,
  series,
  width: outerWidth,
  height: outerHeight,
  margin: marginProp = { top: 12, right: 5, bottom: 32, left: 5 },
  padding: paddingProp = { top: 0.1, bottom: 0.1 },
  children,
  type = "area"
}: TimeSeriesChartProps<T>) => {
  const width = Math.max(0, outerWidth - marginProp.left - marginProp.right);
  const height = Math.max(0, outerHeight - marginProp.top - marginProp.bottom);

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
      minY: type === "area" ? Math.min(...values) : Math.min(0, ...values),
      maxY: Math.max(...values)
    };
  }, [data, series, type]);

  const { yScale, xScale } = useMemo(() => {
    const rangeY = maxY - minY;
    const yScale = createLinearScale(
      [minY - rangeY * paddingProp.bottom, maxY + rangeY * paddingProp.top],
      [height, 0]
    );

    const xScale =
      type === "area"
        ? createTimeScale([startDate, endDate], [0, width])
        : createBandScale(
            data.map(({ date }) => date),
            [0, width],
            0.1
          );

    return { yScale, xScale };
  }, [startDate, endDate, minY, maxY, height, width, data, paddingProp, type]);

  const contextValue: ChartContextType<T> = {
    data,
    series,
    width,
    height,
    margin: marginProp,
    xScale,
    yScale,
    startDate,
    endDate
  };

  return (
    <ChartContext.Provider value={contextValue}>
      <svg width={outerWidth} height={outerHeight}>
        {children}
      </svg>
    </ChartContext.Provider>
  );
};

// Lightweight Group component (replacing @visx/group)
export const Group: React.FC<{ left?: number; top?: number; children: React.ReactNode }> = ({
  left = 0,
  top = 0,
  children
}) => <g transform={`translate(${left}, ${top})`}>{children}</g>;

// Lightweight RectClipPath (replacing @visx/clip-path)
export const RectClipPath: React.FC<{ id: string; x: number; y: number; width: number; height: number }> = ({
  id,
  x,
  y,
  width,
  height
}) => (
  <defs>
    <clipPath id={id}>
      <rect x={x} y={y} width={width} height={height} />
    </clipPath>
  </defs>
);

// Lightweight Area component (replacing @visx/shape)
interface AreaProps {
  x: (d: any) => number;
  y: (d: any) => number;
  children: (props: { path: (data: any[]) => string }) => React.ReactNode;
}

export const Area: React.FC<AreaProps> = ({ x, y, children }) => {
  const path = (pathData: any[]) => {
    const points: [number, number][] = pathData.map((d) => [x(d), y(d)]);
    return curveMonotoneX(points);
  };

  return <>{children({ path })}</>;
};

// Lightweight AreaClosed component
interface AreaClosedProps extends AreaProps {
  yScale: (value: number) => number;
}

export const AreaClosed: React.FC<AreaClosedProps> = ({ x, y, yScale, children }) => {
  const path = (pathData: any[]) => {
    const points: [number, number][] = pathData.map((d) => [x(d), y(d)]);
    const pathStr = curveMonotoneX(points);

    // Close the path to the bottom
    if (points.length > 0) {
      const firstX = points[0][0];
      const lastX = points[points.length - 1][0];
      const bottom = yScale(0);
      return `${pathStr} L ${lastX} ${bottom} L ${firstX} ${bottom} Z`;
    }

    return pathStr;
  };

  return <>{children({ path })}</>;
};

// Lightweight BarRounded component
interface BarRoundedProps {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  fill: string;
  className?: string;
  bottom?: boolean;
  top?: boolean;
}

export const BarRounded: React.FC<BarRoundedProps> = ({
  x,
  y,
  width,
  height,
  radius,
  fill,
  className,
  bottom = false,
  top = false
}) => {
  // Force a bigger radius to make it more visible
  const r = Math.min(Math.max(radius, 8), width / 2, height / 2);

  let path: string;

  if (bottom && !top) {
    // ORANGE BARS - Rounded bottom corners ONLY
    path = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height - r} Q ${x + width} ${y + height} ${x + width - r} ${y + height} L ${x + r} ${y + height} Q ${x} ${y + height} ${x} ${y + height - r} Z`;
  } else if (top && !bottom) {
    // GREEN BARS - Rounded top corners ONLY
    path = `M ${x} ${y + height} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + width - r} ${y} Q ${x + width} ${y} ${x + width} ${y + r} L ${x + width} ${y + height} Z`;
  } else {
    // SQUARE BARS
    path = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
  }

  return <path d={path} fill={fill} className={className} />;
};

// Mixed Areas and Bars component (exact replica of the @visx version)
export function MixedAreasAndBars() {
  const clipPathId = useId();
  const { data, series, margin, xScale, yScale, width, height, startDate, endDate } = useChartContext();

  // Removed zeroedData since we're not using framer-motion animations anymore

  // Separate line and bar series
  const lineSeries = series.filter((s: any) => s.type === "line" || s.id === "clicks");
  const barSeries = series.filter((s: any) => s.type === "bar");

  // Calculate bar width based on scale type
  const barWidth = "bandwidth" in xScale ? (xScale as any).bandwidth() : Math.max(2, (width / data.length) * 0.4);

  return (
    <Group left={margin.left} top={margin.top}>
      <RectClipPath id={clipPathId} x={0} y={0} width={width} height={height} />

      {/* Render bars first (behind lines) */}
      {barSeries
        .filter(({ isActive }: any) => isActive)
        .map((s: any) => (
          <g
            key={`${s.id}_${startDate.toString()}_${endDate.toString()}`}
            clipPath={`url(#${clipPathId})`}
            style={{
              opacity: 1,
              transition: "opacity 0.1s ease-in-out"
            }}
          >
            {data.map((d: any, i: number) => {
              const value = s.valueAccessor(d) ?? 0;
              const x = (xScale(d.date) ?? 0) - barWidth / 2;

              if (s.id === "leads") {
                // Leads bars (orange) - scale to max 30% of chart height, rounded bottom only
                const maxLeads = Math.max(...data.map((d: any) => d.values.leads || 0));
                const leadsHeight = maxLeads > 0 ? (value / maxLeads) * (height * 0.5) : 0;
                const leadsY = height - leadsHeight;

                return value > 0 ? (
                  <g key={i}>
                    <BarRounded
                      x={x}
                      y={leadsY}
                      width={barWidth}
                      height={leadsHeight}
                      radius={Math.min(barWidth / 2, leadsHeight / 2, 4)}
                      bottom={true}
                      top={false}
                      fill={(s as any).barFill ?? "var(--color-vibrant-orange)"}
                      className={cn(s.colorClassName ?? "text-vibrant-orange")}
                    />
                  </g>
                ) : null;
              } else if (s.id === "sales") {
                // Sales bars (green) stack on top of leads - scale to max 20% of chart height, rounded top only
                const leadsValue = barSeries.find((bs: any) => bs.id === "leads")?.valueAccessor(d) ?? 0;
                const maxLeads = Math.max(...data.map((d: any) => d.values.leads || 0));
                const maxRevenue = Math.max(...data.map((d: any) => d.values.saleAmount || 0));

                const leadsHeight = maxLeads > 0 ? (leadsValue / maxLeads) * (height * 0.5) : 0;
                const salesHeight = maxRevenue > 0 ? (value / maxRevenue) * (height * 0.2) : 0;
                const salesY = height - leadsHeight - salesHeight;

                return value > 0 ? (
                  <g key={i}>
                    <BarRounded
                      x={x}
                      y={salesY}
                      width={barWidth}
                      height={salesHeight}
                      radius={Math.min(barWidth / 2, salesHeight / 2, 4)}
                      top={true}
                      bottom={false}
                      fill={(s as any).barFill ?? "var(--color-data-sales)"}
                      className={cn(s.colorClassName ?? "text-data-sales")}
                    />
                  </g>
                ) : null;
              }

              return null;
            })}
          </g>
        ))}

      {/* Render lines on top */}
      {lineSeries
        .filter(({ isActive }: any) => isActive)
        .map((s: any) => (
          <g
            key={`${s.id}_line`}
            style={{
              opacity: 1,
              transition: "opacity 0.3s ease-in-out"
            }}
          >
            {/* Gradient definitions */}
            <defs>
              <mask id={`${s.id}-line-mask`}>
                <rect width={width} height={height} fill="black" />
                <Area x={(d: any) => xScale(d.date) ?? 0} y={(d: any) => yScale(s.valueAccessor(d) ?? 0)}>
                  {({ path }) => (
                    <g>
                      <path
                        d={path(data) || ""}
                        stroke="white"
                        strokeWidth="30"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.1"
                      />
                      <path
                        d={path(data) || ""}
                        stroke="white"
                        strokeWidth="20"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.3"
                      />
                    </g>
                  )}
                </Area>
              </mask>

              <linearGradient
                id={`${s.id}-area-gradient`}
                gradientUnits="userSpaceOnUse"
                x1={0}
                y1={0}
                x2={0}
                y2={height}
              >
                <stop offset="0%" stopColor="var(--color-brand-secondary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-brand-secondary)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* Area fill with gradient following the line */}
            <g mask={`url(#${s.id}-line-mask)`}>
              <rect width={width} height={height} fill={`url(#${s.id}-area-gradient)`} />
            </g>

            {/* Regular area fill */}
            <AreaClosed
              x={(d: any) => xScale(d.date) ?? 0}
              y={(d: any) => yScale(s.valueAccessor(d) ?? 0)}
              yScale={yScale}
            >
              {({ path }) => (
                <path
                  d={path(data) || ""}
                  fill={`url(#${s.id}-area-gradient)`}
                  mask={`url(#${s.id}-line-mask)`}
                  style={{
                    opacity: 1,
                    transition: "opacity 0.3s ease-in-out"
                  }}
                />
              )}
            </AreaClosed>

            {/* Line */}
            <Area x={(d: any) => xScale(d.date) ?? 0} y={(d: any) => yScale(s.valueAccessor(d) ?? 0)}>
              {({ path }) => (
                <path
                  d={path(data) || ""}
                  className={cn(s.colorClassName ?? "text-data-clicks")}
                  stroke={(s as any).strokeColor ?? "var(--color-data-clicks)"}
                  strokeOpacity={1}
                  strokeWidth={(s as any).strokeWidth ?? 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="transparent"
                  style={{
                    transition: "all 0.3s ease-in-out"
                  }}
                />
              )}
            </Area>
          </g>
        ))}
    </Group>
  );
}
