import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';
import envConfig from '../constants';

const projectKey = `${envConfig.PROJECT_KEY_CLIENT}`;

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({projectKey});