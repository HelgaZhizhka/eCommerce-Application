import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { makeAutoObservable, runInAction } from 'mobx';

import { getCategories, getProducts } from '../services/productService';

type ProductType = {
  id: string;
  productName: string;
  description: string;
  price: number;
  priceDiscount?: number;
  currency: string;
  images?: Image[];
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
        const mainCategories = fetchedCategories.filter((item) => !item.parent).sort((a,b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

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
          const obj = {} as ProductType
          const data = item.masterData.current;
          obj.id = `${data.masterVariant.sku}`;
          obj.productName = `${data.name}`;
          obj.description = `${data.description}`;
          if (data.masterVariant.prices !== undefined){
            obj.price = data.masterVariant.prices[0].value.centAmount
            obj.currency = data.masterVariant.prices[0].value.currencyCode
            obj.isDiscount = Boolean(data.masterVariant.prices[0].discounted)
          }
          if (data.masterVariant.images !== undefined) obj.images = [...data.masterVariant.images]
          acc.push(obj)
          return acc;
        }, [] as ProductType[]);
        runInAction(() => {
          store.products = productsList;
        });
      } catch (err) {
        runInAction(() => {
          // store.error = 'Error fetching products';
        });
      }
    },

    async fetchProduct(): Promise<void> {
      try {
        // const fetchedProduct = await productService.getProduct(id);
        runInAction(() => {
          // store.currentProduct = fetchedProduct;
        });
      } catch (err) {
        runInAction(() => {
          // store.error = 'Error fetching product';
        });
      }
    },
  };

  makeAutoObservable(store);

  return store;
};

export const productStore = createProductStore();
