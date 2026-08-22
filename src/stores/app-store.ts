import { create } from "zustand";
import type { DashboardData } from "../types/database";

interface AppStore {
  dashboard: DashboardData | null;
  loading: boolean;
  period: string;
  setDashboard: (data: DashboardData | null) => void;
  setLoading: (v: boolean) => void;
  setPeriod: (p: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  dashboard: null,
  loading: true,
  period: "آخر 6 أشهر",
  setDashboard: (dashboard) => set({ dashboard }),
  setLoading: (loading) => set({ loading }),
  setPeriod: (period) => set({ period }),
}));

export function getFilteredChartData(
  historical: { month: string; value: number }[],
  period: string,
) {
  const count =
    period === "آخر 3 أشهر" ? 3 : period === "آخر سنة" || period === "هذا العام" || period === "آخر 12 شهراً" ? 12 : 6;
  return historical.slice(-Math.min(count, historical.length));
}
