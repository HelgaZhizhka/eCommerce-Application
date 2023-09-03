import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { makeAutoObservable, runInAction } from 'mobx';

import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import {
  getCategories,
  getProductsByFilter,
  getProductByKey,
  getProductsByCategory,
  getProductsByPrice,
  getProductsTypeByCategory,
  getProductsDiscounted,
} from '../services/productService';
import { ExtendedCategory } from './ProductStore.interfaces';

type ProductType = {
  key: string;
  slug: string;
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  images: Image[];
  isDiscount: boolean;
};

type ProductStoreType = {
  isAppLoading: boolean;
  isProductsLoading: boolean;
  isProductLoading: boolean;
  products: ProductType[];
  currentProduct: ProductType | null;
  categories: ExtendedCategory[];
  error: null | string;
  sortState: SortOption;
  searchValue: string;
  isFilterSize: boolean;
  isFilterColor: boolean;
  isColorAttribute: string;
  isSizeAttribute: string;
  filterSizes: string[];
  filterColors: string[];
  filterPrice: number | number[];
  fetchProduct: (key: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSortState: (value: SortOption) => void;
  categoryIdByName: (nameCategory: string) => string | undefined;
  getFetchedProducts: (fetchedProducts: ProductProjection[]) => ProductType[];
  fetchProductsByCategory: (id: string | undefined) => Promise<void>;
  fetchProductsTypeByCategory: (id: string) => Promise<void>;
  setSearchValue: (data: string) => void;
  getFilteredProducts: (category: string) => Promise<void>;
  getFilteredProductsByPrice: (category: string) => Promise<void>;
  getProductsByDiscount: () => Promise<void>;
  setFilterOptions: () => Record<string, string[]>[];
  updateFilterSize: (data: string[]) => void;
  updateFilterColor: (data: string[]) => void;
  updateFilterPrice: (data: number[]) => void;
  clearFilterData: () => void;
};

const createProductStore = (): ProductStoreType => {
  const store = {
    isAppLoading: false,
    isProductsLoading: false,
    isProductLoading: false,
    searchValue: '',
    products: [] as ProductType[],
    currentProduct: {} as ProductType,
    categories: [] as ExtendedCategory[],
    error: null as null | string,
    sortState: SortOption.Default,
    isFilterSize: false,
    isFilterColor: false,
    isColorAttribute: '',
    isSizeAttribute: '',
    filterSizes: [] as string[],
    filterColors: [] as string[],
    filterPrice: [10, 80] as number[],

    setSortState(value: SortOption): void {
      store.sortState = value;
    },

    async fetchCategories(): Promise<void> {
      runInAction(() => {
        store.isAppLoading = true;
      });

      try {
        const fetchedCategories = await getCategories();
        const mainCategories = fetchedCategories
          .filter((item) => !item.parent)
          .sort((a, b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

        const subCategories = fetchedCategories
          .filter((item) => item.parent)
          .sort((a, b) => parseFloat(a.orderHint) - parseFloat(b.orderHint));

        const extendedMainCategories = mainCategories.map((mainCategory) => ({
          ...mainCategory,
          subcategories: subCategories.filter((sub) => sub.parent?.id === mainCategory.id),
        }));

        runInAction(() => {
          store.categories = [...extendedMainCategories];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching categories';
        });
      } finally {
        runInAction(() => {
          store.isAppLoading = false;
        });
      }
    },

    categoryIdByName(nameCategory: string): string | undefined {
      const mainCategory = store.categories.find((cat) => cat.name.en.toLowerCase() === nameCategory);

      if (mainCategory) {
        return mainCategory.id;
      }

      const subCategory = store.categories
        .map((mainCat) => mainCat.subcategories)
        .flat()
        .find((subCat) => subCat?.name.en.toLowerCase() === nameCategory);

      if (subCategory) {
        return subCategory.id;
      }

      return undefined;
    },

    getFetchedProducts(fetchedProducts: ProductProjection[]): ProductType[] {
      const productsList: ProductType[] = fetchedProducts.reduce((acc, item) => {
        const obj = {} as ProductType;
        obj.key = `${item.key}`;
        obj.productName = `${item.name?.en}`;
        obj.description = `${item.description?.en}`;

        if (item.masterVariant.prices?.length) {
          obj.price = `${item.masterVariant.prices[0]?.value?.centAmount}`;
          obj.currency = item.masterVariant.prices[0]?.value.currencyCode;
          obj.isDiscount = Boolean(item.masterVariant.prices[0]?.discounted);

          if (obj.isDiscount) obj.priceDiscount = `${item.masterVariant.prices[0]?.discounted?.value.centAmount}`;
        }

        if (item.masterVariant.images !== undefined) obj.images = [...item.masterVariant.images];
        acc.push(obj);

        return acc;
      }, [] as ProductType[]);

      return productsList;
    },

    async fetchProductsTypeByCategory(categoryKey: string): Promise<void> {
      runInAction(() => {
        store.isFilterColor = false;
        store.isFilterSize = false;
      });

      const key = `${categoryKey[0].toUpperCase()}${categoryKey.slice(1)}`;

      const productTypes = await getProductsTypeByCategory(`${key}`);

      if (!productTypes) return;

      const isColorAttribute = productTypes.filter((atr) => atr.name.includes('color'))[0]?.name || '';
      const isSizeAttribute = productTypes.filter((atr) => atr.name.includes('size'))[0]?.name || '';

      runInAction(() => {
        store.isSizeAttribute = isSizeAttribute;
        store.isColorAttribute = isColorAttribute;
        store.isFilterColor = !!isColorAttribute;
        store.isFilterSize = !!isSizeAttribute;
      });
    },

    async fetchProductsByCategory(id: string | undefined): Promise<void> {
      runInAction(() => {
        store.clearFilterData();
        store.isProductsLoading = true;
      });

      try {
        if (id === undefined) return;

        const fetchedProducts = await getProductsByCategory(id);

        runInAction(() => {
          const productsList = store.getFetchedProducts(fetchedProducts);
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        runInAction(() => {
          store.isProductsLoading = false;
        });
      }
    },

    async fetchProduct(key: string): Promise<void> {
      runInAction(() => {
        store.isProductLoading = true;
      });

      try {
        if (key === undefined) return;
        const fetchedProductByKey = await getProductByKey(key);
        const data = fetchedProductByKey.masterData?.current;
        const obj = {} as ProductType;
        obj.key = `${fetchedProductByKey.key}`;
        obj.productName = `${data.name?.en}`;
        obj.description = `${data.description?.en}`;

        if (data.masterVariant.prices?.length) {
          obj.price = `${data.masterVariant.prices[0]?.value?.centAmount}`;
          obj.currency = data.masterVariant.prices[0]?.value.currencyCode;
          obj.isDiscount = Boolean(data.masterVariant.prices[0]?.discounted);

          if (obj.isDiscount) obj.priceDiscount = `${data.masterVariant.prices[0]?.discounted?.value.centAmount}`;
        }
        if (data.masterVariant.images !== undefined) obj.images = [...data.masterVariant.images];

        if (obj) {
          runInAction(() => {
            store.currentProduct = { ...obj };
          });
        }
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        runInAction(() => {
          store.isProductLoading = false;
        });
      }
    },

    async getFilteredProducts(category: string): Promise<void> {
      const data = store.setFilterOptions();
      const categoryId = store.categoryIdByName(category);

      if (!categoryId) return;

      const fetchedProductsByFilter = await getProductsByFilter(data, categoryId);

      runInAction(() => {
        store.isProductsLoading = true;
      });

      try {
        runInAction(() => {
          const productsList = store.getFetchedProducts(fetchedProductsByFilter);
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        runInAction(() => {
          store.isProductsLoading = false;
        });
      }
    },

    async getFilteredProductsByPrice(category: string): Promise<void> {
      const categoryId = store.categoryIdByName(category);

      const data = store.filterPrice;

      if (!categoryId) return;

      const fetchedProducts = await getProductsByPrice(data, categoryId);

      runInAction(() => {
        store.isProductsLoading = true;
      });

      try {
        runInAction(() => {
          const productsList = store.getFetchedProducts(fetchedProducts);
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        runInAction(() => {
          store.isProductsLoading = false;
        });
      }
    },

    async getProductsByDiscount(): Promise<void> {
      const fetchedProducts = await getProductsDiscounted();

      runInAction(() => {
        store.isProductsLoading = true;
      });

      try {
        runInAction(() => {
          const productsList = store.getFetchedProducts(fetchedProducts);
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        runInAction(() => {
          store.isProductsLoading = false;
        });
      }
    },

    setFilterOptions(): Record<string, string[]>[] {
      let options = [];

      if (!store.isColorAttribute) {
        options = [
          {
            [store.isSizeAttribute]: store.filterSizes,
          },
        ];
      }

      if (!store.isSizeAttribute) {
        options = [
          {
            [store.isColorAttribute]: store.filterColors,
          },
        ];
      }

      options = [
        {
          [store.isColorAttribute]: store.filterColors,
        },
        {
          [store.isSizeAttribute]: store.filterSizes,
        },
      ];

      const filteredOptions = options.filter((option) => {
        const key = Object.keys(option)[0];
        return option[key] && option[key].length > 0;
      });

      return filteredOptions;
    },

    updateFilterSize(data: string[]): void {
      store.filterSizes = [...data];
    },

    updateFilterColor(data: string[]): void {
      store.filterColors = [...data];
    },

    updateFilterPrice(data: number[]): void {
      store.filterPrice = [...data];
    },

    clearFilterData(): void {
      store.filterColors = [];
      store.filterSizes = [];
      store.isFilterSize = false;
      store.isFilterColor = false;
      store.isColorAttribute = '';
      store.isSizeAttribute = '';
      store.filterPrice = [10, 80];
    },

    setSearchValue(data: string): void {
      store.searchValue = data;
    },
  };

  makeAutoObservable(store);

  return store;
};

export const productStore = createProductStore();
