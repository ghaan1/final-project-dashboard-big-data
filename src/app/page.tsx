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
import { formatNumber, formatPct } from "@/lib/utils";
import type { Overview, Partner, WeatherImpact } from "@/lib/types";
import {
  Package,
  AlertCircle,
  CircleCheck,
  TrendingDown,
  MapPin,
  Truck,
  Cloud,
  Boxes,
} from "lucide-react";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar";

export default function HomePage() {
  const overview = readData<Overview>("overview.json");
  const partners = readData<Partner[]>("partners.json");
  const weather = readData<WeatherImpact[]>("weather.json");

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Final Project — Big Data Analytics"
          title="Logistik Multi-Partner India"
          description="Dashboard interaktif untuk analisis prediksi keterlambatan dan optimasi operasional pada ekosistem logistik multi-partner di India. Berbasis 24.502 record pengiriman dari 9 partner di 5 region."
        />

        {/* Top stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Total Pengiriman"
            value={formatNumber(overview.totalDeliveries)}
            description="setelah cleaning"
            icon={Package}
          />
          <StatCard
            label="Delay Rate"
            value={formatPct(overview.delayRate, 1)}
            description={`${formatNumber(overview.totalDelayed)} delayed`}
            icon={AlertCircle}
            variant="coral"
          />
          <StatCard
            label="On-Time"
            value={formatNumber(overview.totalOnTime)}
            description={formatPct(100 - overview.delayRate, 1)}
            icon={CircleCheck}
            variant="teal"
          />
          <StatCard
            label="Suspected Fraud"
            value={formatNumber(overview.suspectedFraud)}
            description="cost > Q99"
            icon={TrendingDown}
            variant="amber"
          />
        </div>

        {/* Secondary stats */}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Partner Logistik"
            value={overview.partners}
            description="multi-partner"
            icon={Truck}
          />
          <StatCard
            label="Region Geografis"
            value={overview.regions}
            description="seluruh India"
            icon={MapPin}
          />
          <StatCard
            label="Tipe Paket"
            value={overview.packageTypes}
            description="kategorikal"
            icon={Boxes}
          />
          <StatCard
            label="Tipe Kendaraan"
            value={overview.vehicleTypes}
            description="termasuk EV"
            icon={Cloud}
          />
        </div>

        {/* Section: highlights */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Performa per Partner</CardTitle>
                  <CardDescription>
                    Delay rate untuk 9 partner logistik utama
                  </CardDescription>
                </div>
                <Badge variant="destructive">Worst: Xpressbees</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <HorizontalBarChart
                data={partners.map((p) => ({
                  name: p.name,
                  delay: p.delayRate,
                }))}
                dataKey="delay"
                categoryKey="name"
                threshold={26.7}
                unit="%"
                height={340}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Garis ambang ~26,7% adalah rata-rata seluruh partner. Warna
                coral menunjukkan partner dengan delay rate di atas rata-rata.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaruh Kondisi Cuaca</CardTitle>
              <CardDescription>
                Delay rate berdasarkan kondisi cuaca saat pengiriman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HorizontalBarChart
                data={weather.map((w) => ({
                  name: w.condition,
                  delay: w.delayRate,
                }))}
                dataKey="delay"
                categoryKey="name"
                threshold={26.7}
                unit="%"
                height={340}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Cuaca buruk (stormy 41%, rainy 37%, foggy 30%) menaikkan delay
                rate signifikan dibanding cuaca normal (~17%).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Tentang Final Project Ini</CardTitle>
              <CardDescription>
                Ringkasan singkat tujuan & cakupan analisis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                Dashboard ini merupakan bagian dari{" "}
                <strong>Final Project COMP8035041 — Big Data Analytics</strong>,
                BINUS Graduate Program. Dataset:{" "}
                <em>Delivery Logistics India Multi-Partner</em> (Kaggle, 25.000
                record).
              </p>
              <p>
                Cakupan analisis mengikuti 6 Learning Outcomes (LO1–LO6):
                identifikasi market driver & lanskap big data, isu data quality
                dan strategi processing, perancangan arsitektur scalable,
                machine learning pipeline dengan algoritma scalable, graph
                analytics, dan visualisasi interaktif (dashboard ini).
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge>4 Model ML</Badge>
                <Badge variant="secondary">PySpark MLlib</Badge>
                <Badge variant="destructive">GraphFrames</Badge>
                <Badge variant="outline">Lambda + Medallion</Badge>
                <Badge variant="ghost">24.502 records</Badge>
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
