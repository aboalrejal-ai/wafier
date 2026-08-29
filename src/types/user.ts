export interface UserProfile {
  name: string;
  email: string;
  city: string;
  createdAt: string;
}

export interface StoredUser extends UserProfile {
  password: string;
}

export type AuthResult =
  | { ok: true; user: UserProfile }
  | { ok: false; error: string };
