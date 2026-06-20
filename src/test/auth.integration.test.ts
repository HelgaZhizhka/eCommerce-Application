import { beforeEach, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';

import {
  clearSession,
  ensureSessionToken,
  getSessionToken,
  getVisitorToken,
  hasSession,
  isCustomerSession,
  loginSession,
} from '../services/session';
import { customerLogin, customerSignUp } from '../services/authService';
import { server, recordRequests } from './server';

const SESSION_KEY = 'ct_session';
const writeStoredSession = (kind: 'anonymous' | 'customer', expiresInMs: number): void =>
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token: 'stored', expiresAt: Date.now() + expiresInMs, kind }));

const authCalls = (calls: Request[], path: string): Request[] =>
  calls.filter((c) => c.url.endsWith(`/api/auth/${path}`));

beforeEach(() => localStorage.clear());

describe('session token lifecycle (auth BFF via MSW)', () => {
  it('memoizes the visitor token — one BFF call for repeated reads', async () => {
    clearSession(); // reset in-memory visitor cache
    const calls = recordRequests();

    const a = await getVisitorToken();
    const b = await getVisitorToken();

    expect(a).toBe('visitor-token');
    expect(b).toBe('visitor-token');
    expect(authCalls(calls, 'visitor')).toHaveLength(1);
  });

  it('creates an anonymous session lazily and reuses it', async () => {
    const calls = recordRequests();

    const first = await ensureSessionToken();
    expect(first).toBe('anon-token');
    expect(hasSession()).toBe(true);
    expect(isCustomerSession()).toBe(false);
    expect(localStorage.getItem(SESSION_KEY)).toContain('anonymous');

    const second = await ensureSessionToken();
    expect(second).toBe('anon-token');
    expect(authCalls(calls, 'anonymous')).toHaveLength(1); // not re-created
  });

  it('throws when reading a session token without any session', async () => {
    await expect(getSessionToken()).rejects.toThrow(/no active session/i);
  });

  it('refreshes a stale token through the BFF cookie and rewrites storage', async () => {
    writeStoredSession('customer', 10_000); // within the 60s expiry slack → stale
    const calls = recordRequests();

    const token = await getSessionToken();

    expect(token).toBe('refreshed-token');
    expect(authCalls(calls, 'refresh')).toHaveLength(1);
    expect(localStorage.getItem(SESSION_KEY)).toContain('refreshed-token');
    expect(isCustomerSession()).toBe(true); // kind preserved across refresh
  });

  it('drops the session when refresh fails', async () => {
    writeStoredSession('anonymous', 10_000);
    server.use(http.post('/api/auth/refresh', () => new HttpResponse(null, { status: 401 })));

    await expect(getSessionToken()).rejects.toBeDefined();
    expect(localStorage.getItem(SESSION_KEY)).toBeNull();
  });

  it('login stores a customer session via the BFF', async () => {
    const calls = recordRequests();
    await loginSession('shopper@test.dev', 'Secret123');

    const loginCall = authCalls(calls, 'login')[0];
    expect(await loginCall!.clone().json()).toEqual({ email: 'shopper@test.dev', password: 'Secret123' });
    expect(isCustomerSession()).toBe(true);
  });
});

describe('authService (BFF + CT me-endpoints via MSW)', () => {
  it('logs in: BFF login, me/login with credentials, then fetches the customer', async () => {
    const calls = recordRequests();
    const response = await customerLogin('shopper@test.dev', 'Secret123');

    expect(response.statusCode).toBe(200);
    expect(authCalls(calls, 'login').length).toBeGreaterThanOrEqual(1);

    const meLogin = calls.find((c) => c.method === 'POST' && c.url.endsWith('/me/login'));
    expect(await meLogin!.clone().json()).toEqual({ email: 'shopper@test.dev', password: 'Secret123' });
    expect(calls.some((c) => c.method === 'GET' && c.url.endsWith('/me'))).toBe(true);
  });

  it('signs up: anonymous session, then me/signup with a shaped customer draft', async () => {
    const calls = recordRequests();
    const response = await customerSignUp({
      email: 'new@test.dev',
      password: 'Secret123',
      firstName: 'New',
      lastName: 'Shopper',
      date: '1990-01-01',
      countryShipping: 'DE',
      streetShipping: 'Main 1',
      postalCodeShipping: '10115',
      cityShipping: 'Berlin',
      checkedShippingDefault: true,
      checkedAddBillingForm: false,
      countryBilling: 'DE',
      streetBilling: 'Side 2',
      postalCodeBilling: '10117',
      cityBilling: 'Berlin',
      checkedBillingDefault: false,
    });

    expect(response.statusCode).toBe(201);
    expect(authCalls(calls, 'anonymous')).toHaveLength(1);

    const signup = calls.find((c) => c.method === 'POST' && c.url.endsWith('/me/signup'));
    const body = (await signup!.clone().json()) as {
      email: string;
      addresses: unknown[];
      defaultShippingAddress?: number;
      defaultBillingAddress?: number;
    };
    expect(body.email).toBe('new@test.dev');
    expect(body.addresses).toHaveLength(2);
    expect(body.defaultShippingAddress).toBe(0);
    expect(body.defaultBillingAddress).toBeUndefined();
    // after a 201, the service logs the customer in and fetches /me
    expect(calls.some((c) => c.method === 'GET' && c.url.endsWith('/me'))).toBe(true);
  });
});
