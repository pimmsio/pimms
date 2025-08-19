"use client";

import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import AnalyticsAreaChart, { EventType } from "./analytics-area-chart";
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
    const dataLeads = [0, 8, 12, 0, 15, 0, 18, 0, 22, 25, 0, 20, 0, 12, 16, 28, 0, 14, 18];
    const dataSales = [0, 2, 3, 0, 4, 0, 5, 0, 6, 8, 0, 5, 0, 3, 4, 7, 0, 3, 4];

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
    sales: demoData.reduce((acc, curr) => acc + curr.values.saleAmount, 0),
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
      <div className="bg-card rounded-2xl">
        {/* A/B/C Testing Header */}
        <div className="p-4">
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
    <div className="bg-card rounded-2xl">
      {/* Static KPI Cards */}
      <div className="grid gap-1 sm:gap-4 grid-cols-3 p-2">
        {/* Clicks Card */}
        <div className="rounded-lg border border-gray-200 bg-blue-50/50 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-[#3870FF] rounded-full"></div>
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
        <div className="rounded-lg border border-gray-200 bg-orange-50/50 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-[#FFD399] rounded-full"></div>
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
        <div className="rounded-lg border border-gray-200 bg-green-50/50 py-2 px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
            <div className="w-2 h-2 bg-[#00F5B8] rounded-full"></div>
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
      <MixedAnalyticsChart resource="clicks" demoData={demoData} tkey={tkey} height={280} />
    </div>
  );
};
