import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

type LeadRecord = {
  id: string;
  type: "inquiry" | "booking";
  createdAt: string;
  payload: Record<string, unknown>;
};

const dataDirectory = path.join(process.cwd(), "data");
const submissionsFile = path.join(dataDirectory, "submissions.json");

async function readRecords(): Promise<LeadRecord[]> {
  try {
    const content = await readFile(submissionsFile, "utf8");
    const parsed = JSON.parse(content) as LeadRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function appendLeadRecord(
  type: LeadRecord["type"],
  payload: Record<string, unknown>,
): Promise<LeadRecord> {
  await mkdir(dataDirectory, { recursive: true });
  const records = await readRecords();

  const record: LeadRecord = {
    id: randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    payload,
  };

  records.push(record);
  await writeFile(submissionsFile, JSON.stringify(records, null, 2), "utf8");
  return record;
}
