import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';

export interface ExtendedCategory extends Category {
  subcategories?: ExtendedCategory[];
}
