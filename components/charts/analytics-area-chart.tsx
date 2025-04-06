"use client";

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

export const EVENT_TYPES = ["clicks", "leads", "sales"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export default function AnalyticsAreaChart({
  resource,
  demoData,
  tkey,
}: {
  resource: EventType;
  demoData: {
    date: Date;
    values: {
      clicks: number;
      leads: number;
      sales: number;
      saleAmount: number;
    };
  }[];
  tkey: string;
}) {
  const t = useTranslations(tkey);

  const RESOURCE_LABELS = {
    clicks: t("analytics_chart.clicks"),
    leads: t("analytics_chart.leads"),
    sales: t("analytics_chart.sales"),
    saleAmount: t("analytics_chart.saleAmount"),
  };

  const chartData = demoData;

  // -30 days
  const start = subDays(new Date(), 30);
  const end = new Date();
  const interval = "day";
  const createdAt = new Date();
  const saleUnit = "saleAmount";

  const series = [
    {
      id: "clicks",
      valueAccessor: (d: any) => d.values.clicks,
      isActive: resource === "clicks",
    },
    {
      id: "leads",
      valueAccessor: (d: any) => d.values.leads,
      isActive: resource === "leads",
    },
    {
      id: "sales",
      valueAccessor: (d: any) => d.values[saleUnit],
      isActive: resource === "sales",
    },
  ];

  return (
    <div className="flex h-[220px] w-full items-center justify-center">
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
                  dataAvailableFrom: createdAt,
                })}
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-1 py-1 text-xs">
                <Fragment key={resource}>
                  <div className="flex items-center gap-2">
                    <p className="capitalize text-neutral-600">
                      {RESOURCE_LABELS[resource]}
                    </p>
                  </div>
                  <p className="text-right font-medium text-neutral-900">
                    {resource === "sales" && saleUnit === "saleAmount"
                      ? currencyFormatter(d.values[resource], {
                          currency: t("analytics_chart.currency"),
                        })
                      : nFormatter(d.values[resource], { full: true })}
                  </p>
                </Fragment>
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
              locale: t("analytics_chart.locale"),
            })
          }
        />
        <YAxis
          showGridLines
          tickFormat={
            resource === "sales" && saleUnit === "saleAmount"
              ? (v) =>
                  currencyFormatter(v, {
                    currency: t("analytics_chart.currency"),
                  })
              : nFormatter
          }
        />
      </TimeSeriesChart>
    </div>
  );
}
