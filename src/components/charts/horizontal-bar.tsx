"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface DataPoint {
  [key: string]: string | number;
}

interface BarChartProps {
  data: DataPoint[];
  dataKey: string;
  categoryKey: string;
  color?: string;
  threshold?: number;
  thresholdColor?: string;
  showLabels?: boolean;
  height?: number;
  unit?: string;
}

const NAVY = "#1E3A6B";
const CORAL = "#FF6B4A";

export function HorizontalBarChart({
  data,
  dataKey,
  categoryKey,
  color = NAVY,
  threshold,
  thresholdColor = CORAL,
  showLabels = true,
  height = 320,
  unit = "",
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: "#64748B", fontSize: 11 }}
          axisLine={{ stroke: "#CBD5E1" }}
          unit={unit}
        />
        <YAxis
          type="category"
          dataKey={categoryKey}
          tick={{ fill: "#1E3A6B", fontSize: 11, fontWeight: 500 }}
          axisLine={{ stroke: "#CBD5E1" }}
          width={110}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(value: number) => [`${value}${unit}`, ""]}
        />
        <Bar dataKey={dataKey} radius={[0, 6, 6, 0]}>
          {data.map((entry, idx) => {
            const val = entry[dataKey] as number;
            const cellColor =
              threshold !== undefined && val > threshold ? thresholdColor : color;
            return <Cell key={`cell-${idx}`} fill={cellColor} />;
          })}
          {showLabels && (
            <LabelList
              dataKey={dataKey}
              position="right"
              style={{ fill: "#1E3A6B", fontSize: 11, fontWeight: 600 }}
              formatter={(v: number) => `${v}${unit}`}
            />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
