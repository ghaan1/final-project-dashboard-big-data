export interface Overview {
  totalDeliveries: number;
  totalDelayed: number;
  totalOnTime: number;
  delayRate: number;
  avgDistance: number;
  avgCost: number;
  avgRating: number;
  partners: number;
  regions: number;
  packageTypes: number;
  vehicleTypes: number;
  suspectedFraud: number;
}

export interface Partner {
  name: string;
  total: number;
  delayed: number;
  delayRate: number;
  avgDistance: number;
  avgCost: number;
  avgRating: number;
}

export interface WeatherImpact {
  condition: string;
  total: number;
  delayed: number;
  delayRate: number;
}

export interface HeatmapCell {
  partner: string;
  region: string;
  total: number;
  delayed: number;
  delayRate: number;
}

export interface MLResult {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  trainTime: number;
  usesSpark: boolean;
}

export interface ModeBreakdown {
  mode: string;
  total: number;
  delayed: number;
  delayRate: number;
}

export interface VehicleBreakdown {
  vehicle: string;
  total: number;
  delayed: number;
  delayRate: number;
}

export interface PackageBreakdown {
  package: string;
  total: number;
  delayed: number;
  delayRate: number;
}

export interface Breakdowns {
  modes: ModeBreakdown[];
  vehicles: VehicleBreakdown[];
  packages: PackageBreakdown[];
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface GraphNode {
  id: string;
  type: "Partner" | "Region" | "PackageType" | "VehicleType";
  pagerank: number;
  degree: number;
  inDegree: number;
  outDegree: number;
  community: number;
  triangles: number;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  delayRate: number;
  relationship: "HANDLED" | "OPERATES_IN" | "USES";
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    numNodes: number;
    numEdges: number;
    numCommunities: number;
  };
}
