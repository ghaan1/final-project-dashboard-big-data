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
import {
  Database,
  ShieldAlert,
  FileWarning,
  Copy,
} from "lucide-react";

const issues = [
  {
    idx: "01",
    title: "Format numerik rusak",
    desc: 'Nilai bermalformasi seperti "297.00.00" pada kolom distance_km, atau outlier ekstrem "16.327.205.999..." pada delivery_cost.',
    solution:
      "Custom parser yang mengambil 2 segmen pertama setelah split berdasarkan titik.",
    icon: FileWarning,
  },
  {
    idx: "02",
    title: "Konvensi desimal campuran",
    desc: 'Kolom package_weight_kg memuat nilai dengan titik ("46.96") dan koma sebagai pemisah desimal ("0,547916667").',
    solution: "Konversi semua koma menjadi titik sebelum parsing float.",
    icon: FileWarning,
  },
  {
    idx: "03",
    title: "Timestamp Unix salah tipe",
    desc: 'Kolom delivery_time_hours tertulis sebagai "1970-01-01 00:00:00.000000008" padahal sesungguhnya menyatakan jumlah jam (= 8).',
    solution:
      "Ekstrak bagian setelah titik desimal terakhir, hilangkan leading zero, cast ke float.",
    icon: FileWarning,
  },
  {
    idx: "04",
    title: "Outlier delivery_cost ekstrem",
    desc: "Sekitar 250 record memiliki nilai delivery_cost di atas Q99 — kemungkinan korupsi data atau separator ribuan yang rusak.",
    solution:
      "Capping di percentile 99 dan flagging sebagai suspected_fraud untuk audit.",
    icon: ShieldAlert,
  },
  {
    idx: "05",
    title: "Duplikasi delivery_id",
    desc: "~498 record (~2%) memiliki delivery_id yang sama, kemungkinan dari proses ETL yang menggabungkan beberapa sumber.",
    solution:
      "Deduplikasi dengan strategi keep='first' setelah sorting berdasarkan timestamp.",
    icon: Copy,
  },
];

const features = {
  drop: [
    "delivery_time_hours (durasi aktual)",
    "delivery_status (completed/returned)",
    "delivery_rating (rating konsumen)",
    "delay_ratio (actual/expected)",
  ],
  keep: [
    "delivery_partner, region, weather",
    "package_type, vehicle_type, mode",
    "distance_km, package_weight_kg",
    "expected_time_hours (SLA), delivery_cost",
    "Derived: cost_per_km, weight_per_distance, is_ev, suspected_fraud",
  ],
};

export default function DataQualityPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="LO2 — Identifikasi Isu Big Data"
          title="Data Quality & Preprocessing"
          description="Audit kualitas data mengungkap 5 masalah utama yang harus diperbaiki sebelum analitik lanjutan. Pipeline cleaning di-implementasi dalam Jupyter Notebook (01_preprocessing_eda.ipynb)."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Sebelum"
            value="25.000"
            description="raw records"
            icon={Database}
          />
          <StatCard
            label="Setelah"
            value="24.502"
            description="record bersih"
            icon={Database}
            variant="teal"
          />
          <StatCard
            label="Dihapus"
            value="498"
            description="duplikasi"
            icon={Copy}
            variant="coral"
          />
          <StatCard
            label="Flagged"
            value="246"
            description="suspected fraud"
            icon={ShieldAlert}
            variant="amber"
          />
        </div>

        {/* Issues grid */}
        <div className="mt-8">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
            5 Temuan Utama
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((iss) => {
              const Icon = iss.icon;
              return (
                <Card key={iss.idx}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 text-brand-coral" />
                      <span className="font-heading text-lg font-bold text-brand-coral">
                        {iss.idx}
                      </span>
                    </div>
                    <CardTitle>{iss.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{iss.desc}</p>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-xs font-semibold tracking-wide text-brand-teal uppercase">
                        Solusi
                      </p>
                      <p className="mt-1 text-sm">{iss.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Data leakage strategy */}
        <div className="mt-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
            Strategi Anti Data Leakage
          </h2>
          <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
            Beberapa atribut hanya tersedia <em>setelah</em> pengiriman selesai
            — memasukkannya sebagai fitur akan menyebabkan target leakage dan
            performa over-optimistic yang tidak realistis di production.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-brand-coral">
                    JANGAN dipakai sebagai fitur
                  </CardTitle>
                  <Badge variant="destructive">Post-delivery</Badge>
                </div>
                <CardDescription>
                  Informasi yang baru ada setelah pengiriman selesai
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-mono text-sm text-brand-coral">
                  {features.drop.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span>✗</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-brand-teal">
                    YANG dipakai sebagai fitur
                  </CardTitle>
                  <Badge variant="secondary">Pre-delivery</Badge>
                </div>
                <CardDescription>
                  Informasi yang tersedia sebelum pengiriman dimulai
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-mono text-sm text-brand-teal">
                  {features.keep.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pipeline */}
        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Cleaning Pipeline</CardTitle>
              <CardDescription>
                Urutan langkah preprocessing pada Notebook 1
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                {[
                  "Load raw CSV dengan separator semicolon (`;`)",
                  "Parse kolom numerik (distance_km, package_weight_kg, delivery_cost) dengan custom parser",
                  "Parse kolom waktu Unix timestamp ke jam (delivery_time_hours, expected_time_hours)",
                  "Normalisasi kategorikal (lowercase, strip whitespace)",
                  "Deduplikasi berdasarkan delivery_id (keep='first')",
                  "Outlier capping pada delivery_cost di Q99, dengan flag suspected_fraud",
                  "Drop record dengan NaN pada kolom kritis",
                  "Persistence ke Parquet & CSV untuk konsumsi notebook ML & Graph",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
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
