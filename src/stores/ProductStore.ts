import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { makeAutoObservable, runInAction } from 'mobx';

import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { getCategories, getProductByKey, getProductsByCategory } from '../services/productService';
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
  fetchProduct: (key: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSortState: (value: SortOption) => void;
  categoryIdByName: (nameCategory: string) => string | undefined;
  fetchProductsByCategory: (id: string | undefined) => Promise<void>;
  setSearchValue: (data: string) => void;
  isFilterSize: boolean;
  isFilterColor: boolean;
  isColorAttribute: string;
  isSizeAttribute: string;
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

    async fetchProductsByCategory(id: string | undefined): Promise<void> {
      runInAction(() => {
        store.isProductsLoading = true;
        store.isFilterColor = false;
        store.isFilterSize = false;
      });

      try {
        if (id === undefined) return;

        const fetchedProductsByCategory = await getProductsByCategory(id);
        const productsList: ProductType[] = fetchedProductsByCategory.reduce((acc, item) => {
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
          if (item.variants.length > 0) {
            if (item.variants[0].attributes?.length) {
              const isColor = !!item.variants[0].attributes.filter((atr) => atr.name.includes('color')).length;
              const isSize = !!item.variants[0].attributes.filter((atr) => atr.name.includes('size')).length;

              const colorAttribute = item.variants
              .map((attr) => (attr.attributes || []).find((atr) => atr.name.includes('color')))
              .find((attr) => attr !== undefined)?.name || '';

              const sizeAttribute = item.variants
              .map((attr) => (attr.attributes || []).find((atr) => atr.name.includes('size')))
              .find((attr) => attr !== undefined)?.name || '';

              runInAction(() => {
                store.isFilterColor = isColor;
                store.isFilterSize = isSize;
                store.isColorAttribute = colorAttribute;
                store.isSizeAttribute = sizeAttribute;
              });
            }
          }
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
    setSearchValue(data: string): void{
      store.searchValue = data
    } 
  };

  makeAutoObservable(store);

  return store;
};

export const productStore = createProductStore();
