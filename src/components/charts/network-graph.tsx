"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { GraphData, GraphNode, GraphEdge } from "@/lib/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const NODE_COLORS: Record<string, string> = {
  Partner: "#FF6B4A",
  Region: "#1E3A6B",
  PackageType: "#14B8A6",
  VehicleType: "#3B5C99",
};

interface NetworkGraphProps {
  data: GraphData;
  height?: number;
  highlightDelayThreshold?: number;
}

export function NetworkGraph({
  data,
  height = 600,
  highlightDelayThreshold = 0.3,
}: NetworkGraphProps) {
  const traces = useMemo(() => {
    const nodeById: Record<string, GraphNode> = {};
    data.nodes.forEach((n) => (nodeById[n.id] = n));

    const edgeBuckets: Record<string, GraphEdge[]> = {
      low: [],
      med: [],
      high: [],
    };
    data.edges.forEach((e) => {
      if (e.delayRate > highlightDelayThreshold + 0.05) edgeBuckets.high.push(e);
      else if (e.delayRate > 0.25) edgeBuckets.med.push(e);
      else edgeBuckets.low.push(e);
    });

    const makeEdgeTrace = (
      edges: GraphEdge[],
      color: string,
      name: string
    ) => {
      const xs: (number | null)[] = [];
      const ys: (number | null)[] = [];
      edges.forEach((e) => {
        const src = nodeById[e.source];
        const dst = nodeById[e.target];
        if (!src || !dst) return;
        xs.push(src.x, dst.x, null);
        ys.push(src.y, dst.y, null);
      });
      return {
        type: "scatter",
        mode: "lines",
        x: xs,
        y: ys,
        line: { width: 1, color },
        hoverinfo: "skip",
        name,
        showlegend: true,
      };
    };

    const edgeTraces = [
      makeEdgeTrace(edgeBuckets.low, "rgba(20,184,166,0.5)", "Low delay (<25%)"),
      makeEdgeTrace(edgeBuckets.med, "rgba(245,158,11,0.65)", "Med delay (25-35%)"),
      makeEdgeTrace(edgeBuckets.high, "rgba(255,107,74,0.85)", "High delay (>35%)"),
    ];

    const nodeTrace = {
      type: "scatter",
      mode: "markers+text",
      x: data.nodes.map((n) => n.x),
      y: data.nodes.map((n) => n.y),
      text: data.nodes.map((n) => n.id),
      textposition: "bottom center",
      textfont: { size: 10, color: "#1E3A6B", family: "Calibri" },
      marker: {
        size: data.nodes.map((n) => Math.max(15, Math.min(40, n.degree * 1.5))),
        color: data.nodes.map((n) => NODE_COLORS[n.type] || "#999"),
        line: { width: 1.5, color: "white" },
      },
      customdata: data.nodes.map((n) => [n.type, n.pagerank, n.degree, n.community]),
      hovertemplate:
        "<b>%{text}</b><br>Type: %{customdata[0]}<br>PageRank: %{customdata[1]:.4f}<br>Degree: %{customdata[2]}<br>Community: %{customdata[3]}<extra></extra>",
      name: "Nodes",
      showlegend: false,
    };

    return [...edgeTraces, nodeTrace];
  }, [data, highlightDelayThreshold]);

  return (
    <Plot
      data={traces as never}
      layout={{
        autosize: true,
        height,
        margin: { l: 20, r: 20, t: 20, b: 20 },
        xaxis: { showgrid: false, zeroline: false, showticklabels: false },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false },
        plot_bgcolor: "#FAFBFD",
        paper_bgcolor: "white",
        showlegend: true,
        legend: {
          x: 0,
          y: 1.05,
          orientation: "h",
          font: { size: 10, color: "#475569" },
        },
        font: { family: "Calibri, sans-serif" },
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%" }}
    />
  );
}
