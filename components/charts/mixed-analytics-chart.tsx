import { ResponsiveContainer, TimeSeriesChart, MixedAreasAndBars } from "./lightweight-chart";
export const EVENT_TYPES = ["clicks", "leads", "sales"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export default function MixedAnalyticsChart({
  demoData,
  height = 220
}: {
  resource?: EventType;
  demoData: {
    date: Date;
    values: {
      clicks: number;
      leads: number;
      sales: number;
      saleAmount: number;
    };
  }[];
  tkey?: string;
  height?: number;
}) {
  const chartData = demoData;

  // Mixed series: clicks as line, leads and sales as absolute values for bars
  const series = [
    {
      id: "clicks",
      valueAccessor: (d: any) => d.values.clicks,
      isActive: true,
      colorClassName: "text-data-clicks",
      strokeColor: "var(--color-data-clicks)",
      strokeWidth: 2.5,
      type: "line" as const
    },
    {
      id: "leads",
      valueAccessor: (d: any) => d.values.leads,
      isActive: true,
      colorClassName: "text-data-leads",
      barFill: "var(--color-data-leads)",
      type: "bar" as const,
      showHoverCircle: false, // Hide hover circle for bars
      excludeFromYScale: true // Exclude from Y-scale to not affect line chart scaling
    },
    {
      id: "sales",
      valueAccessor: (d: any) => d.values.saleAmount, // Use revenue amount, not sales count
      isActive: true,
      colorClassName: "text-data-sales",
      barFill: "var(--color-data-sales)",
      barOpacity: 1,
      type: "bar" as const,
      showHoverCircle: false,
      excludeFromYScale: true
    }
  ];

  return (
    <div className="chart-container relative w-full h-full overflow-hidden" style={{ height: `${height}px` }}>
      <ResponsiveContainer className="relative w-full h-full min-w-0">
        {({ width, height: containerHeight }) => {
          return (
            width > 0 &&
            containerHeight > 0 && (
              <TimeSeriesChart
                data={chartData}
                series={series}
                width={width}
                height={containerHeight}
                defaultTooltipIndex={chartData.length - 2}
                tooltipClassName="p-0"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                padding={{ top: 0, bottom: 0 }}
              >
                <MixedAreasAndBars />
              </TimeSeriesChart>
            )
          );
        }}
      </ResponsiveContainer>
    </div>
  );
}
