import { Category } from '@commercetools/platform-sdk';

export interface ExtendedCategory extends Category {
  subcategories?: ExtendedCategory[];
}
