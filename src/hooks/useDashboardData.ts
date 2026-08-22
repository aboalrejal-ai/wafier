import { useAppStore } from "../stores/app-store";

export function useDashboardData() {
  const d = useAppStore((s) => s.dashboard);
  const loading = useAppStore((s) => s.loading);

  return {
    loading,
    profile: d?.profile,
    budget: d?.budget.monthly_amount ?? 500,
    spend: d?.currentSpendSar ?? 0,
    remaining: d?.remainingSar ?? 500,
    usagePct: d?.usagePct ?? 0,
    forecast: d?.forecast?.predicted_sar ?? 0,
    forecastConfidence: d?.forecast?.confidence ?? 0,
    seasonProfile: d?.forecast?.season_profile ?? "baseline",
    weather: d?.weather ?? { temp_c: 26, humidity: 45, description: "مشمس حار", city: "الرياض" },
    devices: d?.devices ?? [],
    sensors: d?.sensors ?? [],
    notifications: d?.notifications ?? [],
    historicalBills: d?.historicalBills ?? [],
    currentKwh: d?.currentKwh ?? 0,
    greetingName: d?.profile.full_name?.split(" ")[0] ?? "جوري",
  };
}
