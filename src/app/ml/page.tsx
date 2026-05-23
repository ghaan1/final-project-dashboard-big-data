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
import type { MLResult, FeatureImportance } from "@/lib/types";
import { GroupedBarChart } from "@/components/charts/grouped-bar";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar";
import { Brain, Target, Zap, Clock } from "lucide-react";

export default function MLPage() {
  const mlResults = readData<MLResult[]>("ml_results.json");
  const featureImp = readData<FeatureImportance[]>("feature_importance.json");

  const bestF1 = mlResults.reduce((a, b) => (a.f1 > b.f1 ? a : b));
  const fastest = mlResults.reduce((a, b) =>
    a.trainTime < b.trainTime ? a : b
  );
  const bestAuc = mlResults.reduce((a, b) => (a.rocAuc > b.rocAuc ? a : b));

  const metricsData = mlResults.map((r) => ({
    name: r.model.replace(" (sklearn)", "").replace(" (Spark MLlib)", " Spark"),
    F1: r.f1,
    "ROC-AUC": r.rocAuc,
    Accuracy: r.accuracy,
  }));

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="LO4 — Scalable Machine Learning"
          title="Machine Learning Pipeline"
          description="4 model klasifikasi biner untuk memprediksi keterlambatan pengiriman. Mencakup dua pendekatan: tanpa Spark (scikit-learn LogReg & RF, XGBoost) dan dengan Spark (RandomForest MLlib)."
        />

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Best F1-Score"
            value={bestF1.f1.toFixed(3)}
            description={bestF1.model}
            icon={Target}
            variant="teal"
          />
          <StatCard
            label="Best ROC-AUC"
            value={bestAuc.rocAuc.toFixed(3)}
            description={bestAuc.model}
            icon={Brain}
          />
          <StatCard
            label="Fastest Train"
            value={`${fastest.trainTime}s`}
            description={fastest.model}
            icon={Zap}
            variant="amber"
          />
          <StatCard
            label="Total Models"
            value={mlResults.length}
            description="3 sklearn + 1 Spark"
            icon={Clock}
            variant="coral"
          />
        </div>

        {/* Comparison chart */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Perbandingan Performa Model</CardTitle>
              <CardDescription>
                Accuracy, F1, dan ROC-AUC untuk 4 model pada test set (4.901
                record)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GroupedBarChart
                data={metricsData}
                categoryKey="name"
                series={[
                  { key: "F1", label: "F1-Score", color: "#FF6B4A" },
                  { key: "ROC-AUC", label: "ROC-AUC", color: "#14B8A6" },
                  { key: "Accuracy", label: "Accuracy", color: "#1E3A6B" },
                ]}
                domain={[0.7, 1.0]}
                height={340}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Time</CardTitle>
              <CardDescription>
                Overhead Spark vs single-machine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mlResults.map((r) => (
                <div
                  key={r.model}
                  className="flex items-center justify-between rounded-md border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {r.model
                        .replace(" (sklearn)", "")
                        .replace(" (Spark MLlib)", "")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.usesSpark ? "Distributed (Spark)" : "Single-machine"}
                    </p>
                  </div>
                  <span
                    className={
                      r.usesSpark
                        ? "font-mono text-base font-bold text-brand-teal"
                        : "font-mono text-base font-bold text-brand-navy"
                    }
                  >
                    {r.trainTime.toFixed(2)}s
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed metrics table */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tabel Metrik Lengkap</CardTitle>
              <CardDescription>
                Accuracy, Precision, Recall, F1, dan ROC-AUC untuk setiap model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 pr-4 font-heading font-semibold text-brand-navy">
                        Model
                      </th>
                      <th className="pb-2 pr-4 text-right text-muted-foreground">
                        Accuracy
                      </th>
                      <th className="pb-2 pr-4 text-right text-muted-foreground">
                        Precision
                      </th>
                      <th className="pb-2 pr-4 text-right text-muted-foreground">
                        Recall
                      </th>
                      <th className="pb-2 pr-4 text-right text-muted-foreground">
                        F1
                      </th>
                      <th className="pb-2 pr-4 text-right text-muted-foreground">
                        ROC-AUC
                      </th>
                      <th className="pb-2 text-right text-muted-foreground">
                        Train Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mlResults.map((r) => (
                      <tr
                        key={r.model}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{r.model}</span>
                            {r.usesSpark && (
                              <Badge variant="secondary">Spark</Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-right font-mono">
                          {r.accuracy.toFixed(4)}
                        </td>
                        <td className="py-3 pr-4 text-right font-mono">
                          {r.precision.toFixed(4)}
                        </td>
                        <td className="py-3 pr-4 text-right font-mono">
                          {r.recall.toFixed(4)}
                        </td>
                        <td className="py-3 pr-4 text-right font-mono font-bold text-brand-navy">
                          {r.f1.toFixed(4)}
                        </td>
                        <td className="py-3 pr-4 text-right font-mono font-bold text-brand-teal">
                          {r.rocAuc.toFixed(4)}
                        </td>
                        <td className="py-3 text-right font-mono text-muted-foreground">
                          {r.trainTime.toFixed(2)}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Importance */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance (XGBoost)</CardTitle>
              <CardDescription>
                Kontribusi tiap fitur dalam memprediksi keterlambatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HorizontalBarChart
                data={featureImp.slice(0, 10).map((f) => ({
                  name: f.feature,
                  imp: f.importance,
                }))}
                dataKey="imp"
                categoryKey="name"
                color="#1E3A6B"
                threshold={0.1}
                thresholdColor="#FF6B4A"
                height={360}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                <strong>delivery_mode</strong> mendominasi karena pola SLA
                matching dalam dataset (mode standard 0% delay, express 74%
                delay) — pengamatan ini layak ditelaah sebagai potensi data
                pattern yang sangat informatif.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analisis & Pemilihan Model</CardTitle>
              <CardDescription>
                Trade-off & rekomendasi production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-md bg-muted p-3">
                <p className="font-semibold text-brand-navy">
                  XGBoost = sweet spot single-machine
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Akurasi setara RF dengan training time hanya{" "}
                  {fastest.trainTime}s, ditambah handling native untuk
                  integer-encoded categories.
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="font-semibold text-brand-teal">
                  Spark MLlib untuk skala
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Pipeline identical bisa di-deploy di cluster — produktif saat
                  dataset mencapai jutaan-milyaran record.
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="font-semibold text-brand-coral">
                  Strategi production
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Deploy XGBoost sebagai prediction API; jalankan Spark pipeline
                  untuk re-training scheduled pada dataset penuh.
                </p>
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
