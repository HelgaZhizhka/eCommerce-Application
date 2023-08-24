import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';
import { makeAutoObservable, runInAction } from 'mobx';

import { getCategories } from '../services/productService'; // Uncomment this line when you have the service ready

type ProductType = { //  типизация продукта ???? посмотреть в библиотеке
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type ProductStoreType = { // типизация стора
  products: ProductType[];
  currentProduct: ProductType | null;
  categories: Category[];
  error: null | string;
  fetchProducts?: () => Promise<void>;
  fetchProduct?: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
};

const createProductStore = (): ProductStoreType => {
  const store = {
    products: [],
    categories: [] as Category[],
    currentProduct: null,
    error: null as null | string,

    async fetchCategories(): Promise<void> {
      try {
        const fetchedCategories = await getCategories(); // предполагаем, что у вас есть соответствующий сервис для получения категорий
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
        // const fetchedProducts = await productService.getProducts();
        runInAction(() => {
          // store.products = fetchedProducts;
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
