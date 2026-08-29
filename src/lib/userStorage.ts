import type { AuthResult, StoredUser, UserProfile } from "../types/user";

const USERS_KEY = "wafier.users";
const SESSION_KEY = "wafier.session";

type UsersMap = Record<string, StoredUser>;

function toProfile(user: StoredUser): UserProfile {
  return { name: user.name, email: user.email, city: user.city, createdAt: user.createdAt };
}

function readUsers(): UsersMap {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UsersMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeUsers(users: UsersMap) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSessionEmail(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function writeSession(email: string, remember: boolean) {
  sessionStorage.setItem(SESSION_KEY, email);
  if (remember) localStorage.setItem(SESSION_KEY, email);
  else localStorage.removeItem(SESSION_KEY);
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] || "";
  const cleaned = local.replace(/[._-]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "مستخدم";
  return cleaned
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function firstNameOf(name: string): string {
  const trimmed = name.trim();
  return trimmed.split(/\s+/)[0] || trimmed || "مستخدم";
}

export function formatMemberSince(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "عضو جديد";
  const monthYear = date.toLocaleDateString("ar-SA", { month: "long", year: "numeric", calendar: "gregory" });
  return `عضو منذ ${monthYear}`;
}

export function resolveDisplayName(input: {
  fullName?: string | null;
  email?: string | null;
  metadata?: Record<string, unknown> | null;
}): string {
  const fromProfile = (input.fullName ?? "").trim();
  if (fromProfile && fromProfile !== "جوري الفلاح") return fromProfile;
  const meta = input.metadata ?? {};
  const fromMeta = String(meta.full_name ?? meta.name ?? "").trim();
  if (fromMeta) return fromMeta;
  if (input.email) return nameFromEmail(input.email);
  return "مستخدم";
}

export function loadSession(): UserProfile | null {
  const email = readSessionEmail();
  if (!email) return null;
  const stored = readUsers()[normalizeEmail(email)];
  return stored ? toProfile(stored) : null;
}

export function login(email: string, password: string, remember: boolean): AuthResult {
  const normalized = normalizeEmail(email);
  if (!normalized || !password) {
    return { ok: false, error: "أدخل البريد الإلكتروني وكلمة المرور" };
  }

  const users = readUsers();
  const existing = users[normalized];

  if (existing) {
    if (existing.password !== password) {
      return { ok: false, error: "كلمة المرور غير صحيحة" };
    }
    writeSession(existing.email, remember);
    return { ok: true, user: toProfile(existing) };
  }

  const created: StoredUser = {
    name: nameFromEmail(normalized),
    email: normalized,
    city: "الرياض",
    password,
    createdAt: new Date().toISOString(),
  };
  users[normalized] = created;
  writeUsers(users);
  writeSession(created.email, remember);
  return { ok: true, user: toProfile(created) };
}

export function signup(name: string, email: string, password: string, remember = true): AuthResult {
  const trimmedName = name.trim();
  const normalized = normalizeEmail(email);
  if (!trimmedName || !normalized || password.length < 6) {
    return { ok: false, error: "أدخل اسماً وبريداً وكلمة مرور من 6 أحرف على الأقل" };
  }

  const users = readUsers();
  if (users[normalized]) {
    return { ok: false, error: "هذا البريد الإلكتروني مسجّل مسبقاً" };
  }

  const created: StoredUser = {
    name: trimmedName,
    email: normalized,
    city: "الرياض",
    password,
    createdAt: new Date().toISOString(),
  };
  users[normalized] = created;
  writeUsers(users);
  writeSession(created.email, remember);
  return { ok: true, user: toProfile(created) };
}

export function updateStoredProfile(
  currentEmail: string,
  patch: Partial<Pick<UserProfile, "name" | "email" | "city">>,
): AuthResult {
  const users = readUsers();
  const key = normalizeEmail(currentEmail);
  const existing = users[key];
  if (!existing) return { ok: false, error: "تعذر العثور على الحساب" };

  const nextEmail = patch.email !== undefined ? normalizeEmail(patch.email) : existing.email;
  const nextName = patch.name !== undefined ? patch.name.trim() : existing.name;
  const nextCity = patch.city !== undefined ? patch.city.trim() : existing.city;

  if (!nextName || !nextEmail) {
    return { ok: false, error: "الاسم والبريد الإلكتروني مطلوبان" };
  }

  if (nextEmail !== existing.email && users[nextEmail]) {
    return { ok: false, error: "هذا البريد الإلكتروني مستخدم مسبقاً" };
  }

  const updated: StoredUser = {
    ...existing,
    name: nextName,
    email: nextEmail,
    city: nextCity,
  };

  if (nextEmail !== key) delete users[key];
  users[nextEmail] = updated;
  writeUsers(users);

  const remember = Boolean(localStorage.getItem(SESSION_KEY));
  writeSession(updated.email, remember);
  return { ok: true, user: toProfile(updated) };
}

export function logout() {
  clearSession();
}
