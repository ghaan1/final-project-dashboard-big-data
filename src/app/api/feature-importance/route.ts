import { readData } from "@/lib/server-data";

export const dynamic = "force-static";

export async function GET() {
  const data = readData<unknown>("feature_importance.json");
  return Response.json(data);
}
