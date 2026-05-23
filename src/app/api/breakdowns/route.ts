import { readData } from "@/lib/server-data";

export const dynamic = "force-static";

export async function GET() {
  const data = readData<unknown>("modes_vehicles_packages.json");
  return Response.json(data);
}
