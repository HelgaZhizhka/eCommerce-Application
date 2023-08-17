import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { generateCatalogPath } from '../../routes/route.utils';
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
  const categoryPathSales = generateCatalogPath('sales');
  const categoryPathCloses = generateCatalogPath('closes');
  const categoryPathDrinkWare = generateCatalogPath('drinkware');
  const categoryPathOffice = generateCatalogPath('office');
  const categoryPathBags = generateCatalogPath('bags');

  return (
    <ul className={classNames(styles.root, styles[size], styles[variant], styles[theme], className)}>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink, styles.brand)} to={categoryPathSales} onClick={onClose}>
          Sales
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathCloses} onClick={onClose}>
          Closes
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathDrinkWare} onClick={onClose}>
          DrinkWare
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathOffice} onClick={onClose}>
          Office
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathBags} onClick={onClose}>
          Bags
        </Link>
      </li>
    </ul>
  );
};

export default MenuCategories;
