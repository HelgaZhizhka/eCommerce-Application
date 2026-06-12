// The single owner of tokens in the browser. Talks only to our auth BFF
// (/api/auth/*) — the commercetools clientSecret never reaches this bundle.
//
// Three token kinds:
//  - visitor: app-level read-only token for catalog browsing (memory only)
//  - anonymous: guest session with a cart (persisted, refresh via httpOnly cookie)
//  - customer: logged-in session (persisted, refresh via httpOnly cookie)

type SessionKind = 'anonymous' | 'customer';

type TokenState = {
  token: string;
  expiresAt: number;
};

type StoredSession = TokenState & { kind: SessionKind };

const SESSION_KEY = 'ct_session';
const EXPIRY_SLACK_MS = 60_000;

let visitor: TokenState | null = null;
const inflight = new Map<string, Promise<TokenState>>();

class AuthRequestError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

const postAuth = async (path: string, body?: object): Promise<TokenState> => {
  const response = await fetch(`/api/auth/${path}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    throw new AuthRequestError(response.status, data.message ?? `Auth request failed (${response.status})`);
  }

  return (await response.json()) as TokenState;
};

// network dedupe: parallel callers share one BFF request per path
const postAuthOnce = (path: string, body?: object): Promise<TokenState> => {
  const pending = inflight.get(path);
  if (pending) return pending;

  const request = postAuth(path, body).finally(() => inflight.delete(path));
  inflight.set(path, request);
  return request;
};

const isFresh = (state: TokenState): boolean => state.expiresAt - EXPIRY_SLACK_MS > Date.now();

const readSession = (): StoredSession | null => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
};

const writeSession = (state: TokenState, kind: SessionKind): StoredSession => {
  const session: StoredSession = { ...state, kind };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const hasSession = (): boolean => readSession() !== null;

export const isCustomerSession = (): boolean => readSession()?.kind === 'customer';

export const getVisitorToken = async (): Promise<string> => {
  if (visitor && isFresh(visitor)) return visitor.token;
  visitor = await postAuthOnce('visitor');
  return visitor.token;
};

// Returns the current session token, refreshing through the BFF cookie when
// stale. Throws when there is no session at all — callers gate on hasSession().
export const getSessionToken = async (): Promise<string> => {
  const session = readSession();
  if (!session) throw new AuthRequestError(401, 'No active session');
  if (isFresh(session)) return session.token;

  try {
    const refreshed = await postAuthOnce('refresh');
    return writeSession(refreshed, session.kind).token;
  } catch (error) {
    localStorage.removeItem(SESSION_KEY);
    throw error;
  }
};

// Lazy anonymous session: reuses the current session, creates one only when
// a guest first needs a cart (2.4 — no more session on app load).
export const ensureSessionToken = async (): Promise<string> => {
  if (hasSession()) return getSessionToken();
  const created = await postAuthOnce('anonymous');
  return writeSession(created, 'anonymous').token;
};

// Password login. The me/login cart merge happens separately via the API —
// this only swaps the stored token to the customer one.
export const loginSession = async (email: string, password: string): Promise<void> => {
  const token = await postAuth('login', { email, password });
  writeSession(token, 'customer');
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
  visitor = null;
  // fire-and-forget: drops the refresh cookie
  void fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => undefined);
};
