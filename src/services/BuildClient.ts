import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import envConfig from '../constants/index';

const projectKey = `${envConfig.PROJECT_KEY_CLIENT}`;
const scopes = [`${envConfig.API_SCOPE_CLIENT}`];
const hostAUTH = `${envConfig.API_AUTH_URL_CLIENT}`;
const clientId = `${envConfig.CLIENT_ID_CLIENT}`;
const clientSecret = `${envConfig.CLIENT_SECRET_CLIENT}`;
const hostAPI = `${envConfig.API_URL_CLIENT}`;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${envConfig.API_URL_CLIENT}`,
  fetch,
};

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

export function apiWithClientCredentialsFlow(): any {
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
