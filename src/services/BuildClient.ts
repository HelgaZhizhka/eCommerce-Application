import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
  TokenCache,
  TokenStore,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const projectKey = `${import.meta.env.VITE_PROJECT_KEY_CLIENT}`;
const scopes = [`${import.meta.env.VITE_SCOPES_CLIENT}`];
const hostAPI = `${import.meta.env.VITE_API_URL_CLIENT}`;
const hostAUTH = `${import.meta.env.VITE_AUTH_URL_CLIENT}`;
const clientId = `${import.meta.env.VITE_CLIENT_ID_CLIENT}`;
const clientSecret = `${import.meta.env.VITE_CLIENT_SECRET_CLIENT}`;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostAPI,
  fetch,
};

export class MyTokenCache implements TokenCache {
  private myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  public set(newCache: TokenStore): void {
    this.clear();
    this.myCache = newCache;
    localStorage.setItem('token', this.myCache.token);
  }

  public get(): TokenStore {
    return this.myCache;
  }

  public clear(): void {
    this.myCache = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
    localStorage.removeItem('token');
  }
}

export const myToken = new MyTokenCache();

export function apiwithExistingTokenFlow(): ByProjectKeyRequestBuilder {
  type ExistingTokenMiddlewareOptions = {
    force?: boolean;
  };

  const token = localStorage.getItem('token');

  const authorization = `Bearer ${token}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(authorization, options)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  return apiRoot;
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
    fetch,
  };

  const ctpClientPassword = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(ctpClientPassword).withProjectKey({ projectKey });

  return apiRoot;
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
    fetch,
  };

  const ctpClientCredentialsFlow = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(ctpClientCredentialsFlow).withProjectKey({ projectKey });

  return apiRoot;
}

export function apiwithAnonymousSessionFlow(): ByProjectKeyRequestBuilder {
  myToken.clear();

  const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    tokenCache: myToken,
    scopes,
    fetch,
  };

  const ctpAnonymousMiddlewareOptions = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(ctpAnonymousMiddlewareOptions).withProjectKey({ projectKey });

  return apiRoot;
}
