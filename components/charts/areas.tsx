import { Group } from "@visx/group";
import { Area, AreaClosed } from "@visx/shape";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useChartContext } from "./chart-context";
import { cn } from "../../lib/utils";

export function Areas() {
  const { data, series, margin, xScale, yScale, startDate, endDate } =
    useChartContext();

  if (!("ticks" in xScale))
    throw new Error("Areas require a time scale (type=area)");

  // Data with all values set to zero to animate from
  const zeroedData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      values: Object.fromEntries(Object.keys(d.values).map((key) => [key, 0])),
    })) as typeof data;
  }, [data]);

  return (
    <Group left={margin.left} top={margin.top}>
      <AnimatePresence>
        {series
          .filter(({ isActive }) => isActive)
          .map((s) => {
            return (
              <motion.g
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                key={`${s.id}_${startDate.toString()}_${endDate.toString()}`}
              >
                <AreaClosed
                  data={data}
                  x={(d) => xScale(d.date)}
                  y={(d) => yScale(s.valueAccessor(d) ?? 0)}
                  yScale={yScale}
                >
                  {({ path }) => {
                    return (
                      <motion.path
                        initial={{ d: path(zeroedData) || "", opacity: 0 }}
                        animate={{ d: path(data) || "", opacity: 1 }}
                        className={cn(s.colorClassName ?? "text-[#3970ff]")}
                        fill="#E7EEFF"
                      />
                    );
                  }}
                </AreaClosed>

                <Area
                  data={data}
                  x={(d) => xScale(d.date)}
                  y={(d) => yScale(s.valueAccessor(d) ?? 0)}
                >
                  {({ path }) => (
                    <motion.path
                      initial={{ d: path(zeroedData) || "" }}
                      animate={{ d: path(data) || "" }}
                      className={cn(s.colorClassName ?? "text-[#3970ff]")}
                      stroke="#3970ff"
                      strokeOpacity={1}
                      strokeWidth={3}
                      fill="transparent"
                    />
                  )}
                </Area>
              </motion.g>
            );
          })}
      </AnimatePresence>
    </Group>
  );
}
