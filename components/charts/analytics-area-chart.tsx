import { Fragment } from "react";
import { Areas } from "./areas";
import { nFormatter } from "./nformatter";
import { TimeSeriesChart } from "./time-series-chart";
import { XAxis } from "./x-axis";
import { YAxis } from "./y-axis";
import { subDays } from "date-fns";
import { formatDateTooltip } from "./format-date-tooltip";
import { currencyFormatter } from "./currency-formatter";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/utils";

export const EVENT_TYPES = ["clicks", "leads", "sales"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export default function AnalyticsAreaChart({
  resource,
  demoData,
  showABTesting = false,
  height = 220
}: {
  resource: EventType;
  demoData: {
    date: Date;
    values: {
      clicks: number;
      leads: number;
      sales: number;
      saleAmount: number;
      clicksA?: number;
      clicksB?: number;
      clicksC?: number;
      leadsA?: number;
      leadsB?: number;
      leadsC?: number;
      salesA?: number;
      salesB?: number;
      salesC?: number;
      saleAmountA?: number;
      saleAmountB?: number;
      saleAmountC?: number;
    };
  }[];
  tkey?: string;
  showABTesting?: boolean;
  height?: number;
}) {
  const tcommon = useTranslations("landing");

  const RESOURCE_LABELS = {
    clicks: tcommon("analytics_chart.clicks"),
    leads: tcommon("analytics_chart.leads"),
    sales: tcommon("analytics_chart.sales"),
    saleAmount: tcommon("analytics_chart.saleAmount")
  };

  const chartData = demoData;

  // -30 days
  const start = subDays(new Date(), 30);
  const end = new Date();
  const interval = "day";
  const createdAt = new Date();
  const saleUnit = "saleAmount";

  const series = showABTesting
    ? [
        // Variation A (Blue)
        {
          id: "variation-a",
          valueAccessor: (d: any) => d.values[resource === "sales" ? `${saleUnit}A` : `${resource}A`] || 0,
          isActive: true,
          colorClassName: "text-[#3970ff]",
          strokeColor: "#3970ff",
          fillColor: "#3970ff",
          strokeWidth: 3,
          fillOpacity: 0.1
        },
        // Variation B (Green)
        {
          id: "variation-b",
          valueAccessor: (d: any) => d.values[resource === "sales" ? `${saleUnit}B` : `${resource}B`] || 0,
          isActive: true,
          colorClassName: "text-[#10B981]",
          strokeColor: "#10B981",
          fillColor: "#10B981",
          strokeWidth: 3,
          fillOpacity: 0.1
        },
        // Variation C (Red)
        {
          id: "variation-c",
          valueAccessor: (d: any) => d.values[resource === "sales" ? `${saleUnit}C` : `${resource}C`] || 0,
          isActive: true,
          colorClassName: "text-[#EF4444]",
          strokeColor: "#EF4444",
          fillColor: "#EF4444",
          strokeWidth: 3,
          fillOpacity: 0.1
        }
      ]
    : [
        {
          id: "clicks",
          valueAccessor: (d: any) => d.values.clicks,
          isActive: resource === "clicks",
          colorClassName: "text-[#3970ff]",
          strokeColor: "#3970ff",
          fillColor: "#E7EEFF"
        },
        {
          id: "leads",
          valueAccessor: (d: any) => d.values.leads,
          isActive: resource === "leads",
          colorClassName: "text-[#3970ff]",
          strokeColor: "#3970ff",
          fillColor: "#E7EEFF"
        },
        {
          id: "sales",
          valueAccessor: (d: any) => d.values[saleUnit],
          isActive: resource === "sales",
          colorClassName: "text-[#3970ff]",
          strokeColor: "#3970ff",
          fillColor: "#E7EEFF"
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
          return (
            <>
              <p className="border-b-[2px] border-neutral-100 px-2 py-1 text-xs text-neutral-900">
                {formatDateTooltip(d.date, {
                  interval: "day",
                  start,
                  end,
                  dataAvailableFrom: createdAt
                })}
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-1 py-1 text-xs">
                {showABTesting ? (
                  <>
                    <Fragment key="variation-a">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#3970ff] rounded-full"></div>
                        <p className="capitalize text-neutral-600">Variation A</p>
                      </div>
                      <p className="text-right font-medium text-neutral-900">
                        {resource === "sales" && saleUnit === "saleAmount"
                          ? currencyFormatter(d.values[`${saleUnit}A`] || 0, {
                              currency: tcommon("analytics_chart.currency")
                            })
                          : nFormatter(d.values[`${resource}A`] || 0, { full: true })}
                      </p>
                    </Fragment>
                    <Fragment key="variation-b">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <p className="capitalize text-neutral-600">Variation B</p>
                      </div>
                      <p className="text-right font-medium text-neutral-900">
                        {resource === "sales" && saleUnit === "saleAmount"
                          ? currencyFormatter(d.values[`${saleUnit}B`] || 0, {
                              currency: tcommon("analytics_chart.currency")
                            })
                          : nFormatter(d.values[`${resource}B`] || 0, { full: true })}
                      </p>
                    </Fragment>
                    <Fragment key="variation-c">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>
                        <p className="capitalize text-neutral-600">Variation C</p>
                      </div>
                      <p className="text-right font-medium text-neutral-900">
                        {resource === "sales" && saleUnit === "saleAmount"
                          ? currencyFormatter(d.values[`${saleUnit}C`] || 0, {
                              currency: tcommon("analytics_chart.currency")
                            })
                          : nFormatter(d.values[`${resource}C`] || 0, { full: true })}
                      </p>
                    </Fragment>
                  </>
                ) : (
                  <Fragment key={resource}>
                    <div className="flex items-center gap-2">
                      <p className="capitalize text-neutral-600">{RESOURCE_LABELS[resource]}</p>
                    </div>
                    <p className="text-right font-medium text-neutral-900">
                      {resource === "sales" && saleUnit === "saleAmount"
                        ? currencyFormatter(d.values[resource], {
                            currency: tcommon("analytics_chart.currency")
                          })
                        : nFormatter(d.values[resource], { full: true })}
                    </p>
                  </Fragment>
                )}
              </div>
            </>
          );
        }}
      >
        <Areas />
        <XAxis
          tickFormat={(d) =>
            formatDateTooltip(d, {
              interval,
              start,
              end,
              dataAvailableFrom: createdAt,
              locale: tcommon("analytics_chart.locale")
            })
          }
        />
        <YAxis
          showGridLines
          tickFormat={
            resource === "sales" && saleUnit === "saleAmount"
              ? (v) =>
                  currencyFormatter(v, {
                    currency: tcommon("analytics_chart.currency")
                  })
              : nFormatter
          }
        />
      </TimeSeriesChart>
    </div>
  );
}
