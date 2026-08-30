import { getSupabase, isSupabaseConfigured } from "../lib/supabase";
import { demoService } from "./demo-service";
import {
  budgetUsagePct,
  calculateRemaining,
  kwhToSar,
  disaggregateDevices,
} from "../lib/financial-engine";
import { generateHistoricalBills } from "../lib/ml-predictor";
import { fetchWeather } from "../lib/weather";
import { login as localLogin, nameFromEmail, resolveDisplayName, signup as localSignup } from "../lib/userStorage";
import type { DashboardData, Profile } from "../types/database";
import type { User } from "@supabase/supabase-js";

export { isSupabaseConfigured };

function metaName(user: User): string {
  return resolveDisplayName({
    email: user.email,
    metadata: user.user_metadata as Record<string, unknown>,
  });
}

async function ensureUserRecords(user: User): Promise<{ profile: Profile; householdId: string; budget: DashboardData["budget"] }> {
  const supabase = getSupabase()!;
  const displayName = metaName(user);

  let { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (!profile) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email ?? "",
      full_name: displayName,
    });
    const created = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    profile = created.data;
  } else if (!profile.full_name || profile.full_name === "جوري الفلاح") {
    await supabase.from("profiles").update({ full_name: displayName, email: user.email ?? profile.email }).eq("id", user.id);
    profile = { ...profile, full_name: displayName, email: user.email ?? profile.email };
  }

  let { data: household } = await supabase.from("households").select("*").eq("user_id", user.id).maybeSingle();
  if (!household) {
    const inserted = await supabase.from("households").insert({ user_id: user.id, name: "منزلي" }).select("*").maybeSingle();
    household = inserted.data;
  }

  let { data: budget } = await supabase.from("budgets").select("*").eq("household_id", household?.id).maybeSingle();
  if (!budget && household?.id) {
    const inserted = await supabase.from("budgets").insert({ household_id: household.id, monthly_amount: 500 }).select("*").maybeSingle();
    budget = inserted.data;
  }

  const resolved: Profile = {
    id: user.id,
    full_name: profile?.full_name || displayName,
    email: profile?.email || user.email || "",
    phone: profile?.phone ?? null,
    city: profile?.city || "الرياض",
    consent_at: profile?.consent_at ?? null,
    member_since: profile?.member_since || new Date().toISOString(),
    alert_override_until: profile?.alert_override_until ?? null,
  };

  return {
    profile: resolved,
    householdId: household?.id ?? "",
    budget: budget ?? {
      id: "local-budget",
      household_id: household?.id ?? "",
      monthly_amount: 500,
      alert_l1_pct: 50,
      alert_l2_pct: 75,
    },
  };
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  if (!supabase) {
    const result = localLogin(email, password, true);
    if (!result.ok) return { user: null, error: new Error(result.error) };
    demoService.applyIdentity({
      email: result.user.email,
      full_name: result.user.name,
      city: result.user.city || "الرياض",
      member_since: result.user.createdAt,
    });
    return { user: { id: "demo-user", email: result.user.email }, error: null };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error };
}

export async function signInWithGoogle() {
  const supabase = getSupabase();
  if (!supabase) {
    return { error: new Error("Google يحتاج ربط قاعدة Wafir") };
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/consent`,
      queryParams: { prompt: "select_account" },
    },
  });
  return { error };
}

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = getSupabase();
  if (!supabase) {
    const result = localSignup(fullName, email, password, true);
    if (!result.ok) return { user: null, error: new Error(result.error) };
    demoService.applyIdentity({
      email: result.user.email,
      full_name: result.user.name,
      city: result.user.city || "الرياض",
      member_since: result.user.createdAt,
    });
    return { user: { id: "demo-user", email: result.user.email }, error: null };
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
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });
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

  const ensured = await ensureUserRecords(user);

  const { data: readings } = await supabase
    .from("meter_readings")
    .select("*")
    .eq("household_id", ensured.householdId)
    .order("recorded_at", { ascending: false })
    .limit(100);
  const { data: forecastRow } = await supabase
    .from("bill_forecasts")
    .select("*")
    .eq("household_id", ensured.householdId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalKwh = readings && readings.length > 0 ? readings.reduce((s, r) => s + Number(r.kwh), 0) : 890;
  const spend = kwhToSar(totalKwh);
  const budgetAmount = Number(ensured.budget.monthly_amount) || 500;
  const weather = await fetchWeather(ensured.profile.city ?? "الرياض");

  return {
    profile: ensured.profile,
    budget: ensured.budget,
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
  const { data: household } = await supabase.from("households").select("id").eq("user_id", user!.id).maybeSingle();
  if (household?.id) {
    await supabase.from("budgets").update({ monthly_amount: amount }).eq("household_id", household.id);
  }
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
  const { data: household } = await supabase.from("households").select("id").eq("user_id", user!.id).maybeSingle();
  await supabase.functions.invoke("ingest-meter-reading", {
    body: { household_id: household?.id, kwh: 15, source: "heatwave_sim" },
  });
  await supabase.functions.invoke("evaluate-policy", { body: { household_id: household?.id } });
  return fetchDashboard();
}

export async function runScenarioHeatwave() {
  if (!isSupabaseConfigured) return demoService.simulateHeatwave();
  return runEvaluationScenario();
}

export async function runScenarioDataGap() {
  if (!isSupabaseConfigured) return demoService.simulateDataGap();
  return fetchDashboard();
}

export async function runScenarioAdsControversy() {
  if (!isSupabaseConfigured) return demoService.simulateAdsControversy();
  return fetchDashboard();
}

export async function runScenarioCompliantRag() {
  if (!isSupabaseConfigured) return demoService.simulateCompliantRag();
  return fetchDashboard();
}

export { demoService };
