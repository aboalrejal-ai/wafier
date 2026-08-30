/**
 * Preprocessor (PP) node — ITU-T Y.3172
 * Gap-fill + PDPL pseudonymization helpers used before Model inference.
 */

import { anonymizeHouseholdId } from "./policy-engine";

export interface DailyPoint {
  day: number;
  kwh: number | null;
}

/** Fill null/missing daily kWh with the mean of neighboring values. */
export function gapFillDailySeries(series: DailyPoint[]): DailyPoint[] {
  if (series.length === 0) return series;
  const out = series.map((p) => ({ ...p }));
  for (let i = 0; i < out.length; i++) {
    if (out[i].kwh != null && !Number.isNaN(out[i].kwh!)) continue;
    let left: number | null = null;
    let right: number | null = null;
    for (let L = i - 1; L >= 0; L--) {
      if (out[L].kwh != null) {
        left = out[L].kwh;
        break;
      }
    }
    for (let R = i + 1; R < out.length; R++) {
      if (out[R].kwh != null) {
        right = out[R].kwh;
        break;
      }
    }
    if (left != null && right != null) out[i].kwh = Math.round(((left + right) / 2) * 100) / 100;
    else if (left != null) out[i].kwh = left;
    else if (right != null) out[i].kwh = right;
    else out[i].kwh = 0;
  }
  return out;
}

export function anonymizeForExport(householdId: string): string {
  return anonymizeHouseholdId(householdId);
}

/** Build a short synthetic series with one gap for demo PP evidence. */
export function buildDemoSeriesWithGap(totalKwh: number): DailyPoint[] {
  const daily = Math.round((totalKwh / 30) * 100) / 100;
  return Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    kwh: i === 3 ? null : daily,
  }));
}
