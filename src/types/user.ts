export type UserProfile = {
  name: string;
  email: string;
  city: string;
  createdAt: string;
};

export type StoredUser = UserProfile & {
  password: string;
};

export type AuthResult = { ok: true; user: UserProfile } | { ok: false; error: string };
