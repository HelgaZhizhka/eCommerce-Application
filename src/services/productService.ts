import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Product, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { AttributeDefinition } from '@commercetools/platform-sdk';

import { SortObject } from '../components/baseComponents/SortingList/SortList.enum';
import { apiWithClientCredentialsFlow } from './BuildClient';

export async function getCategories(): Promise<Category[]> {
  const visitor = apiWithClientCredentialsFlow();
  const response = await visitor.categories().get().execute();
  return response.body.results;
}

export async function getProducts(): Promise<Product[]> {
  const visitor = apiWithClientCredentialsFlow();
  const response = await visitor.products().get().execute();
  return response.body.results;
}

export async function getProductsByCategory(id: string): Promise<ProductProjection[]> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:subtree("${id}")`,
      },
    })
    .execute();

  return response.body.results;
}

export async function getProductsTypeByCategory(key: string): Promise<AttributeDefinition[] | undefined> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .productTypes()
    .withKey({ key: `${key}` })
    .get({
      queryArgs: {
        limit: 100,
      },
    })
    .execute();

  return response.body.attributes;
}

export async function getProductByKey(key: string): Promise<Product> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .products()
    .withKey({ key: `${key}` })
    .get()
    .execute();

  return response.body;
}

export async function getProductsByFilter(
  categoryID: string,
  filtersAttributes: Record<string, string[]>[],
  filterPrice?: number[],
  sortDetail?: SortObject
): Promise<ProductProjection[]> {
  const visitor = apiWithClientCredentialsFlow();
  console.log(filtersAttributes, filterPrice, sortDetail);

  const filterProperties: string[] = [`categories.id:subtree("${categoryID}")`];
  const filtersCounter = Object.values(filtersAttributes).length;

  let sortObj: string | undefined;

  for (let i = 0; i < filtersCounter; i += 1) {
    const filter = `variants.attributes.${Object.keys(filtersAttributes[i])}.key:${Object.values(filtersAttributes[i])
      .map((item) => item.map((item1) => `"${item1}"`))
      .join(',')}`;
    filterProperties.push(filter);
  }

  if (filterPrice?.length) {
    const from = filterPrice[0] * 100;
    const to = filterPrice[1] * 100;
    filterProperties.push(`variants.price.centAmount:range(${from} to ${to})`);
  }

  if (sortDetail?.key && sortDetail?.key !== 'default') {
    const sortKey = sortDetail.key === 'name' ? 'name.en' : sortDetail.key;
    sortObj = `${sortKey} ${sortDetail.order}`;
  }


  try {
    const response = await visitor
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: filterProperties,
          ...(sortObj ? { sort: sortObj } : {}),
          limit: 100,
        },
      })
      .execute();
    return response.body.results;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// export async function sortProducts(sortDetail: SortObject, categoryID: string): Promise<ProductProjection[]> {
//   const visitor = apiWithClientCredentialsFlow();

//   const filterPropertiesCategoryID = `categories.id:subtree("${categoryID}")`;

// let sortObj = '';

// if (sortDetail.key) {
//   const sortKey = sortDetail.key === 'name' ? 'name.en' : sortDetail.key;
//   sortObj = `${sortKey} ${sortDetail.order}`;
// }

//   const response = await visitor
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         filter: filterPropertiesCategoryID,
//         sort: sortObj,
//       },
//     })
//     .execute();

//   return response.body.results;
// }
