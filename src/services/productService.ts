import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Product } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

import { apiWithClientCredentialsFlow } from './BuildClient';

export async function getCategories():Promise<Category[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.categories().get().execute()
  return response.body.results;
}

export async function getProducts():Promise<Product[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.products().get().execute()
  return response.body.results;
}
