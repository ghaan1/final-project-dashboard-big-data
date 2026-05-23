import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Route,
  Handshake,
  Activity,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

const recommendations = [
  {
    icon: Route,
    title: "Re-routing Strategy",
    desc: "Alihkan order ke region West dari Shadowfax (32% delay) ke Delhivery atau Blue Dart (~26%). Selisih 6 pp di volume tinggi bisa menyelamatkan ribuan pengiriman tepat waktu per bulan.",
    impact: "High",
    effort: "Low",
  },
  {
    icon: Handshake,
    title: "SLA Renegotiation",
    desc: "Pasangan partner-region dengan delay rate konsisten >30% (Xpressbees × East, Ekart × South) menjadi basis renegosiasi SLA atau penurunan share-of-wallet.",
    impact: "High",
    effort: "Medium",
  },
  {
    icon: Activity,
    title: "Capacity Planning",
    desc: "Region nodes dengan PageRank tertinggi adalah dependency kritis — pastikan ada backup partner di setiap region untuk mencegah single point of failure.",
    impact: "Medium",
    effort: "Medium",
  },
  {
    icon: GitBranch,
    title: "Predictive Triage",
    desc: "Deploy model XGBoost (F1=0.80, AUC=0.96) sebagai prediction API. Order dengan probability delay tinggi otomatis di-prioritaskan untuk manual intervention.",
    impact: "High",
    effort: "Medium",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    desc: "246 record dengan delivery_cost > Q99 sudah di-flag sebagai suspected_fraud. Setup periodic audit pada transaksi flagged untuk identifikasi anomali sistemik.",
    impact: "Medium",
    effort: "Low",
  },
  {
    icon: TrendingUp,
    title: "Weather-Aware Dispatch",
    desc: "Karena weather menjadi feature importance #2 (stormy 41%, rainy 37% delay), integrasi forecast cuaca ke dispatch system bisa proaktif menyesuaikan SLA dan alokasi vehicle pada hari hujan/kabut.",
    impact: "High",
    effort: "High",
  },
];

const stakeholders = [
  {
    role: "Operations Manager",
    benefit:
      "Visibility tingkat keterlambatan per partner, region, dan kombinasinya. Berperan dalam keputusan alokasi order harian.",
  },
  {
    role: "Strategic Partnership",
    benefit:
      "Data-driven negotiation dengan partner — bukti objektif kontribusi tiap partner di tiap region.",
  },
  {
    role: "Data Engineering",
    benefit:
      "Reference arsitektur big data scalable (Lambda + Medallion + Spark) sebagai blueprint sistem produksi.",
  },
  {
    role: "Customer Experience",
    benefit:
      "Prediksi delay yang akurat untuk proactive communication ke konsumen — mengurangi churn dan negative reviews.",
  },
  {
    role: "Risk & Compliance",
    benefit:
      "Flag suspected_fraud sebagai input audit; visibility delay hotspot untuk operational risk monitoring.",
  },
];

const successMetrics = [
  {
    metric: "Overall on-time rate",
    baseline: "73,3%",
    target: "≥ 80%",
    method: "Predictive triage + smart routing",
  },
  {
    metric: "Worst pair delay",
    baseline: "32%",
    target: "≤ 28%",
    method: "Re-allocation Shadowfax → Delhivery di West",
  },
  {
    metric: "Prediction precision",
    baseline: "0,73",
    target: "≥ 0,75",
    method: "Model retraining quarterly",
  },
  {
    metric: "False fraud rate",
    baseline: "—",
    target: "< 5%",
    method: "Threshold tuning suspected_fraud",
  },
];

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="LO6 — Business Narrative"
          title="Insights & Rekomendasi Bisnis"
          description="Translasi temuan analitik menjadi rekomendasi tindak lanjut. Setiap rekomendasi dilengkapi dengan impact & effort scoring untuk prioritisasi."
        />

        {/* Recommendations */}
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
            Rekomendasi Tindak Lanjut
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((r) => {
              const Icon = r.icon;
              return (
                <Card key={r.title}>
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{r.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                    <div className="flex gap-2 pt-1">
                      <Badge variant={r.impact === "High" ? "destructive" : "outline"}>
                        Impact: {r.impact}
                      </Badge>
                      <Badge variant={r.effort === "Low" ? "secondary" : "outline"}>
                        Effort: {r.effort}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Success metrics table */}
        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Project Success Indicators</CardTitle>
              <CardDescription>
                KPI yang dapat di-track untuk mengukur efektivitas solusi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 pr-4 font-heading font-semibold text-brand-navy">
                        Metric
                      </th>
                      <th className="pb-2 pr-4 text-muted-foreground">Baseline</th>
                      <th className="pb-2 pr-4 text-muted-foreground">Target</th>
                      <th className="pb-2 text-muted-foreground">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {successMetrics.map((m) => (
                      <tr
                        key={m.metric}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-3 pr-4 font-medium">{m.metric}</td>
                        <td className="py-3 pr-4 font-mono text-muted-foreground">
                          {m.baseline}
                        </td>
                        <td className="py-3 pr-4 font-mono font-bold text-brand-teal">
                          {m.target}
                        </td>
                        <td className="py-3 text-muted-foreground">{m.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stakeholders */}
        <div className="mt-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
            Stakeholder & Manfaat
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stakeholders.map((s) => (
              <Card key={s.role}>
                <CardHeader>
                  <CardTitle>{s.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Development plan */}
        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Development Roadmap</CardTitle>
              <CardDescription>
                Rencana lanjut setelah Phase 1 (project ini)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-l-brand-teal pl-4">
                <p className="text-sm font-semibold text-brand-teal">
                  Phase 2 — Production Deployment (3 bulan)
                </p>
                <p className="text-sm text-muted-foreground">
                  Deploy XGBoost ke prediction service (FastAPI/Spring Boot),
                  feature store integration (Feast), setup MLOps pipeline
                  (Airflow + MLflow).
                </p>
              </div>
              <div className="border-l-4 border-l-brand-navy pl-4">
                <p className="text-sm font-semibold text-brand-navy">
                  Phase 3 — Real-Time Streaming (3 bulan)
                </p>
                <p className="text-sm text-muted-foreground">
                  Integrate Kafka + Spark Structured Streaming untuk live delay
                  prediction berdasarkan event ping kendaraan dan weather feed.
                </p>
              </div>
              <div className="border-l-4 border-l-brand-coral pl-4">
                <p className="text-sm font-semibold text-brand-coral">
                  Phase 4 — Causal Inference & Optimization (6 bulan)
                </p>
                <p className="text-sm text-muted-foreground">
                  Eksplorasi causal inference (DoWhy, EconML) untuk membedakan
                  korelasi vs kausalitas. Operations research untuk dynamic
                  routing optimization.
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
