// Shared helpers for the auth BFF functions. This is the ONLY place in the
// project allowed to read CTP_CLIENT_SECRET — it never reaches the browser.

const env = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server env var: ${name}`);
  return value;
};

export const projectKey = (): string => env('CTP_PROJECT_KEY');

const authHost = (): string => env('CTP_AUTH_URL');

const basicAuth = (): string =>
  `Basic ${Buffer.from(`${env('CTP_CLIENT_ID')}:${env('CTP_CLIENT_SECRET')}`).toString('base64')}`;

export const fullScopes = (): string => env('CTP_SCOPES');

// Catalog browsing needs read-only scopes; never hand the browser more.
export const visitorScopes = (): string =>
  fullScopes()
    .split(/\s+/)
    .filter((scope) => scope.startsWith('view_'))
    .join(' ');

export type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
};

export class CtAuthError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export const requestToken = async (path: string, params: Record<string, string>): Promise<TokenResponse> => {
  const response = await fetch(`${authHost()}${path}`, {
    method: 'POST',
    headers: {
      Authorization: basicAuth(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params).toString(),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string; error?: string };
    throw new CtAuthError(response.status, body.message ?? body.error ?? `Token request failed (${response.status})`);
  }

  return (await response.json()) as TokenResponse;
};

const REFRESH_COOKIE = 'ct_refresh';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, matches CT refresh token TTL order

export const refreshCookieHeader = (refreshToken: string): string =>
  `${REFRESH_COOKIE}=${encodeURIComponent(refreshToken)}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=${COOKIE_MAX_AGE}`;

export const clearCookieHeader = (): string =>
  `${REFRESH_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=0`;

export const readRefreshCookie = (req: Request): string | undefined => {
  const cookies = req.headers.get('cookie') ?? '';
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${REFRESH_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
};

// The browser only ever sees the access token and its expiry.
export const tokenJson = (token: TokenResponse, setCookie?: string): Response => {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (setCookie) headers.append('Set-Cookie', setCookie);

  return new Response(
    JSON.stringify({
      token: token.access_token,
      expiresAt: Date.now() + token.expires_in * 1000,
    }),
    { status: 200, headers }
  );
};

export const errorJson = (error: unknown): Response => {
  const status = error instanceof CtAuthError ? error.status : 500;
  const message = error instanceof Error ? error.message : 'Auth request failed';
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const methodNotAllowed = (): Response => new Response(null, { status: 405 });
