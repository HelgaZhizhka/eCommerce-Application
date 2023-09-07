import { makeAutoObservable, runInAction } from 'mobx';

import { SortDetails, SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import {
  getCategories,
  getProductsByFilter,
  getProductByKey,
  getProductsByCategory,
  getProductsTypeByCategory,
  getSearchProducts,
} from '../services/productService';
import { ExtendedCategory } from './ProductStore.interfaces';
import { initialPriceRange } from '../constants';
import { getFetchedProducts, transformFetchedCategories } from './productHelpers';
import { ProductType } from './Product.type';

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
  filterPrice: number[];
  currentPage: number;
  totalProducts: number;
  setLoadingState: (type: 'app' | 'product' | 'products', state: boolean) => void;
  fetchProduct: (key: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSortState: (value: SortOption) => void;
  categoryIdByName: (nameCategory: string) => string | undefined;
  fetchProductsByCategory: (id: string | undefined) => Promise<void>;
  fetchProductsTypeByCategory: (id: string) => Promise<void>;
  fetchSearchProducts(id: string | undefined): Promise<void>;
  setSearchValue: (data: string) => void;
  getFilteredProducts: (id: string | undefined) => Promise<void>;
  setFilterOptions: () => Record<string, string[]>[];
  updateFilterSize: (data: string[]) => void;
  updateFilterColor: (data: string[]) => void;
  updateFilterPrice: (data: number[]) => void;
  clearFilterData: () => void;
  clearSearchValue: () => void;
  setCurrentPage: (pageNumber: number) => void;
  paginationNavigate: (pageNumber: number, id: string | undefined) => void;
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
    currentPage: 1,
    totalProducts: 0,
    filterSizes: [] as string[],
    filterColors: [] as string[],
    filterPrice: [initialPriceRange.min, initialPriceRange.max] as number[],

    setLoadingState(type: 'app' | 'product' | 'products', state: boolean): void {
      switch (type) {
        case 'app':
          this.isAppLoading = state;
          break;
        case 'product':
          this.isProductLoading = state;
          break;
        case 'products':
          this.isProductsLoading = state;
          break;
        default:
          break;
      }
    },

    setSortState(value: SortOption): void {
      runInAction(() => {
        store.sortState = value;
      });
    },

    async fetchCategories(): Promise<void> {
      store.setLoadingState('app', true);

      try {
        const fetchedCategories = await getCategories();
        const extendedMainCategories = transformFetchedCategories(fetchedCategories);

        runInAction(() => {
          store.categories = [...extendedMainCategories];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching categories';
        });
      } finally {
        store.setLoadingState('app', false);
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

    async fetchProductsTypeByCategory(categoryKey: string): Promise<void> {
      runInAction(() => {
        store.isFilterColor = false;
        store.isFilterSize = false;

        // if (store.searchValue) {
        //   store.clearSearchValue();
        // }
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
      if (!id) return;

      runInAction(() => {
        store.setLoadingState('products', true);

        if (store.searchValue) {
          store.clearSearchValue();
        }
      });

      try {
        const { results, total } = await getProductsByCategory(id, store.currentPage);

        runInAction(() => {
          const productsList = getFetchedProducts(results);
          if (total !== undefined) store.totalProducts = total;
          store.products = [...productsList];
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        store.setLoadingState('products', false);
      }
    },

    async fetchProduct(key: string): Promise<void> {
      store.setLoadingState('product', true);

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
        store.setLoadingState('product', false);
      }
    },

    async fetchSearchProducts(id: string | undefined): Promise<void> {
     if (!id) return;

      const { results, total } = await getSearchProducts(id, store.currentPage, store.searchValue);

      runInAction(() => {
        store.setLoadingState('products', true);
        store.filterColors = [];
        store.filterSizes = [];
        store.filterPrice = [initialPriceRange.min, initialPriceRange.max] as number[];
      });

      try {
        runInAction(() => {
          const productsList = getFetchedProducts(results);
          store.products = [...productsList];
          if (total !== undefined) store.totalProducts = total;
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        store.setLoadingState('products', false);
      }
    },

    async getFilteredProducts(id: string | undefined): Promise<void> {
      if (!id) return;

      runInAction(() => {
        store.setLoadingState('products', true);

        if (store.searchValue) {
          store.clearSearchValue();
        }
      });

      const filterAttributes = store.setFilterOptions();

      const { results, total } = await getProductsByFilter(
        id,
        store.currentPage,
        filterAttributes,
        store.filterPrice,
        SortDetails[store.sortState]
      );

      try {
        runInAction(() => {
          const productsList = getFetchedProducts(results);
          store.products = [...productsList];
          if (total !== undefined) store.totalProducts = total;
        });
      } catch (err) {
        runInAction(() => {
          store.error = 'Error fetching products';
        });
      } finally {
        store.setLoadingState('products', false);
      }
    },

    setFilterOptions(): Record<string, string[]>[] {
      const options = [];

      if (store.isColorAttribute) {
        options.push({
          [store.isColorAttribute]: store.filterColors,
        });
      }

      if (store.isSizeAttribute) {
        options.push({
          [store.isSizeAttribute]: store.filterSizes,
        });
      }

      const filters = options.filter((option) => {
        const key = Object.keys(option)[0];
        return option[key] && option[key].length > 0;
      });

      return filters;
    },

    paginationNavigate(pageNumber: number, id: string | undefined): void {
      if (!id) return;

      runInAction(() => {
        store.setCurrentPage(pageNumber);
      });


      if (store.searchValue.trim()) {
        store.fetchSearchProducts(id);
        return;
      }

      if (
        store.filterColors.length > 0 ||
        store.filterSizes.length > 0 ||
        store.filterPrice[0] !== initialPriceRange.min ||
        store.filterPrice[1] !== initialPriceRange.max
      ) {
        store.getFilteredProducts(id);
        return;
      }

      store.fetchProductsByCategory(id);
    },

    setSearchValue(data: string): void {
      store.searchValue = data;
    },

    clearSearchValue(): void {
      store.searchValue = '';
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
      store.sortState = SortOption.Default;
      store.filterPrice = [initialPriceRange.min, initialPriceRange.max] as number[];
    },

    setCurrentPage(pageNumber: number): void {
      runInAction(() => {
        store.currentPage = pageNumber;
      });
    },

    resetTotalProducts(): void {
      store.totalProducts = 0;
    },
  };

  makeAutoObservable(store);

  return store;
};

export const productStore = createProductStore();
