import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../services/productService';
import { transformFetchedCategories } from '../stores/productHelpers';
import { ExtendedCategory } from '../stores/ProductStore.interfaces';

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: transformFetchedCategories,
    // the category tree changes only from Merchant Center — cache it for the session
    staleTime: Infinity,
  });

export const categoryIdByName = (
  categories: ExtendedCategory[] | undefined,
  nameCategory: string
): string | undefined => {
  if (!categories) return undefined;

  const mainCategory = categories.find((cat) => cat.name.en.toLowerCase() === nameCategory);
  if (mainCategory) return mainCategory.id;

  return categories
    .map((mainCat) => mainCat.subcategories)
    .flat()
    .find((subCat) => subCat?.name.en.toLowerCase() === nameCategory)?.id;
};
