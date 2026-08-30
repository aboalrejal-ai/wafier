import kbCorpus from "../../kb/records/finance-energy-regulatory.json";

export type VerificationStatus = "VERIFIED" | "VERIFIED_BENCHMARK" | "UNVERIFIED" | "HISTORICAL";

export interface KbRecord {
  id: string;
  title: string;
  authority: string;
  section: string;
  content: string;
  url: string;
  year?: number | null;
  lang: string;
  verification: VerificationStatus;
  category: string;
  node: string;
  note?: string;
}

export interface PolicyGap {
  id: string;
  type: string;
  title: string;
  description: string;
  recommendation: string;
  related_records: string[];
  node: string;
}

export const KB_RECORDS: KbRecord[] = kbCorpus.records as KbRecord[];
export const POLICY_GAPS: PolicyGap[] = kbCorpus.gaps as PolicyGap[];
export const VERIFIED_RECORDS = KB_RECORDS.filter(
  (r) => r.verification === "VERIFIED" || r.verification === "VERIFIED_BENCHMARK",
);

export function getRecordById(id: string): KbRecord | undefined {
  return KB_RECORDS.find((r) => r.id === id);
}
