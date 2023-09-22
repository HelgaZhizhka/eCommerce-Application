export enum SortOption {
  Default = 'Default',
  NameAZ = 'Name, A-Z',
  NameZA = 'Name, Z-A',
  PriceLowToHigh = 'Price, low to high',
  PriceHighToLow = 'Price, high to low',
}

export const SortDetails: Record<SortOption, SortObject> = {
  [SortOption.Default]: { key: 'default', order: '' },
  [SortOption.NameAZ]: { key: 'name', order: 'asc' },
  [SortOption.NameZA]: { key: 'name', order: 'desc' },
  [SortOption.PriceLowToHigh]: { key: 'price', order: 'asc' },
  [SortOption.PriceHighToLow]: { key: 'price', order: 'desc' },
};

export type SortObject = {
  key: string;
  order: string;
};