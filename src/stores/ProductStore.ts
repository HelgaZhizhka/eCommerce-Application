import { makeAutoObservable, runInAction } from 'mobx';
// import { productService } from '../services/productService'; // Uncomment this line when you have the service ready

type CategoryType = { //типизация категории ???? посмотреть в библиотеке
  id: string;
  name: string;
};

type ProductType = { //типизация продукта ???? посмотреть в библиотеке
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type ProductStoreType = { // типизация стора
  products: ProductType[];
  currentProduct: ProductType | null;
  categories: CategoryType[];
  error: null | string;
  fetchProducts?: () => Promise<void>;
  fetchProduct?: (id: string) => Promise<void>;
  fetchCategories?: () => Promise<void>;
};

const createProductStore = (): ProductStoreType => {
  const store = {
    products: [],
    categories: [],
    currentProduct: null,
    error: null as null | string,

    async fetchCategories(): Promise<void> {
      try {
        // const fetchedCategories = await categoryService.getCategories(); // предполагаем, что у вас есть соответствующий сервис для получения категорий
        runInAction(() => {
          // store.categories = fetchedCategories;
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

    async fetchProduct(id: string): Promise<void> {
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
