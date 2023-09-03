import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
  TokenCache,
  TokenStore,
  TokenCacheOptions,
} from '@commercetools/sdk-client-v2';
import { Middleware, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const projectKey = `${process.env.REACT_APP_PROJECT_KEY_CLIENT}`;
const scopes = [`${process.env.REACT_APP_SCOPES_CLIENT}`];
const hostAPI = `${process.env.REACT_APP_API_URL_CLIENT}`;
const hostAUTH = `${process.env.REACT_APP_AUTH_URL_CLIENT}`;
const clientId = `${process.env.REACT_APP_CLIENT_ID_CLIENT}`;
const clientSecret = `${process.env.REACT_APP_CLIENT_SECRET_CLIENT}`;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostAPI,
  fetch,
};

export class MyTokenCache implements TokenCache {
  public myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  }

  public set(newCache: TokenStore, tokenCacheOptions?: TokenCacheOptions): void {
    this.myCache = newCache;
    localStorage.setItem('token', this.myCache.token)
   }

  public get(tokenCacheOptions?: TokenCacheOptions): TokenStore {
     return this.myCache
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
    return apiRoot
}

export function apiWithPasswordFlow(email: string, password: string): ByProjectKeyRequestBuilder {
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

  localStorage.setItem('token', myToken.myCache.token);

  return apiRoot;
}

// export function apiWithRefreshTokenFlow(myToken: TokenCache): ByProjectKeyRequestBuilder {
//   const refreshTokenFlowOptions = {
//     host: hostAUTH,
//     projectKey,
//     credentials: {
//       clientId,
//       clientSecret,
//     },
//     refreshToken: myToken.get,
//     fetch,
//   };

//   const client = new ClientBuilder()
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withRefreshTokenFlow(refreshTokenFlowOptions)
//     .build();

//   const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
//   return apiRoot;
// }

export function apiWithClientCredentialsFlow(): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    // tokenCache: myToken,
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
