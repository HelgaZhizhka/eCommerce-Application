import { ProductVariant } from '@commercetools/platform-sdk';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

import { SortOption } from '../components/baseComponents/SortingList/SortList.enum';
import { ExtendedCategory } from './ProductStore.interfaces';


export type ProductType = {
  productId: string;
  key: string;
  slug: string;
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  images: Image[];
  isDiscount: boolean;
  variants: ProductVariant[];
  totalPrice?: string;
};

export type ProductStoreType = {
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
  setProductCount: (count: number) => void;
  setProductInCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
};


export type CartStoreType = {
  productsInCart: ProductType[];
  productsInCartIds: Set<string>;
  totalAmount: number;
  error: null | string;
  success: null | string;
  addToCart: (productId: string, variantId?: number, quantity?: number | undefined) => Promise<void>;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  clearError: () => void;
  clearSuccess: () => void;
};


