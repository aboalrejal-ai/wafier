import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";
import { getSession, setDemoSession, signOut as authSignOut } from "../services/data-service";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextValue {
  user: User | { id: string; email: string } | null;
  session: Session | null;
  loading: boolean;
  hasConsent: boolean;
  setHasConsent: (v: boolean) => void;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | { id: string; email: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);

  const refreshSession = async () => {
    const s = await getSession();
    if (s?.user) {
      setUser(s.user);
      setSession(s);
      const consent = localStorage.getItem("wafier_consent") === "true";
      setHasConsent(consent);
    } else {
      setUser(null);
      setSession(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshSession();
    if (isSupabaseConfigured) {
      const supabase = getSupabase()!;
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        setLoading(false);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const signOut = async () => {
    await authSignOut();
    setUser(null);
    setSession(null);
    setHasConsent(false);
    localStorage.removeItem("wafier_consent");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        hasConsent,
        setHasConsent: (v) => {
          setHasConsent(v);
          if (v) localStorage.setItem("wafier_consent", "true");
        },
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { setDemoSession };
