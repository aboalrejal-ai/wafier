import { getSupabase, isSupabaseConfigured } from "../lib/supabase";
import { demoService } from "./demo-service";
import {
  budgetUsagePct,
  calculateRemaining,
  kwhToSar,
  disaggregateDevices,
} from "../lib/financial-engine";
import { predictBill, generateHistoricalBills } from "../lib/ml-predictor";
import { evaluatePolicy } from "../lib/policy-engine";
import { fetchWeather } from "../lib/weather";
import type { DashboardData, Profile } from "../types/database";

export { isSupabaseConfigured };

export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  if (!supabase) {
    if (email && password.length >= 4) {
      demoService.updateProfile({ email });
      return { user: { id: "demo-user", email }, error: null };
    }
    return { user: null, error: new Error("البريد أو كلمة المرور غير صحيحة") };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error };
}

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = getSupabase();
  if (!supabase) {
    demoService.updateProfile({ email, full_name: fullName });
    return { user: { id: "demo-user", email }, error: null };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  return { user: data.user, error };
}

export async function signOut() {
  const supabase = getSupabase();
  if (supabase) await supabase.auth.signOut();
  localStorage.removeItem("wafier_demo_state");
  localStorage.removeItem("wafier_session");
}

export async function resetPassword(email: string) {
  const supabase = getSupabase();
  if (!supabase) return { error: null };
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error };
}

export async function getSession() {
  const supabase = getSupabase();
  if (!supabase) {
    const session = localStorage.getItem("wafier_session");
    return session ? JSON.parse(session) : null;
  }
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function setDemoSession(email: string) {
  localStorage.setItem("wafier_session", JSON.stringify({ user: { email, id: "demo-user" } }));
}

export async function fetchDashboard(): Promise<DashboardData> {
  if (!isSupabaseConfigured) {
    return demoService.refreshDashboard();
  }

  const supabase = getSupabase()!;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: household } = await supabase.from("households").select("*").eq("user_id", user.id).single();
  const { data: budget } = await supabase.from("budgets").select("*").eq("household_id", household?.id).single();
  const { data: readings } = await supabase
    .from("meter_readings")
    .select("*")
    .eq("household_id", household?.id)
    .order("recorded_at", { ascending: false })
    .limit(100);
  const { data: forecastRow } = await supabase
    .from("bill_forecasts")
    .select("*")
    .eq("household_id", household?.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalKwh = readings?.reduce((s, r) => s + r.kwh, 0) ?? 890;
  const spend = kwhToSar(totalKwh);
  const budgetAmount = budget?.monthly_amount ?? 500;
  const weather = await fetchWeather(profile?.city ?? "الرياض");

  return {
    profile: profile as Profile,
    budget: budget!,
    currentKwh: totalKwh,
    currentSpendSar: spend,
    remainingSar: calculateRemaining(budgetAmount, spend),
    usagePct: budgetUsagePct(budgetAmount, spend),
    forecast: forecastRow,
    weather: {
      temp_c: weather.tempC,
      humidity: weather.humidity,
      description: weather.description,
      city: weather.city,
    },
    notifications: notifications ?? [],
    historicalBills: generateHistoricalBills(totalKwh),
    devices: disaggregateDevices(spend),
  };
}

export async function updateBudget(amount: number) {
  if (!isSupabaseConfigured) return demoService.setBudget(amount);
  const supabase = getSupabase()!;
  const { data: { user } } = await supabase.auth.getUser();
  const { data: household } = await supabase.from("households").select("id").eq("user_id", user!.id).single();
  await supabase.from("budgets").update({ monthly_amount: amount }).eq("household_id", household!.id);
  return fetchDashboard();
}

export async function updateProfile(data: Partial<Profile>) {
  if (!isSupabaseConfigured) {
    demoService.updateProfile(data);
    return;
  }
  const supabase = getSupabase()!;
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("profiles").update(data).eq("id", user!.id);
}

export async function setConsent() {
  if (!isSupabaseConfigured) {
    demoService.setConsent();
    return;
  }
  const supabase = getSupabase()!;
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("profiles").update({ consent_at: new Date().toISOString() }).eq("id", user!.id);
}

export async function runEvaluationScenario() {
  if (!isSupabaseConfigured) return demoService.simulateHeatwave();
  const supabase = getSupabase()!;
  const { data: { user } } = await supabase.auth.getUser();
  const { data: household } = await supabase.from("households").select("id").eq("user_id", user!.id).single();
  await supabase.functions.invoke("ingest-meter-reading", {
    body: { household_id: household!.id, kwh: 15, source: "heatwave_sim" },
  });
  await supabase.functions.invoke("evaluate-policy", { body: { household_id: household!.id } });
  return fetchDashboard();
}

export { demoService };
