import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { UserProfile } from "../types/user";
import * as storage from "../lib/userStorage";

type SimpleResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: UserProfile | null;
  login: (email: string, password: string, remember: boolean) => SimpleResult;
  signup: (name: string, email: string, password: string) => SimpleResult;
  updateProfile: (patch: Partial<Pick<UserProfile, "name" | "email" | "city">>) => SimpleResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => storage.loadSession());

  const login = useCallback((email: string, password: string, remember: boolean): SimpleResult => {
    const result = storage.login(email, password, remember);
    if (!result.ok) return result;
    setUser(result.user);
    return { ok: true };
  }, []);

  const signup = useCallback((name: string, email: string, password: string): SimpleResult => {
    const result = storage.signup(name, email, password, true);
    if (!result.ok) return result;
    setUser(result.user);
    return { ok: true };
  }, []);

  const updateProfile = useCallback((patch: Partial<Pick<UserProfile, "name" | "email" | "city">>): SimpleResult => {
    if (!user) return { ok: false, error: "لا توجد جلسة مستخدم" };
    const result = storage.updateStoredProfile(user.email, patch);
    if (!result.ok) return result;
    setUser(result.user);
    return { ok: true };
  }, [user]);

  const logout = useCallback(() => {
    storage.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, updateProfile, logout }),
    [user, login, signup, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
