import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Product, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

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


export async function getProductsByCategory(id: string): Promise<ProductProjection[]>{
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor.productProjections().search().get(
    {queryArgs: {
      filter: `categories.id:subtree("${id}")`
    }}
  ).execute()

  return response.body.results

}

export async function getProductByKey(key: string): Promise<Product>  {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .products()
    .withKey({ key: `${key}` })
    .get()
    .execute()

  return response.body
}