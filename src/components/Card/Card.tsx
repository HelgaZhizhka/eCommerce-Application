import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { RoutePaths } from '../../routes/routes.enum';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import cardImg from './images/TShirt.png';
import styles from './Card.module.scss';

type Props = {
  className?: string;
  isDiscount?: boolean;
};

const Card: React.FC<Props> = ({ className, isDiscount = true }) => {
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  return (
    <div className={classes}>
      {isDiscount && <span className={`badge badge_discount ${styles.badge}`}>Sale</span>}
      <div className={styles.cardPoster}>
        <img className={styles.cardImage} src={cardImg} alt="TShirt with label" />
        <Link className={styles.cardButton} to={RoutePaths.CART}>
          <Icon name={IconName.CART} width={20} height={20} color="inherit" className="icon mr-1" />
        </Link>
      </div>
      <div className={styles.cardBody}>
        <h4 className={`text-overflow ${styles.cardTitle}`}>Standart raccoon t-shirt</h4>
        <p className={`text-overflow ${styles.cardDescription}`}>
          Standart raccoon t-shirt raccoon t-shirt raccoon t-shirt raccoon t-shirt
        </p>
        <span className={styles.cardPriceNew}>
          <span className={styles.value}>15.00</span> <span className={styles.currency}>eur</span>
        </span>
        {/* <span className={styles.cardPrice}>
          <span className={styles.value}>15.00</span> <span className={styles.currency}>eur</span>
        </span> */}
        <span className={styles.cardPriceOld}>
          <span className={styles.value}>15.00</span> <span className={styles.currency}>eur</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
