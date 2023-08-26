import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { makeAutoObservable, runInAction } from 'mobx';

import { getCategories, getProducts } from '../services/productService';

type ProductType = {
  id: string;
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  images: Image[];
  isDiscount: boolean;
};

type ProductStoreType = {
  products: ProductType[];
  currentProduct: ProductType | null;
  categories: Category[];
  error: null | string;
  fetchProducts: () => Promise<void>;
  fetchProduct?: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
};

const createProductStore = (): ProductStoreType => {
  const store = {
    products: [] as ProductType[],
    categories: [] as Category[],
    currentProduct: null,
    error: null as null | string,

    async fetchCategories(): Promise<void> {
      try {
        const fetchedCategories = await getCategories();
        const mainCategories = fetchedCategories
          .filter((item) => !item.parent)
          .sort((a, b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

        runInAction(() => {
          store.categories = mainCategories;
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching categories';
        });
      }
    },

    async fetchProducts(): Promise<void> {
      try {
        const fetchedProducts = await getProducts();
        const productsList: ProductType[] = fetchedProducts.reduce((acc, item) => {
          const obj = {} as ProductType;
          const data = item.masterData.current;
          obj.id = `${data.masterVariant.sku}`;
          obj.productName = `${data.name?.en}`;
          obj.description = `${data.description?.en}`;
          if (data.masterVariant.prices?.length) {
            obj.price = `${data.masterVariant.prices[0]?.value?.centAmount}`;
            obj.currency = data.masterVariant.prices[0]?.value.currencyCode;
            obj.isDiscount = Boolean(data.masterVariant.prices[0]?.discounted);
            if (obj.isDiscount) obj.priceDiscount = `${data.masterVariant.prices[0]?.discounted?.value.centAmount}`;
          }
          if (data.masterVariant.images !== undefined) obj.images = [...data.masterVariant.images];
          acc.push(obj);
          return acc;
        }, [] as ProductType[]);
        runInAction(() => {
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      }
    },

  };

  makeAutoObservable(store);

  return store;
};

export const productStore = createProductStore();
