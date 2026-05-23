import { readData } from "@/lib/server-data";

export const dynamic = "force-static";

export async function GET() {
  const data = readData<unknown>("heatmap.json");
  return Response.json(data);
}
