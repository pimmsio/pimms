"use client";

import { useMemo, useState } from "react";
import { EventType } from "./analytics-area-chart";
import MixedAnalyticsChart from "./mixed-analytics-chart";
import NumberFlow from "@number-flow/react";
import { subDays } from "date-fns";
import { useTranslations } from "next-intl";

type Tab = {
  id: EventType;
  label: string;
};

export const AnalyticsDemo = ({
  tkey,
  showConversions = true,
  showABTesting = false
}: {
  tkey: string;
  showConversions?: boolean;
  showABTesting?: boolean;
}) => {
  const tcommon = useTranslations("landing");

  const tabs = useMemo(
    () =>
      [
        {
          id: "clicks",
          label: "Clicks"
        },
        ...(showConversions
          ? [
              {
                id: "leads",
                label: "Conversions"
              },
              {
                id: "sales",
                label: "Sales"
              }
            ]
          : [])
      ] as Tab[],
    [showConversions]
  );

  const [selectedTab, setSelectedTab] = useState("clicks");
  const tab = tabs.find(({ id }) => id === selectedTab) ?? tabs[0];

  // generate different data for each tab
  // and compute total events for each tab
  const demoData = useMemo(() => {
    const dataClicks = [180, 230, 320, 305, 330, 290, 340, 310, 380, 360, 270, 360, 280, 270, 350, 370, 350, 340, 300];
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
  }, [showABTesting]);

  const totalEvents = {
    clicks: demoData.reduce((acc, curr) => acc + curr.values.clicks, 0),
    leads: demoData.reduce((acc, curr) => acc + curr.values.leads, 0),
    sales: demoData.reduce((acc, curr) => acc + curr.values.saleAmount, 0)
  };

  // Original single variation display
  return (
    <div className="bg-card rounded-2xl p-3 sm:p-4">
      {/* Static KPI Cards */}
      <div className="grid gap-2 sm:gap-4 grid-cols-3">
        {/* Clicks Card */}
        <div className="rounded-lg border border-gray-200 bg-data-primary-light/10 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-data-primary rounded-full"></div>
            <span>Clics</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            <NumberFlow
              value={totalEvents.clicks}
              format={{ notation: totalEvents.clicks > 999999 ? "compact" : "standard" }}
            />
          </div>
        </div>

        {/* Leads Card */}
        <div className="rounded-lg border border-gray-200 bg-data-secondary-light/10 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-data-secondary rounded-full"></div>
            <span>Leads</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            <NumberFlow
              value={totalEvents.leads}
              format={{ notation: totalEvents.leads > 999999 ? "compact" : "standard" }}
            />
          </div>
        </div>

        {/* Sales Card */}
        <div className="rounded-lg border border-gray-200 bg-data-success-light/10 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-data-success rounded-full"></div>
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
      {/* Single Mixed Chart */}
      <div className="p-2 sm:p-4">
        <MixedAnalyticsChart resource="clicks" demoData={demoData} tkey={tkey} height={280} />
      </div>
    </div>
  );
};
