import classNames from 'classnames';
import { Link } from 'react-router-dom';
import StarBorder from '@mui/icons-material/StarBorder';

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

  // const categoriesClasses = classNames(styles.root, {
  //   [styles.logoWhite]: variant === LogoVariant.WHITE,
  //   [styles.dark]: darkMode,
  // });

  return (
    <ul className={classNames(styles.root, styles[size], styles[variant], styles[theme], className)}>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink, styles.brand)} to={categoryPathSales} onClick={onClose}>
          {variant === 'filter' && <StarBorder />}
          <span>Sales</span>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathCloses} onClick={onClose}>
          <span>Clothes</span>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathDrinkWare} onClick={onClose}>
          <span>DrinkWare</span>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathOffice} onClick={onClose}>
          <span>Office</span>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link className={classNames('link', styles.menuLink)} to={categoryPathBags} onClick={onClose}>
          <span>Bags</span>
        </Link>
      </li>
    </ul>
  );
};

export default MenuCategories;
