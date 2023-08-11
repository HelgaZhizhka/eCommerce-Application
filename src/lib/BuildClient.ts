// import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import envConfig from '../constants/index';


const projectKey = `${envConfig.PROJECT_KEY}`;
const scopes = [`${envConfig.API_SCOPES}`];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `${envConfig.API_AUTH_URL}`,
  projectKey,
  credentials: {
    clientId: `${envConfig.CLIENT_ID}`,
    clientSecret: `${envConfig.CLIENT_SECRET}`,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${envConfig.API_URL}`,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withPasswordFlow(options)
  // ...
  .withLoggerMiddleware() // Include middleware for logging
  .build();
