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

  const { categories } = productStore;

  return (
    <ul className={classNames(styles.root, styles[size], styles[variant], styles[theme], className)}>
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.slug.en as CategorySlug];

        return (
          <li key={category.id} className={styles.menuItem}>
            <Link
              className={classNames(categoriesClasses, {
                [styles.brand]: category.slug.en === 'sale',
              })}
              to={`/${category.slug.en}`}
              onClick={onClose ? (): void => onClose() : undefined}
            >
              {variant === 'filter' ? (
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>{IconComponent && <IconComponent />}</ListItemIcon>
                  <ListItemText primary={category.name.en} />
                </ListItemButton>
              ) : (
                <span>{category.name.en}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default observer(Categories);
