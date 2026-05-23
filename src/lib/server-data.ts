import fs from "fs";
import path from "path";

/**
 * Server-side helper to read JSON data files from the `data/` directory.
 * Used by API routes and Server Components.
 */
export function readData<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}
