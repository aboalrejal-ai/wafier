-- Wafier initial schema — ITU-T Y.3172 aligned

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT,
  city TEXT NOT NULL DEFAULT 'الرياض',
  consent_at TIMESTAMPTZ,
  member_since TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  alert_override_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Households
CREATE TABLE households (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'منزلي',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Budgets
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE UNIQUE,
  monthly_amount NUMERIC(10,2) NOT NULL DEFAULT 500,
  alert_l1_pct INT NOT NULL DEFAULT 50,
  alert_l2_pct INT NOT NULL DEFAULT 75,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tariff rates
CREATE TABLE tariff_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_name TEXT NOT NULL,
  max_kwh NUMERIC,
  rate_sar_per_kwh NUMERIC(6,4) NOT NULL,
  vat_pct NUMERIC(4,2) NOT NULL DEFAULT 15,
  fixed_fee_sar NUMERIC(6,2) NOT NULL DEFAULT 10
);

INSERT INTO tariff_rates (tier_name, max_kwh, rate_sar_per_kwh) VALUES
  ('residential_tier1', 6000, 0.18),
  ('residential_tier2', NULL, 0.30);

-- Meter readings (SRC → Collector)
CREATE TABLE meter_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  kwh NUMERIC(10,3) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT NOT NULL DEFAULT 'simulated'
);

-- Weather readings
CREATE TABLE weather_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  temp_c NUMERIC(5,2) NOT NULL,
  humidity INT NOT NULL,
  description TEXT,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bill forecasts (Model Node)
CREATE TABLE bill_forecasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  predicted_sar NUMERIC(10,2) NOT NULL,
  confidence NUMERIC(4,2) NOT NULL,
  model_version TEXT NOT NULL DEFAULT 'v1',
  season_profile TEXT NOT NULL DEFAULT 'baseline',
  is_sandbox BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Device breakdown
CREATE TABLE device_breakdown (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  household_id UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL,
  pct NUMERIC(5,2) NOT NULL,
  cost_sar NUMERIC(10,2) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications (Policy → Distributor)
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Chat messages (RAG)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'ai')),
  content TEXT NOT NULL,
  sources JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit logs (PDPL)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Regulation chunks for RAG
CREATE TABLE regulation_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536)
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE meter_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_own ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY households_own ON households FOR ALL USING (auth.uid() = user_id);
CREATE POLICY budgets_own ON budgets FOR ALL USING (
  household_id IN (SELECT id FROM households WHERE user_id = auth.uid())
);
CREATE POLICY meter_own ON meter_readings FOR ALL USING (
  household_id IN (SELECT id FROM households WHERE user_id = auth.uid())
);
CREATE POLICY forecast_own ON bill_forecasts FOR ALL USING (
  household_id IN (SELECT id FROM households WHERE user_id = auth.uid())
);
CREATE POLICY notifications_own ON notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY chat_own ON chat_messages FOR ALL USING (auth.uid() = user_id);

-- Trigger: create profile + household on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  INSERT INTO households (user_id) VALUES (NEW.id);
  INSERT INTO budgets (household_id)
  SELECT id FROM households WHERE user_id = NEW.id LIMIT 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
