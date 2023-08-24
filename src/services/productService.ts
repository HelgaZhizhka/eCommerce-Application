import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';

import { apiWithClientCredentialsFlow } from './BuildClient';

export async function getCategories():Promise<Category[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.categories().get().execute()
  return response.body.results;
}
