"use client";

import { useMemo } from "react";
import MixedAnalyticsChart from "./mixed-analytics-chart";
import NumberFlow from "@number-flow/react";
import { subDays } from "date-fns";
import { useTranslations } from "next-intl";

export const AnalyticsDemo = ({ tkey }: { tkey: string }) => {
  const tcommon = useTranslations("landing");

  // generate different data for each tab
  // and compute total events for each tab
  const demoData = useMemo(() => {
    const dataClicks = [180, 230, 320, 305, 330, 290, 260, 320, 370, 330, 270, 310, 280, 210, 260, 230, 220, 160, 130];
    const dataLeads = [0, 8, 12, 0, 15, 0, 18, 0, 22, 25, 0, 20, 0, 12, 16, 28, 0, 14, 18];
    const dataSales = [0, 2, 3, 0, 4, 0, 5, 0, 6, 8, 0, 5, 0, 3, 4, 7, 0, 3, 4];

    return dataClicks
      .reverse()
      .map((value, index) => ({
        date: subDays(new Date(), index),
        values: {
          clicks: value,
          leads: dataLeads[index],
          sales: dataSales[index],
          saleAmount: dataSales[index] * 19
        }
      }))
      .reverse();
  }, []);

  const totalEvents = {
    clicks: demoData.reduce((acc, curr) => acc + curr.values.clicks, 0),
    leads: demoData.reduce((acc, curr) => acc + curr.values.leads, 0),
    sales: demoData.reduce((acc, curr) => acc + curr.values.saleAmount, 0)
  };

  return (
    <div className="overflow-hidden rounded-3xl md:rounded-l-xl md:rounded-r-none">
      <div className="grid gap-2 sm:gap-4 grid-cols-3 mx-4">
        <div className="rounded-lg bg-brand-secondary-light py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-data-clicks rounded-full"></div>
            <span>Clics</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            <NumberFlow
              value={totalEvents.clicks}
              format={{ notation: totalEvents.clicks > 999999 ? "compact" : "standard" }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-data-leads/20 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-data-leads rounded-full"></div>
            <span>Leads</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            <NumberFlow
              value={totalEvents.leads}
              format={{ notation: totalEvents.leads > 999999 ? "compact" : "standard" }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-data-sales/20 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-data-sales rounded-full"></div>
            <span>Ventes</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            <NumberFlow
              value={totalEvents.sales}
              format={{
                style: "currency",
                currency: tcommon("analytics_chart.currency"),
                trailingZeroDisplay: "stripIfInteger"
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full" style={{ height: 280 }}>
        <MixedAnalyticsChart resource="clicks" demoData={demoData} tkey={tkey} height={280} />
      </div>
    </div>
  );
};
