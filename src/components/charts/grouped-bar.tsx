"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  [key: string]: string | number;
}

interface SeriesDef {
  key: string;
  label: string;
  color: string;
}

interface GroupedBarChartProps {
  data: DataPoint[];
  categoryKey: string;
  series: SeriesDef[];
  height?: number;
  domain?: [number, number];
  showLegend?: boolean;
}

export function GroupedBarChart({
  data,
  categoryKey,
  series,
  height = 320,
  domain,
  showLegend = true,
}: GroupedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis
          dataKey={categoryKey}
          tick={{ fill: "#64748B", fontSize: 11 }}
          axisLine={{ stroke: "#CBD5E1" }}
        />
        <YAxis
          domain={domain}
          tick={{ fill: "#64748B", fontSize: 11 }}
          axisLine={{ stroke: "#CBD5E1" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="circle"
          />
        )}
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={s.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
