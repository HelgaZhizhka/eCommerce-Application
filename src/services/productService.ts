import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Product, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { AttributeDefinition } from '@commercetools/platform-sdk';

import { SortObject } from '../components/baseComponents/SortingList/SortList.enum';
import { DEFAULT_LIMIT } from '../constants';

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

export async function getProductsByCategory(
  id: string,
  currentPage: number
): Promise<{
  results: ProductProjection[];
  total: number | undefined;
}> {
  const visitor = apiWithClientCredentialsFlow();
  const offset = (currentPage - 1) * DEFAULT_LIMIT;

  const response = await visitor
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:subtree("${id}")`,
        limit: DEFAULT_LIMIT,
        offset,
      },
    })
    .execute();
  const { results, total } = response.body;

  return {
    results,
    total,
  };
}

export async function getProductsTypeByCategory(key: string): Promise<AttributeDefinition[] | undefined> {
  const visitor = apiWithClientCredentialsFlow();

  const response = await visitor
    .productTypes()
    .withKey({ key: `${key}` })
    .get()
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
  currentPage: number,
  filtersAttributes: Record<string, string[]>[],
  filterPrice?: number[],
  sortDetail?: SortObject
): Promise<{
  results: ProductProjection[];
  total: number | undefined;
}> {
  const visitor = apiWithClientCredentialsFlow();
  const offset = (currentPage - 1) * DEFAULT_LIMIT;

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

  const response = await visitor
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterProperties,
        ...(sortObj ? { sort: sortObj } : {}),
        limit: DEFAULT_LIMIT,
        offset,
      },
    })
    .execute();
  const { results, total } = response.body;

  return {
    results,
    total,
  };
}

export async function getSearchProducts(
  categoryID: string,
  currentPage: number,
  searchValue: string
): Promise<{
  results: ProductProjection[];
  total: number | undefined;
}> {
  const visitor = apiWithClientCredentialsFlow();
  const offset = (currentPage - 1) * DEFAULT_LIMIT;

  const filterPropertiesCategoryID = `categories.id:subtree("${categoryID}")`;

  const response = await visitor
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: DEFAULT_LIMIT,
        offset,
        filter: filterPropertiesCategoryID,
        'text.en': searchValue,
      },
    })
    .execute();

  const { results, total } = response.body;

  return {
    results,
    total,
  };
}
