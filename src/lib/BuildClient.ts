// import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import envConfig from '../constants/index';


const projectKey = `${envConfig.PROJECT_KEY_CLIENT}`;
const scopes = [`${envConfig.API_SCOPE_CLIENT}`];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `${envConfig.API_AUTH_URL_CLIENT}`,
  projectKey,
  credentials: {
    clientId: `${envConfig.CLIENT_ID_CLIENT}`,
    clientSecret: `${envConfig.CLIENT_SECRET_CLIENT}`,
  },
  scopes,
  fetch,
};

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: `${envConfig.API_AUTH_URL_CLIENT}`,
  projectKey,
  credentials: {
    clientId: `${envConfig.CLIENT_ID_CLIENT}`,
    clientSecret: `${envConfig.CLIENT_SECRET_CLIENT}`,
    user: {
      username: '',
      password: ''
    }
  }
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${envConfig.API_URL_CLIENT}`,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withPasswordFlow(passwordAuthMiddlewareOptions)
  // ...
  .withLoggerMiddleware() // Include middleware for logging
  .build();
