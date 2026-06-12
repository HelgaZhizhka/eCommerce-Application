import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type ExistingTokenMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type TokenCache,
  type TokenStore,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient, type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

const projectKey = `${import.meta.env.VITE_PROJECT_KEY_CLIENT}`;
const scopes = [`${import.meta.env.VITE_SCOPES_CLIENT}`];
const hostAPI = `${import.meta.env.VITE_API_URL_CLIENT}`;
const hostAUTH = `${import.meta.env.VITE_AUTH_URL_CLIENT}`;
const clientId = `${import.meta.env.VITE_CLIENT_ID_CLIENT}`;
const clientSecret = `${import.meta.env.VITE_CLIENT_SECRET_CLIENT}`;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostAPI,
  httpClient: fetch,
};

const emptyStore: TokenStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

// ts-client v4 TokenCache is async; persistence behavior (raw token string in
// localStorage) is kept identical to the legacy client until phase 2's BFF
// sub-task replaces token handling entirely.
export class MyTokenCache implements TokenCache {
  private myCache: TokenStore = { ...emptyStore };

  public async set(newCache: TokenStore): Promise<void> {
    this.myCache = newCache;
    localStorage.setItem('token', this.myCache.token);
  }

  public async get(): Promise<TokenStore> {
    return this.myCache;
  }

  public clear(): void {
    this.myCache = { ...emptyStore };
    localStorage.removeItem('token');
  }
}

export const myToken = new MyTokenCache();

export function apiwithExistingTokenFlow(): ByProjectKeyRequestBuilder {
  const token = localStorage.getItem('token');
  const authorization = `Bearer ${token}`;
  const options: ExistingTokenMiddlewareOptions = { force: true };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(authorization, options)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export function apiWithPasswordFlow(email: string, password: string): ByProjectKeyRequestBuilder {
  myToken.clear();

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
      },
    },
    tokenCache: myToken,
    scopes,
    httpClient: fetch,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export function apiWithClientCredentialsFlow(): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    httpClient: fetch,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export function apiwithAnonymousSessionFlow(): ByProjectKeyRequestBuilder {
  myToken.clear();

  const anonymousMiddlewareOptions: AuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    tokenCache: myToken,
    scopes,
    httpClient: fetch,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}
