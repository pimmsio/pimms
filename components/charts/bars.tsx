import { RectClipPath } from "@visx/clip-path";
import { Group } from "@visx/group";
import { BarRounded } from "@visx/shape";
import { AnimatePresence, motion } from "@/lib/framer-motion";
import { useId } from "react";
import { useChartContext } from "./chart-context";
import { cn } from "../../lib/utils";

export function Bars({
  seriesStyles
}: {
  seriesStyles?: {
    id: string;
    barClassName?: string;
    barFill?: string;
  }[];
}) {
  const clipPathId = useId();
  const { data, series, margin, xScale, yScale, width, height, startDate, endDate } = useChartContext();

  if (!("bandwidth" in xScale)) throw new Error("Bars require a band scale (type=bar)");

  return (
    <Group left={margin.left} top={margin.top}>
      <RectClipPath id={clipPathId} x={0} y={0} width={width} height={height} />
      <AnimatePresence>
        {series
          .filter(({ isActive }) => isActive)
          .map((s) => {
            const styles = seriesStyles?.find(({ id }) => id === s.id);
            return (
              // Prevent ugly x-scale animations when start/end dates change with unique key
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                key={`${s.id}_${startDate.toString()}_${endDate.toString()}`}
                clipPath={`url(#${clipPathId})`}
              >
                {/* Bars */}
                <motion.g initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.15, ease: "easeOut" }}>
                  {data.map((d) => {
                    const barWidth = xScale.bandwidth();
                    const x = xScale(d.date) ?? 0;
                    const y = yScale(s.valueAccessor(d) ?? 0);
                    const barHeight = height - y;
                    return barHeight > 0 ? (
                      <BarRounded
                        key={d.date.toString()}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        radius={4}
                        top
                        className={cn(s.colorClassName ?? "text-data-primary", styles?.barClassName)}
                        fill={styles?.barFill ?? (s as any).barFill ?? "var(--color-data-primary)"}
                        fillOpacity={1}
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth={1}
                      />
                    ) : null;
                  })}
                </motion.g>
              </motion.g>
            );
          })}
      </AnimatePresence>
    </Group>
  );
}
