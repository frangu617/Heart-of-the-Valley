export type SingleUserAccount = {
  username: string;
  password: string;
  email: string;
};

export type AuthSession = {
  username: string;
  email: string;
  loggedInAt: string;
};

export const AUTH_SESSION_KEY = "hotvAuthSession";

export const SINGLE_USER_ACCOUNT: SingleUserAccount = {
  username: "eddawg909",
  password: "1f90206ccf",
  email: "franciscogutierrez617@gmail.com",
};

const normalizeUsername = (value: string) => value.trim().toLowerCase();

export const verifyCredentials = (username: string, password: string): boolean =>
  normalizeUsername(username) ===
    normalizeUsername(SINGLE_USER_ACCOUNT.username) &&
  password === SINGLE_USER_ACCOUNT.password;

export const buildAuthSession = (): AuthSession => ({
  username: SINGLE_USER_ACCOUNT.username,
  email: SINGLE_USER_ACCOUNT.email,
  loggedInAt: new Date().toISOString(),
});

export const isValidAuthSession = (value: unknown): value is AuthSession => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<AuthSession>;
  return (
    candidate.username === SINGLE_USER_ACCOUNT.username &&
    candidate.email === SINGLE_USER_ACCOUNT.email &&
    typeof candidate.loggedInAt === "string"
  );
};
