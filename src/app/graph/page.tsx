import { Navbar } from "@/components/navbar";
import { PageHeader, StatCard } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { readData } from "@/lib/server-data";
import type { GraphData, HeatmapCell } from "@/lib/types";
import { Network, Hash, Users, Triangle } from "lucide-react";
import { NetworkGraph } from "@/components/charts/network-graph";
import { PartnerRegionHeatmap } from "@/components/charts/heatmap";

export default function GraphPage() {
  const graph = readData<GraphData>("graph.json");
  const heatmap = readData<HeatmapCell[]>("heatmap.json");

  const topPageRank = [...graph.nodes]
    .sort((a, b) => b.pagerank - a.pagerank)
    .slice(0, 10);
  const topDegree = [...graph.nodes]
    .sort((a, b) => b.degree - a.degree)
    .slice(0, 10);
  const topTriangles = [...graph.nodes]
    .sort((a, b) => b.triangles - a.triangles)
    .slice(0, 5);

  const worstPairs = [...heatmap]
    .sort((a, b) => b.delayRate - a.delayRate)
    .slice(0, 5);
  const bestPairs = [...heatmap]
    .sort((a, b) => a.delayRate - b.delayRate)
    .slice(0, 5);

  type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  const typeColors: Record<string, BadgeVariant> = {
    Partner: "destructive",
    Region: "default",
    PackageType: "secondary",
    VehicleType: "outline",
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="LO5 — Graph Database & Analytics"
          title="Graph Analytics"
          description="Property graph dari ekosistem partner-region-package-vehicle, dengan analisis sentralitas, komunitas, dan delay hotspot menggunakan PySpark GraphFrames (fallback: NetworkX)."
        />

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Nodes"
            value={graph.stats.numNodes}
            description="4 tipe entitas"
            icon={Hash}
          />
          <StatCard
            label="Edges"
            value={graph.stats.numEdges}
            description="3 relasi"
            icon={Network}
            variant="coral"
          />
          <StatCard
            label="Communities"
            value={graph.stats.numCommunities}
            description="dari Label Propagation"
            icon={Users}
            variant="teal"
          />
          <StatCard
            label="Top Triangles"
            value={topTriangles[0]?.triangles ?? 0}
            description={topTriangles[0]?.id ?? "—"}
            icon={Triangle}
            variant="amber"
          />
        </div>

        {/* Network visualization */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Visualisasi Jaringan</CardTitle>
                  <CardDescription>
                    Interactive network graph — drag, zoom, hover untuk detail
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="destructive">Partner</Badge>
                  <Badge>Region</Badge>
                  <Badge variant="secondary">PackageType</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <NetworkGraph data={graph} height={520} />
              <p className="mt-3 text-xs text-muted-foreground">
                Ukuran node ∝ degree; warna edge berdasarkan delay rate (hijau
                &lt; 25%, oranye 25–35%, merah &gt; 35%).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hotspot — Partner × Region</CardTitle>
              <CardDescription>
                Heatmap delay rate untuk 45 kombinasi 9 partner × 5 region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PartnerRegionHeatmap data={heatmap} height={460} />
            </CardContent>
          </Card>
        </div>

        {/* Top hotspots & best */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-coral">
                Worst Delay Pairs
              </CardTitle>
              <CardDescription>
                Pasangan dengan delay rate tertinggi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {worstPairs.map((p, i) => (
                  <div
                    key={`${p.partner}-${p.region}`}
                    className="flex items-center justify-between rounded-md bg-muted p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-coral text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">
                        {p.partner} × {p.region}
                      </span>
                    </div>
                    <span className="font-mono text-base font-bold text-brand-coral">
                      {p.delayRate.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-brand-teal">
                Best Performance
              </CardTitle>
              <CardDescription>
                Pasangan dengan delay rate terendah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bestPairs.map((p, i) => (
                  <div
                    key={`${p.partner}-${p.region}`}
                    className="flex items-center justify-between rounded-md bg-muted p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">
                        {p.partner} × {p.region}
                      </span>
                    </div>
                    <span className="font-mono text-base font-bold text-brand-teal">
                      {p.delayRate.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PageRank table */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 by PageRank</CardTitle>
              <CardDescription>
                Node paling sentral dalam jaringan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {topPageRank.map((n, i) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-right text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{n.id}</span>
                      <Badge variant={typeColors[n.type]}>{n.type}</Badge>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {n.pagerank.toFixed(5)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 10 by Degree</CardTitle>
              <CardDescription>Node dengan koneksi terbanyak</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {topDegree.map((n, i) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-right text-xs font-bold text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{n.id}</span>
                      <Badge variant={typeColors[n.type]}>{n.type}</Badge>
                    </div>
                    <span className="font-mono text-sm font-bold text-brand-navy">
                      {n.degree}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 border-t border-border py-6 text-center text-xs text-muted-foreground">
          <p>
            Ghani — COMP8035041 Big Data Analytics — BINUS Graduate Program —
            2026
          </p>
        </footer>
      </main>
    </>
  );
}
