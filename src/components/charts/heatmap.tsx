"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { HeatmapCell } from "@/lib/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface HeatmapProps {
  data: HeatmapCell[];
  height?: number;
}

export function PartnerRegionHeatmap({ data, height = 460 }: HeatmapProps) {
  const { partners, regions, z, customData } = useMemo(() => {
    const partners = Array.from(new Set(data.map((d) => d.partner))).sort();
    const regions = Array.from(new Set(data.map((d) => d.region))).sort();

    const lookup: Record<string, HeatmapCell> = {};
    data.forEach((d) => {
      lookup[`${d.partner}::${d.region}`] = d;
    });

    const z = partners.map((p) =>
      regions.map((r) => lookup[`${p}::${r}`]?.delayRate ?? null)
    );
    const customData = partners.map((p) =>
      regions.map((r) => lookup[`${p}::${r}`]?.total ?? 0)
    );

    return { partners, regions, z, customData };
  }, [data]);

  return (
    <Plot
      data={[
        {
          type: "heatmap",
          x: regions,
          y: partners,
          z,
          customdata: customData as never,
          colorscale: [
            [0, "#14B8A6"],
            [0.5, "#FCD34D"],
            [1, "#FF6B4A"],
          ],
          zmin: 20,
          zmax: 35,
          showscale: true,
          colorbar: {
            title: { text: "Delay Rate (%)", side: "right" },
            tickfont: { size: 10, color: "#64748B" },
            len: 0.8,
          },
          hovertemplate:
            "<b>%{y}</b> × <b>%{x}</b><br>Delay Rate: %{z:.1f}%<br>Total: %{customdata}<extra></extra>",
          xgap: 2,
          ygap: 2,
        } as never,
      ]}
      layout={{
        autosize: true,
        height,
        margin: { l: 110, r: 30, t: 30, b: 60 },
        xaxis: {
          title: { text: "Region" },
          tickfont: { size: 11, color: "#1E3A6B" },
          side: "bottom",
        },
        yaxis: {
          title: { text: "Partner" },
          tickfont: { size: 11, color: "#1E3A6B" },
          autorange: "reversed",
        },
        font: { family: "Calibri, sans-serif" },
        plot_bgcolor: "white",
        paper_bgcolor: "white",
        annotations: partners.flatMap((p, i) =>
          regions.map((r, j) => ({
            x: r,
            y: p,
            text: `${(z[i][j] ?? 0).toFixed(1)}`,
            showarrow: false,
            font: { color: "#1E3A6B", size: 11 },
          }))
        ),
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%" }}
    />
  );
}
