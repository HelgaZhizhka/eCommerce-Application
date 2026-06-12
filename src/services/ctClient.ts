import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type Middleware,
  type MiddlewareRequest,
  type Next,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient, type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { ensureSessionToken, getSessionToken, getVisitorToken, loginSession } from './session';

const projectKey = `${import.meta.env.VITE_PROJECT_KEY_CLIENT}`;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${import.meta.env.VITE_API_URL_CLIENT}`,
  httpClient: fetch,
};

// One client per token source, built once. The middleware resolves the token
// lazily per request, so expiry/refresh is handled in session.ts alone.
const authInjector =
  (getToken: () => Promise<string>): Middleware =>
  (next: Next) =>
  async (request: MiddlewareRequest) => {
    const token = await getToken();
    return next({
      ...request,
      headers: { ...request.headers, Authorization: `Bearer ${token}` },
    });
  };

const buildApi = (getToken: () => Promise<string>): ByProjectKeyRequestBuilder => {
  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withMiddleware(authInjector(getToken))
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Catalog browsing: app-level read-only token.
export const publicApi = buildApi(getVisitorToken);

// Me-endpoints with an existing session (anonymous or customer).
export const sessionApi = buildApi(getSessionToken);

// Me-cart writes: creates the anonymous session lazily on first use.
export const cartApi = buildApi(ensureSessionToken);

// Authenticates against the BFF and returns the session-bound API.
// Async on purpose: token acquisition is a network call now.
export const apiWithPasswordFlow = async (email: string, password: string): Promise<ByProjectKeyRequestBuilder> => {
  await loginSession(email, password);
  return sessionApi;
};
