import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import { Categories } from '../../routes/routes.enum';
import { SIZE, THEME, VARIANT } from './MenuCategories.types';
import styles from './MenuCategories.module.scss';

type Props = {
  size?: SIZE;
  variant?: VARIANT;
  theme?: THEME;
  className?: string;
  onClose?: () => void;
};

const MenuCategories: React.FC<Props> = ({ className, size = 'm', variant = 'vertical', theme = 'light', onClose }) => {
  const categoryPathSales = `${Categories.SALES}`;
  const categoryPathCloses = `${Categories.CLOTHES}`;
  const categoryPathDrinkWare = `${Categories.DRINKWARE}`;
  const categoryPathOffice = `${Categories.OFFICE}`;
  const categoryPathBags = `${Categories.BAGS}`;

  const categoriesClasses = classNames(styles.menuLink, {
    link: variant !== 'filter',
  });

  return (
    <ul className={classNames(styles.root, styles[size], styles[variant], styles[theme], className)}>
      <li className={styles.menuItem}>
        <Link className={classNames(categoriesClasses, styles.brand)} to={categoryPathSales} onClick={onClose}>
          {variant === 'filter' ? (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TrendingDownIcon />
              </ListItemIcon>
              <ListItemText primary="Sales" />
            </ListItemButton>
          ) : (
            <span>Sales</span>
          )}
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames(categoriesClasses)} to={categoryPathCloses} onClick={onClose}>
          {variant === 'filter' ? (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CheckroomIcon />
              </ListItemIcon>
              <ListItemText primary="Clothes" />
            </ListItemButton>
          ) : (
            <span>Clothes</span>
          )}
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames(categoriesClasses)} to={categoryPathDrinkWare} onClick={onClose}>
          {variant === 'filter' ? (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalCafeIcon />
              </ListItemIcon>
              <ListItemText primary="DrinkWare" />
            </ListItemButton>
          ) : (
            <span>DrinkWare</span>
          )}
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames(categoriesClasses)} to={categoryPathOffice} onClick={onClose}>
          {variant === 'filter' ? (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Office" />
            </ListItemButton>
          ) : (
            <span>Office</span>
          )}
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames(categoriesClasses)} to={categoryPathBags} onClick={onClose}>
          {variant === 'filter' ? (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="Bags" />
            </ListItemButton>
          ) : (
            <span>Bags</span>
          )}
        </Link>
      </li>
    </ul>
  );
};

export default MenuCategories;
