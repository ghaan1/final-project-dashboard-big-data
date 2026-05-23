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
  Database,
  Cpu,
  Cloud,
  ShieldCheck,
  FileLock2,
  EyeOff,
  ClipboardCheck,
  Layers,
  Activity,
  Zap,
} from "lucide-react";

const layers = [
  {
    icon: Database,
    name: "INGESTION",
    color: "bg-brand-navy",
    items: [
      "Apache Kafka (streaming events)",
      "Apache NiFi (batch ETL)",
      "MQTT (IoT telemetry)",
    ],
  },
  {
    icon: Layers,
    name: "STORAGE",
    color: "bg-brand-navy-dark",
    items: [
      "S3 / HDFS (data lake)",
      "Bronze → Silver → Gold (Medallion)",
      "Parquet + Delta Lake",
    ],
  },
  {
    icon: Cpu,
    name: "PROCESSING",
    color: "bg-brand-coral",
    items: [
      "Apache Spark (PySpark)",
      "Spark MLlib + GraphFrames",
      "Spark Structured Streaming",
    ],
  },
  {
    icon: Cloud,
    name: "SERVING",
    color: "bg-brand-teal",
    items: [
      "Snowflake (DWH)",
      "Apache Druid (OLAP)",
      "FastAPI (prediction service)",
    ],
  },
];

const governance = [
  {
    icon: ShieldCheck,
    title: "Security",
    items: [
      "Encryption at rest (S3 SSE-KMS) & in transit (TLS 1.3)",
      "VPC isolation + private endpoints untuk Spark cluster",
      "IAM role per service, principle of least privilege",
      "Audit logging via AWS CloudTrail / equivalent",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Compliance",
    items: [
      "Compliance dengan India DPDP Act 2023 (Digital Personal Data Protection)",
      "Data residency: storage di region India untuk PII customer",
      "Retention policy: raw delivery 7 tahun, aggregate analytics 10 tahun",
      "Right to erasure handling via metadata flag (soft delete)",
    ],
  },
  {
    icon: EyeOff,
    title: "Privacy",
    items: [
      "PII (nama customer, alamat, nomor HP) hanya di Bronze, di-hash di Silver/Gold",
      "Anonymization sebelum analytics: customer_id → hash(sha256)",
      "Role-based access control: tim analytics tidak akses raw PII",
      "Data masking di non-production environment",
    ],
  },
  {
    icon: FileLock2,
    title: "Data Quality",
    items: [
      "Schema validation di ingestion (Great Expectations / dbt tests)",
      "Quality SLA: completeness ≥ 99%, accuracy ≥ 95%, freshness ≤ 1 jam",
      "Data lineage tracking (Apache Atlas / DataHub)",
      "Automated anomaly detection via Spark + alerting",
    ],
  },
];

const techStack = [
  { category: "Storage", techs: ["AWS S3", "Parquet", "Delta Lake", "Snowflake"] },
  {
    category: "Processing",
    techs: [
      "Apache Spark 3.5",
      "PySpark",
      "Spark SQL",
      "Spark MLlib",
      "GraphFrames",
    ],
  },
  {
    category: "Streaming",
    techs: ["Apache Kafka", "Spark Structured Streaming"],
  },
  {
    category: "ML & Analytics",
    techs: [
      "scikit-learn",
      "XGBoost",
      "NetworkX (fallback)",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Visualization",
    techs: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "shadcn/ui (radix-nova)",
      "Recharts 3",
      "Plotly.js",
    ],
  },
  {
    category: "Orchestration",
    techs: ["Apache Airflow", "MLflow", "Feast (feature store)"],
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="LO3 — Architecture & Tech Stack"
          title="Arsitektur Big Data & IT Governance"
          description="Rancangan solusi berbasis Lambda Architecture + Medallion Data Lake, dengan fokus pada skalabilitas, reliability, dan tata kelola IT yang baik (security, compliance, privacy, data quality)."
        />

        {/* Architecture diagram */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Arsitektur</CardTitle>
              <CardDescription>
                4-stage pipeline dari ingestion ke serving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {layers.map((layer, i) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.name} className="relative">
                      <div className={`${layer.color} rounded-xl p-5 text-white`}>
                        <div className="mb-3 flex items-center gap-2">
                          <Icon className="h-6 w-6" />
                          <h3 className="font-heading text-base font-bold tracking-wider">
                            {layer.name}
                          </h3>
                        </div>
                        <ul className="space-y-1.5 text-sm">
                          {layer.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-white/60">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {i < layers.length - 1 && (
                        <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 translate-x-1/2 md:block">
                          <div className="flex gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Lambda + Medallion */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Activity className="h-6 w-6 text-brand-navy" />
              <CardTitle className="mt-2">Skalabilitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Setiap layer di-scale independen sesuai beban. Spark dapat scale
                dari 1 worker (local) ke ratusan node (cluster) tanpa perubahan
                code aplikasi.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <ShieldCheck className="h-6 w-6 text-brand-teal" />
              <CardTitle className="mt-2">Reliability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bronze = single source of truth raw data. Gold = consumable
                feature. Reproducibility tinggi karena raw data tidak pernah
                dimodifikasi.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-6 w-6 text-brand-coral" />
              <CardTitle className="mt-2">Real-time Capable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lambda Architecture menggabungkan batch + streaming. Real-time
                view + historical view di-merge untuk analytics yang akurat dan
                segar.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* IT Governance — kunci untuk rubric */}
        <div className="mt-10">
          <h2 className="mb-2 font-heading text-2xl font-bold text-brand-navy">
            IT Governance
          </h2>
          <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
            Tata kelola IT yang baik mencakup empat pilar utama: keamanan,
            kepatuhan, privasi, dan kualitas data. Setiap pilar dijabarkan dalam
            kontrol konkret pada arsitektur ini.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {governance.map((g) => {
              const Icon = g.icon;
              return (
                <Card key={g.title}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{g.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm"
                        >
                          <span className="mt-0.5 text-brand-teal">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
            Technology Stack
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {techStack.map((cat) => (
              <Card key={cat.category}>
                <CardHeader className="pb-3">
                  <CardTitle>{cat.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cat.techs.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Tentang Project</CardTitle>
              <CardDescription>Detail submisi & sumber kode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Mata Kuliah
                  </p>
                  <p>COMP8035041 — Big Data Analytics</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Mahasiswa
                  </p>
                  <p>Ghani</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Institusi
                  </p>
                  <p>BINUS Graduate Program — Magister Ilmu Komputer</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Periode
                  </p>
                  <p>Semester 1 / 2025–2026</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Dataset
                  </p>
                  <p>Delivery Logistics India Multi-Partner (Kaggle, 25k records)</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Method
                  </p>
                  <p>Individual Project</p>
                </div>
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
