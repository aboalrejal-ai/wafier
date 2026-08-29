import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const FALLBACK_URL = "https://mvoxqrtdencwimegkjas.supabase.co";
const FALLBACK_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12b3hxcnRkZW5jd2ltZWdramFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczOTg0OTcsImV4cCI6MjEwMjk3NDQ5N30.qxXuSmtiCc8QwXu5Kotswei6ldF7hpcfI9xFYsEzVDY";

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient<Database>(url, anonKey, {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return client;
}
