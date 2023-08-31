import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Product, ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

import { apiWithClientCredentialsFlow } from './BuildClient';

export async function getCategories(): Promise<Category[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.categories().get().execute()
  return response.body.results;
}

export async function getProducts(): Promise<Product[]> {
  const visitor = apiWithClientCredentialsFlow()
  const response = await visitor.products().get().execute()
  return response.body.results;
}


export async function getProductsByCategory(id: string): Promise<ProductProjection[]> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor.productProjections().search().get(
    {
      queryArgs: {
        filter: `categories.id:subtree("${id}")`
      }
    }
  ).execute()

  return response.body.results

}

export async function getProductByKey(key: string): Promise<Product> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .products()
    .withKey({ key: `${key}` })
    .get()
    .execute()

  return response.body
}

export async function getProductByFilter(filters: object[], categoryID: string): Promise<ProductProjectionPagedSearchResponse> {
  const visitor = apiWithClientCredentialsFlow();
  console.log(Object.values(filters[0]), categoryID)
  // const filterArray = variants.attributes.${}
  let filterPropertiesColors;
  let filterPropertiesSize;
  const filterPropertiescategoryID = `categories.id:subtree("${categoryID}")`;

  const filterProperties = [];
  if (Object.values(filters[0])[0].length) {
    filterPropertiesColors = `variants.attributes.color-clothes.key:${Object.values(filters[0]).map(item => item.map(item1 => `"${item1}"`)).join(",")}`;
    filterProperties.push(filterPropertiesColors)
  }
  if (Object.values(filters[1])[0].length) {
    filterPropertiesSize = `variants.attributes.size-clothes.key:${Object.values(filters[1]).map(item => item.map(item1 => `"${item1}"`)).join(",")}`;
    filterProperties.push(filterPropertiesSize)
  }
  filterProperties.push(filterPropertiescategoryID)
  console.log(Object.values(filters[1])[0]);

  const response = await visitor
    .productProjections()
    .search()
    .get(
      {
        queryArgs: {
          filter: filterProperties,
        }
      }
    )
    .execute()
  return response.body

//   {
//     "color-clothes": [
//         "Green",
//         "Orange"
//     ]
// }
// {
//   "color-clothes": [
//       "Green",
//       "Orange"
//   ]
// }
}
