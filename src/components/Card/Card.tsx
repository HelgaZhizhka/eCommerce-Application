import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { RoutePaths } from '../../routes/routes.enum';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import styles from './Card.module.scss';

type Props = {
  className?: string;
  productName?: string;
  description?: string;
  price?: number;
  priceOld?: number;
  priceDiscount?: number;
  currency?: string;
  cardImage?: string;
  isDiscount?: boolean;
};

const Card: React.FC<Props> = ({
  className,
  productName,
  description,
  price,
  priceOld,
  priceDiscount,
  currency,
  cardImage,
  isDiscount = false,
}) => {
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  return (
    <div className={classes}>
      {isDiscount && <span className={`badge badge_discount ${styles.badge}`}>Sale</span>}
      <div className={styles.cardPoster}>
        <img className={styles.cardImage} src={cardImage} alt={productName} />
        <Link className={styles.cardButton} to={RoutePaths.CART}>
          <Icon name={IconName.CART} width={20} height={20} color="inherit" className="icon mr-1" />
        </Link>
      </div>
      <div className={styles.cardBody}>
        <h4 className={`text-overflow ${styles.cardTitle}`}>{productName}</h4>
        <p className={`text-overflow ${styles.cardDescription}`}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        {price && (
          <span className={styles.cardPrice}>
            <span className={styles.value}>{price}</span>
            <span className={styles.currency}>{currency}</span>
          </span>
        )}
        {priceOld && (
          <span className={styles.cardPriceOld}>
            <span className={styles.value}>{priceOld}</span>
            <span className={styles.currency}>{currency}</span>
          </span>
        )}
        {priceDiscount && (
          <span className={styles.cardPriceDiscount}>
            <span className={styles.value}>{priceDiscount}</span>
            <span className={styles.currency}>{currency}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
