import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ByProjectKeyRequestBuilder
} from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import envConfig from '../constants/index';

const projectKey = `${envConfig.PROJECT_KEY_CLIENT}`;
const scopes = [`${envConfig.API_SCOPE_CLIENT}`];

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${envConfig.API_URL_CLIENT}`,
  fetch,
};

export function apiWithPasswordFlow(email:string, password:string):ByProjectKeyRequestBuilder {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: `${envConfig.API_AUTH_URL_CLIENT}`,
    projectKey,
    credentials: {
      clientId: `${envConfig.CLIENT_ID_CLIENT}`,
      clientSecret: `${envConfig.CLIENT_SECRET_CLIENT}`,
      user: {
        username: email,
        password
      }
    },
    scopes,
    fetch,
  }

  const ctpClientPassword = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(ctpClientPassword).withProjectKey({projectKey});
  return apiRoot;
}
