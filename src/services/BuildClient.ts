import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ByProjectKeyRequestBuilder
} from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
// import envConfig from '../constants/index';

const projectKey = `${process.env.REACT_APP_PROJECT_KEY_CLIENT}`;
const scopes = [`${process.env.REACT_APP_SCOPES_CLIENT}`];
const hostAUTH = `${process.env.REACT_APP_AUTH_URL_CLIENT}`;
const clientId = `${process.env.REACT_APP_CLIENT_ID_CLIENT}`;
const clientSecret = `${process.env.REACT_APP_CLIENT_SECRET_CLIENT}`;
// const hostAPI = `${process.env.REACT_APP_API_URL_CLIENT}`


const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${process.env.REACT_APP_API_URL_CLIENT}`,
  fetch,
};

export function apiWithPasswordFlow(email:string, password:string):ByProjectKeyRequestBuilder {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
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
