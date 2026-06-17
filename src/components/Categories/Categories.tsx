import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Coffee, NotebookPen, Shirt, ShoppingBag, TrendingDown, type LucideIcon } from 'lucide-react';

import { useCategoriesQuery } from '../../queries/categories';
import { SubCategories } from '../SubCategories';
import { SIZE, THEME, VARIANT, CategorySlug } from './Categories.types';
import styles from './Categories.module.scss';
import { RoutePaths } from '../../routes/routes.enum';

type Props = {
  size?: SIZE;
  variant?: VARIANT;
  theme?: THEME;
  className?: string;
  onClose?: () => void;
};

const categoryIcons: Record<CategorySlug, LucideIcon> = {
  sale: TrendingDown,
  clothes: Shirt,
  drinkware: Coffee,
  office: NotebookPen,
  bags: ShoppingBag,
};

const Categories: React.FC<Props> = ({ className, size = 'm', variant = 'vertical', theme = 'light', onClose }) => {
  const categoriesClasses = classNames(styles.menuLink, {
    link: variant !== 'filter',
  });

  const { data: categories = [] } = useCategoriesQuery();

  const enhancedCategories = [
    {
      id: 'saleId',
      slug: { en: 'sale' },
      name: { en: 'Sale' },
      subcategories: [],
    },
    ...categories,
  ];

  return (
    <ul className={classNames(styles.root, styles[size], styles[variant], styles[theme], className)}>
      {enhancedCategories.map((category) => {
        const IconComponent = categoryIcons[category.slug.en as CategorySlug];

        return (
          <li key={category.id} className={styles.menuItem}>
            {variant === 'filter' ? (
              <>
                <Link
                  className="flex items-center gap-3 py-2 pl-8 transition-colors hover:bg-black/5"
                  to={category.slug.en === 'sale' ? RoutePaths.SALE : `/category/${category.slug.en}`}
                  onClick={onClose}
                >
                  {IconComponent && <IconComponent />}
                  <span>{category.name.en}</span>
                </Link>

                {category.subcategories && category.subcategories.length > 0 && (
                  <SubCategories
                    className={styles.subCategories}
                    subcategories={category.subcategories}
                    categoryId={category.slug.en}
                  />
                )}
              </>
            ) : (
              <>
                <Link
                  className={classNames(categoriesClasses, {
                    [styles.brand]: category.slug.en === 'sale',
                  })}
                  to={category.slug.en === 'sale' ? RoutePaths.SALE : `/category/${category.slug.en}`}
                  onClick={onClose ? (): void => onClose() : undefined}
                >
                  <span>{category.name.en}</span>
                </Link>

                {variant === 'mobile' && category.subcategories && category.subcategories.length > 0 && (
                  <SubCategories
                    subcategories={category.subcategories}
                    categoryId={category.slug.en}
                    onClose={onClose ? (): void => onClose() : undefined}
                  />
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
