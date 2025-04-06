"use client";

import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import AnalyticsAreaChart, { EventType } from "./analytics-area-chart";
import NumberFlow from "@number-flow/react";
import { subDays } from "date-fns";
import { useTranslations } from "next-intl";

type Tab = {
  id: EventType;
  label: string;
};

export const AnalyticsDemo = ({ tkey }: { tkey: string }) => {
  const t = useTranslations(tkey);
  const RESOURCE_LABELS = {
    clicks: t("analytics_chart.clicks"),
    leads: t("analytics_chart.leads"),
    sales: t("analytics_chart.sales"),
    saleAmount: t("analytics_chart.saleAmount"),
  };

  const tabs = useMemo(
    () =>
      [
        {
          id: "clicks",
          label: "Clicks",
        },

        {
          id: "leads",
          label: "Conversions",
        },
        {
          id: "sales",
          label: "Sales",
        },
      ] as Tab[],
    []
  );

  const [selectedTab, setSelectedTab] = useState("clicks");
  const tab = tabs.find(({ id }) => id === selectedTab) ?? tabs[0];

  // generate different data for each tab
  // and compute total events for each tab
  const demoData = useMemo(() => {
    const dataClicks = [
      180, 230, 320, 305, 330, 290, 340, 310, 380, 360, 270, 360, 280, 270, 350,
      370, 350, 340, 300,
    ];

    const dataLeads = [
      34, 34, 51, 34, 43, 41, 63, 38, 56, 71, 41, 58, 31, 49, 56, 57, 46, 44,
      42,
    ];

    const dataSales = [
      11, 12, 15, 11, 13, 13, 21, 14, 12, 25, 10, 13, 9, 10, 21, 18, 15, 8, 13,
    ];

    return dataClicks
      .reverse()
      .map((value, index) => ({
        date: subDays(new Date(), index),
        values: {
          clicks: value,
          leads: dataLeads[index],
          sales: dataSales[index],
          saleAmount: dataSales[index] * 19,
        },
      }))
      .reverse();
  }, []);

  const totalEvents = {
    clicks: demoData.reduce((acc, curr) => acc + curr.values.clicks, 0),
    leads: demoData.reduce((acc, curr) => acc + curr.values.leads, 0),
    sales: demoData.reduce((acc, curr) => acc + curr.values.sales, 0),
  };

  return (
    <div className="bg-card">
      <div className="scrollbar-hide grid w-full grid-cols-3 divide-x divide-[#E7EEFF] overflow-y-hidden border-b-1 border-[#E7EEFF] rounded-t-2xl">
        {tabs.map(({ id }) => {
          return (
            <div key={id} className="relative z-0">
              <div
                className={cn(
                  "cursor-pointer border-box relative block h-full flex-none px-4 py-1",
                  "transition-colors hover:bg-[#E7EEFF] focus:outline-none active:bg-[#E7EEFF]",
                  "ring-inset ring-neutral-500 focus-visible:ring-1",
                  selectedTab === id && "bg-[#E7EEFF]"
                )}
                onClick={() => setSelectedTab(id)}
              >
                <div className="flex items-center gap-1 text-sm text-neutral-600">
                  <span>{RESOURCE_LABELS[id]}</span>
                </div>
                <div className="mt-1 flex h-8 items-center">
                  <NumberFlow
                    value={
                      id === "sales" && tab.id === "sales"
                        ? totalEvents.sales
                        : totalEvents[id]
                    }
                    className={cn("text-xl font-medium sm:text-xl")}
                    format={
                      id === "sales"
                        ? {
                            style: "currency",
                            currency: t("analytics_chart.currency"),
                            trailingZeroDisplay: "stripIfInteger",
                          }
                        : {
                            notation:
                              totalEvents[id] > 999999 ? "compact" : "standard",
                          }
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AnalyticsAreaChart resource={tab.id} demoData={demoData} tkey={tkey} />
    </div>
  );
};
