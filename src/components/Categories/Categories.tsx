import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import { productStore } from '../../stores';
import { SubCategories } from '../SubCategories';
import { SIZE, THEME, VARIANT, CategorySlug } from './Categories.types';
import styles from './Categories.module.scss';

type Props = {
  size?: SIZE;
  variant?: VARIANT;
  theme?: THEME;
  className?: string;
  onClose?: () => void;
};

const categoryIcons: Record<CategorySlug, React.ComponentType> = {
  sale: TrendingDownIcon,
  clothes: CheckroomIcon,
  drinkware: LocalCafeIcon,
  office: EditNoteIcon,
  bags: ShoppingBagIcon,
};

const Categories: React.FC<Props> = ({ className, size = 'm', variant = 'vertical', theme = 'light', onClose }) => {
  const categoriesClasses = classNames(styles.menuLink, {
    link: variant !== 'filter',
  });

  const { categories, getProductsByDiscount } = productStore;

  const enhancedCategories = [
    {
      id: 'saleId',
      slug: { en: 'sale' },
      name: { en: 'Sale' },
      subcategories: [],
    },
    ...categories,
  ];

  const handleCategoryClick = (slug: string): void => {
    if (slug === 'sale') {
      getProductsByDiscount();
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <ul className={classNames(styles.root, styles[size], styles[variant], styles[theme], className)}>
      {enhancedCategories.map((category) => {
        const IconComponent = categoryIcons[category.slug.en as CategorySlug];

        return (
          <li key={category.id} className={styles.menuItem}>
            {variant === 'filter' ? (
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to={`/category/${category.slug.en}`}
                  onClick={(): void => handleCategoryClick(category.slug.en)}
                >
                  <ListItemIcon>{IconComponent && <IconComponent />}</ListItemIcon>
                  <ListItemText primary={category.name.en} />
                </ListItemButton>

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
                  to={`/category/${category.slug.en}`}
                  onClick={(): void => handleCategoryClick(category.slug.en)}
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

export default observer(Categories);
