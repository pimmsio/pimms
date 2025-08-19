import { formatDateTooltip } from "./format-date-tooltip";
import { nFormatter } from "./nformatter";
import { currencyFormatter } from "./currency-formatter";
import { TimeSeriesChart } from "./time-series-chart";
import { XAxis } from "./x-axis";
import { YAxis } from "./y-axis";
import { subDays } from "date-fns";
import { useTranslations } from "next-intl";

import { MixedAreasAndBars } from "./mixed-areas-bars";
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
  showABTesting?: boolean;
  height?: number;
}) {
  const tcommon = useTranslations("landing");

  const chartData = demoData;

  // -30 days
  const start = subDays(new Date(), 30);
  const end = new Date();
  const interval = "day";
  const createdAt = new Date();

  // Mixed series: clicks as line, leads and sales as absolute values for bars
  const series = [
    {
      id: "clicks",
      valueAccessor: (d: any) => d.values.clicks,
      isActive: true,
      colorClassName: "text-[#3870FF]",
      type: "line" as const
    },
    {
      id: "leads",
      valueAccessor: (d: any) => d.values.leads,
      isActive: true,
      colorClassName: "text-[#FFD399]",
      type: "bar" as const,
      showHoverCircle: false, // Hide hover circle for bars
      excludeFromYScale: true // Exclude from Y-scale to not affect line chart scaling
    },
    {
      id: "sales",
      valueAccessor: (d: any) => d.values.saleAmount, // Use revenue amount, not sales count
      isActive: true,
      colorClassName: "text-[#00F5B8]",
      type: "bar" as const,
      showHoverCircle: false, // Hide hover circle for bars
      excludeFromYScale: true // Exclude from Y-scale to not affect line chart scaling
    }
  ];

  return (
    <div className="flex w-full items-center justify-center" style={{ height: `${height}px` }}>
      <TimeSeriesChart
        data={chartData}
        series={series}
        defaultTooltipIndex={chartData.length - 2}
        tooltipClassName="p-0"
        tooltipContent={(d) => {
          const clicks = d.values.clicks;
          const leads = d.values.leads;
          const salesCount = d.values.sales;
          const revenue = d.values.saleAmount || 0;
          const conversionRate = clicks > 0 ? (leads / clicks) * 100 : 0;

          return (
            <div
              className="bg-white rounded px-3 py-2.5 shadow-xl min-w-[180px] border-0"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-neutral-900 font-medium mb-2 text-sm">
                {formatDateTooltip(d.date, {
                  interval,
                  start,
                  end,
                  dataAvailableFrom: createdAt
                })}
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#3870FF] rounded-full"></div>
                    <span className="text-neutral-600 text-xs">Clicks</span>
                  </div>
                  <span className="text-neutral-900 font-semibold text-sm">{nFormatter(clicks, { full: true })}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-orange-300 rounded-full"></div>
                    <span className="text-neutral-600 text-xs">Leads</span>
                  </div>
                  <span className="text-neutral-900 font-semibold text-sm">{nFormatter(leads, { full: true })}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#00F5B8] rounded-full"></div>
                    <span className="text-neutral-600 text-xs">Revenue</span>
                  </div>
                  <span className="text-neutral-900 font-semibold text-sm">
                    {currencyFormatter(revenue, {
                      currency: tcommon("analytics_chart.currency")
                    })}
                  </span>
                </div>

                <div className="border-t border-neutral-100/80 pt-1.5 mt-1.5 space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Taux de conversion</span>
                    <span className="text-neutral-700 font-medium">{Math.round(conversionRate)}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      >
        <MixedAreasAndBars />
        <XAxis
          tickFormat={(d) =>
            formatDateTooltip(d, {
              interval,
              start,
              end,
              dataAvailableFrom: createdAt
            })
          }
        />
        <YAxis showGridLines tickFormat={nFormatter} />
      </TimeSeriesChart>
    </div>
  );
}
