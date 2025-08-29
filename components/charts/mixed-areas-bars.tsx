import { cn } from "@/lib/utils";
import { LinearGradient } from "@visx/gradient";
import { RectClipPath } from "@visx/clip-path";
import { Group } from "@visx/group";
import { Area, AreaClosed } from "@visx/shape";
import { BarRounded } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo } from "react";
import { useChartContext } from "./chart-context";

export function MixedAreasAndBars() {
  const clipPathId = useId();
  const { data, series, margin, xScale, yScale, width, height, startDate, endDate } = useChartContext();

  // Data with all values set to zero to animate from
  const zeroedData = useMemo(() => {
    return data.map((d: any) => ({
      ...d,
      values: Object.fromEntries(Object.keys(d.values).map((key: string) => [key, 0]))
    })) as typeof data;
  }, [data]);

  // Separate line and bar series
  const lineSeries = series.filter((s: any) => s.type === "line" || s.id === "clicks");
  const barSeries = series.filter((s: any) => s.type === "bar");

  // Calculate bar width based on scale type
  const barWidth = "bandwidth" in xScale ? xScale.bandwidth() : Math.max(2, (width / data.length) * 0.4);

  return (
    <Group left={margin.left} top={margin.top}>
      <RectClipPath id={clipPathId} x={0} y={0} width={width} height={height} />

      {/* Render bars first (behind lines) */}
      <AnimatePresence>
        {barSeries
          .filter(({ isActive }: any) => isActive)
          .map((s: any) => (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={`${s.id}_${startDate.toString()}_${endDate.toString()}`}
              clipPath={`url(#${clipPathId})`}
            >
              {data.map((d: any, i: number) => {
                const value = s.valueAccessor(d) ?? 0;
                const x = (xScale(d.date) ?? 0) - barWidth / 2;

                if (s.id === "leads") {
                  // Leads bars - scale to max 30% of chart height
                  const maxLeads = Math.max(...data.map((d: any) => d.values.leads || 0));
                  const leadsHeight = maxLeads > 0 ? (value / maxLeads) * (height * 0.3) : 0;
                  const leadsY = height - leadsHeight;

                  return value > 0 ? (
                    <motion.g key={i}>
                      <BarRounded
                        x={x}
                        y={leadsY}
                        width={barWidth}
                        height={leadsHeight}
                        radius={4}
                        fill={(s as any).barFill ?? "var(--color-vibrant-orange)"}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth={1}
                        className={cn(s.colorClassName ?? "text-vibrant-orange")}
                      />
                    </motion.g>
                  ) : null;
                } else if (s.id === "sales") {
                  // Sales bars stack on top of leads - scale to max 20% of chart height
                  const leadsValue = barSeries.find((bs: any) => bs.id === "leads")?.valueAccessor(d) ?? 0;
                  const maxLeads = Math.max(...data.map((d: any) => d.values.leads || 0));
                  const maxRevenue = Math.max(...data.map((d: any) => d.values.saleAmount || 0));

                  const leadsHeight = maxLeads > 0 ? (leadsValue / maxLeads) * (height * 0.3) : 0;
                  const salesHeight = maxRevenue > 0 ? (value / maxRevenue) * (height * 0.2) : 0;
                  const salesY = height - leadsHeight - salesHeight;

                  return value > 0 ? (
                    <motion.g key={i}>
                      <BarRounded
                        x={x}
                        y={salesY}
                        width={barWidth}
                        height={salesHeight}
                        radius={4}
                        fill={(s as any).barFill ?? "var(--color-data-sales)"}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth={1}
                        className={cn(s.colorClassName ?? "text-data-sales")}
                      />
                    </motion.g>
                  ) : null;
                }

                return null;
              })}
            </motion.g>
          ))}
      </AnimatePresence>

      {/* Render lines on top */}
      <AnimatePresence>
        {lineSeries
          .filter(({ isActive }: any) => isActive)
          .map((s: any) => (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={`${s.id}_line`}
            >
              {/* Line gradient for area fill */}
              <LinearGradient
                className="text-zinc-50"
                id={`${s.id}-area-gradient`}
                fromOffset="0%"
                from="var(--color-brand-secondary)"
                fromOpacity={0.25}
                toOffset="50%"
                to="var(--color-brand-secondary-light)"
                toOpacity={0}
                x1={0}
                x2={0}
                y1={0}
                y2={1}
              />

              {/* Area fill */}
              <AreaClosed
                data={data}
                x={(d: any) => xScale(d.date) ?? 0}
                y={(d: any) => yScale(s.valueAccessor(d) ?? 0)}
                yScale={yScale}
                curve={curveMonotoneX}
              >
                {({ path }) => (
                  <motion.path
                    initial={{ d: path(zeroedData) || "", opacity: 0 }}
                    animate={{ d: path(data) || "", opacity: 1 }}
                    fill={`url(#${s.id}-area-gradient)`}
                  />
                )}
              </AreaClosed>

              {/* Line */}
              <Area
                data={data}
                x={(d: any) => xScale(d.date) ?? 0}
                y={(d: any) => yScale(s.valueAccessor(d) ?? 0)}
                curve={curveMonotoneX}
              >
                {({ path }) => (
                  <motion.path
                    initial={{ d: path(zeroedData) || "" }}
                    animate={{ d: path(data) || "" }}
                    className={cn(s.colorClassName ?? "text-data-clicks")}
                    stroke={(s as any).strokeColor ?? "var(--color-data-clicks)"}
                    strokeOpacity={1}
                    strokeWidth={(s as any).strokeWidth ?? 2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="transparent"
                  />
                )}
              </Area>
            </motion.g>
          ))}
      </AnimatePresence>
    </Group>
  );
}
