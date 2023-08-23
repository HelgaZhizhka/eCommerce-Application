import { makeAutoObservable, runInAction } from 'mobx';
import { ProductType } from '../pages/Product/Product.interface';
// import { productService } from '../services/productService'; // Uncomment this line when you have the service ready

  type ProductStoreType = {
    products: ProductType[];
    currentProduct: ProductType | null;
    error: null | string;
    fetchProducts?: () => Promise<void>;
    fetchProduct?: (id: string) => Promise<void>;
  };

  const createProductStore = (): ProductStoreType => {
    const store = {
      products: [],
      currentProduct: null,
      error: null as null | string,

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
