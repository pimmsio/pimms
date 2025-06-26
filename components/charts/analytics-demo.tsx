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
  const RESOURCE_LABELS = {
    clicks: tcommon("analytics_chart.clicks"),
    leads: tcommon("analytics_chart.leads"),
    sales: tcommon("analytics_chart.sales"),
    saleAmount: tcommon("analytics_chart.saleAmount")
  };

  console.log("showConversions", showConversions);

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
    const dataLeads = [34, 34, 51, 34, 43, 41, 63, 38, 56, 71, 41, 58, 31, 49, 56, 57, 46, 44, 42];
    const dataSales = [11, 12, 15, 11, 13, 13, 21, 14, 12, 25, 10, 13, 9, 10, 21, 18, 15, 8, 13];

    // For A/B/C testing, split total into 3 variations that add up
    const dataClicksA = showABTesting ? dataClicks.map((val) => Math.round(val * 0.35)) : [];
    const dataClicksB = showABTesting ? dataClicks.map((val) => Math.round(val * 0.42)) : [];
    const dataClicksC = showABTesting ? dataClicks.map((val) => Math.round(val * 0.23)) : [];

    const dataLeadsA = showABTesting ? dataLeads.map((val) => Math.round(val * 0.3)) : [];
    const dataLeadsB = showABTesting ? dataLeads.map((val) => Math.round(val * 0.45)) : [];
    const dataLeadsC = showABTesting ? dataLeads.map((val) => Math.round(val * 0.25)) : [];

    const dataSalesA = showABTesting ? dataSales.map((val) => Math.round(val * 0.28)) : [];
    const dataSalesB = showABTesting ? dataSales.map((val) => Math.round(val * 0.48)) : [];
    const dataSalesC = showABTesting ? dataSales.map((val) => Math.round(val * 0.24)) : [];

    return dataClicks
      .reverse()
      .map((value, index) => ({
        date: subDays(new Date(), index),
        values: {
          clicks: showABTesting ? dataClicksA[index] + dataClicksB[index] + dataClicksC[index] : value,
          leads: showABTesting ? dataLeadsA[index] + dataLeadsB[index] + dataLeadsC[index] : dataLeads[index],
          sales: showABTesting ? dataSalesA[index] + dataSalesB[index] + dataSalesC[index] : dataSales[index],
          saleAmount: showABTesting
            ? (dataSalesA[index] + dataSalesB[index] + dataSalesC[index]) * 19
            : dataSales[index] * 19,
          // A/B/C testing variations
          ...(showABTesting && {
            clicksA: dataClicksA[index],
            clicksB: dataClicksB[index],
            clicksC: dataClicksC[index],
            leadsA: dataLeadsA[index],
            leadsB: dataLeadsB[index],
            leadsC: dataLeadsC[index],
            salesA: dataSalesA[index],
            salesB: dataSalesB[index],
            salesC: dataSalesC[index],
            saleAmountA: dataSalesA[index] * 19,
            saleAmountB: dataSalesB[index] * 19,
            saleAmountC: dataSalesC[index] * 19
          })
        }
      }))
      .reverse();
  }, [showABTesting]);

  // Debug logging for A/B testing data
  if (showABTesting && typeof window !== "undefined") {
    console.log("A/B Testing Demo Data Sample:", {
      firstDataPoint: demoData[0],
      hasVariationB: !!demoData[0]?.values.clicksB,
      totalPoints: demoData.length
    });
  }

  const totalEvents = {
    clicks: demoData.reduce((acc, curr) => acc + curr.values.clicks, 0),
    leads: demoData.reduce((acc, curr) => acc + curr.values.leads, 0),
    sales: demoData.reduce((acc, curr) => acc + curr.values.sales, 0),
    ...(showABTesting && {
      clicksA: demoData.reduce((acc, curr) => acc + (curr.values.clicksA || 0), 0),
      clicksB: demoData.reduce((acc, curr) => acc + (curr.values.clicksB || 0), 0),
      clicksC: demoData.reduce((acc, curr) => acc + (curr.values.clicksC || 0), 0),
      leadsA: demoData.reduce((acc, curr) => acc + (curr.values.leadsA || 0), 0),
      leadsB: demoData.reduce((acc, curr) => acc + (curr.values.leadsB || 0), 0),
      leadsC: demoData.reduce((acc, curr) => acc + (curr.values.leadsC || 0), 0),
      salesA: demoData.reduce((acc, curr) => acc + (curr.values.salesA || 0), 0),
      salesB: demoData.reduce((acc, curr) => acc + (curr.values.salesB || 0), 0),
      salesC: demoData.reduce((acc, curr) => acc + (curr.values.salesC || 0), 0)
    })
  };

  if (showABTesting) {
    return (
      <div className="bg-card">
        {/* A/B/C Testing Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-[#E7EEFF] rounded-t-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">A/B/C Test Results</h3>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#3970ff] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Variation A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Variation B</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Variation C</span>
              </div>
            </div>
          </div>
        </div>

        {/* A/B/C Testing Metrics */}
        <div className="grid w-full grid-cols-3 divide-x divide-[#E7EEFF] border-b border-[#E7EEFF]">
          {tabs.map(({ id }) => {
            const total = totalEvents[id] || 0;
            const valueA = totalEvents[`${id}A` as keyof typeof totalEvents] || 0;
            const valueB = totalEvents[`${id}B` as keyof typeof totalEvents] || 0;
            const valueC = totalEvents[`${id}C` as keyof typeof totalEvents] || 0;

            const percentA = total > 0 ? (valueA / total) * 100 : 0;
            const percentB = total > 0 ? (valueB / total) * 100 : 0;
            const percentC = total > 0 ? (valueC / total) * 100 : 0;

            return (
              <div key={id} className="relative z-0">
                <div
                  className={cn(
                    "cursor-pointer border-box relative block h-full flex-none px-4 py-3",
                    "transition-colors hover:bg-[#E7EEFF] focus:outline-none active:bg-[#E7EEFF]",
                    "ring-inset ring-neutral-500 focus-visible:ring-1",
                    selectedTab === id && "bg-[#E7EEFF]"
                  )}
                  onClick={() => setSelectedTab(id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-neutral-600">{RESOURCE_LABELS[id]}</span>
                    <NumberFlow
                      value={total}
                      className="text-lg font-bold text-gray-800"
                      format={
                        id === "sales"
                          ? {
                              style: "currency",
                              currency: tcommon("analytics_chart.currency"),
                              trailingZeroDisplay: "stripIfInteger"
                            }
                          : {
                              notation: total > 999999 ? "compact" : "standard"
                            }
                      }
                    />
                  </div>

                  {/* Variation A */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3970ff] rounded-full"></div>
                      <span className="text-xs text-gray-500">A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <NumberFlow
                        value={valueA}
                        className="text-xs font-medium"
                        format={
                          id === "sales"
                            ? {
                                style: "currency",
                                currency: tcommon("analytics_chart.currency"),
                                trailingZeroDisplay: "stripIfInteger"
                              }
                            : { notation: "standard" }
                        }
                      />
                      <span className="text-xs text-gray-400">({percentA.toFixed(0)}%)</span>
                    </div>
                  </div>

                  {/* Variation B */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                      <span className="text-xs text-gray-500">B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <NumberFlow
                        value={valueB}
                        className="text-xs font-medium"
                        format={
                          id === "sales"
                            ? {
                                style: "currency",
                                currency: tcommon("analytics_chart.currency"),
                                trailingZeroDisplay: "stripIfInteger"
                              }
                            : { notation: "standard" }
                        }
                      />
                      <span className="text-xs text-gray-400">({percentB.toFixed(0)}%)</span>
                    </div>
                  </div>

                  {/* Variation C */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>
                      <span className="text-xs text-gray-500">C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <NumberFlow
                        value={valueC}
                        className="text-xs font-medium"
                        format={
                          id === "sales"
                            ? {
                                style: "currency",
                                currency: tcommon("analytics_chart.currency"),
                                trailingZeroDisplay: "stripIfInteger"
                              }
                            : { notation: "standard" }
                        }
                      />
                      <span className="text-xs text-gray-400">({percentC.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Chart */}
        <div className="h-[320px]">
          <AnalyticsAreaChart
            resource={tab.id}
            demoData={demoData}
            tkey={tkey}
            showABTesting={showABTesting}
            height={320}
          />
        </div>
      </div>
    );
  }

  // Original single variation display
  return (
    <div className="bg-card">
      <div
        className={`scrollbar-hide grid w-full grid-cols-3 divide-x divide-[#E7EEFF] overflow-y-hidden border-b-1 border-[#E7EEFF] rounded-t-2xl`}
      >
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
                    value={id === "sales" && tab.id === "sales" ? totalEvents.sales : totalEvents[id]}
                    className={cn("text-xl font-medium sm:text-xl")}
                    format={
                      id === "sales"
                        ? {
                            style: "currency",
                            currency: tcommon("analytics_chart.currency"),
                            trailingZeroDisplay: "stripIfInteger"
                          }
                        : {
                            notation: totalEvents[id] > 999999 ? "compact" : "standard"
                          }
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AnalyticsAreaChart resource={tab.id} demoData={demoData} tkey={tkey} height={280} />
    </div>
  );
};
