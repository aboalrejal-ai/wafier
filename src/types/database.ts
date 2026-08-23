export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string;
  consent_at: string | null;
  member_since: string;
  alert_override_until: string | null;
}

export interface Household {
  id: string;
  user_id: string;
  name: string;
}

export interface Budget {
  id: string;
  household_id: string;
  monthly_amount: number;
  alert_l1_pct: number;
  alert_l2_pct: number;
}

export interface MeterReading {
  id: string;
  household_id: string;
  kwh: number;
  recorded_at: string;
  source: string;
}

export interface BillForecast {
  id: string;
  household_id: string;
  predicted_sar: number;
  confidence: number;
  model_version: string;
  season_profile: string;
  is_sandbox: boolean;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  level: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  role: "user" | "ai";
  content: string;
  sources: { title: string; source: string }[] | null;
  created_at: string;
}

export interface WeatherReading {
  temp_c: number;
  humidity: number;
  description: string;
  city: string;
}

export interface DashboardData {
  profile: Profile;
  budget: Budget;
  currentKwh: number;
  currentSpendSar: number;
  remainingSar: number;
  usagePct: number;
  forecast: BillForecast | null;
  weather: WeatherReading;
  notifications: AppNotification[];
  historicalBills: { month: string; value: number }[];
  devices: { type: string; label: string; pct: number; cost: number }[];
  sensors: { icon: string; label: string; value: string; unit: string; status: string }[];
  auditLog?: { id: string; at: string; action: string; detail: string }[];
  lastAnonymizedId?: string | null;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      households: { Row: Household; Insert: Partial<Household>; Update: Partial<Household> };
      budgets: { Row: Budget; Insert: Partial<Budget>; Update: Partial<Budget> };
      meter_readings: { Row: MeterReading; Insert: Partial<MeterReading>; Update: Partial<MeterReading> };
      bill_forecasts: { Row: BillForecast; Insert: Partial<BillForecast>; Update: Partial<BillForecast> };
      notifications: { Row: AppNotification; Insert: Partial<AppNotification>; Update: Partial<AppNotification> };
      chat_messages: { Row: ChatMessage; Insert: Partial<ChatMessage>; Update: Partial<ChatMessage> };
      audit_logs: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      tariff_rates: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      regulation_chunks: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
    };
  };
}
