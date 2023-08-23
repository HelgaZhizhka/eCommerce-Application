import classNames from 'classnames';

import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import styles from './Card.module.scss';

type Props = {
  id: string;
  productName?: string;
  description?: string;
  price?: number;
  priceOld?: number;
  priceDiscount?: number;
  currency?: string;
  cardImage?: string;
  isDiscount?: boolean;
  className?: string;
};

const Card: React.FC<Props> = ({
  id,
  productName,
  description,
  price,
  priceOld,
  priceDiscount,
  currency,
  cardImage,
  isDiscount = false,
  className,
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
        <div className={styles.cardButton}>
          <Icon name={IconName.CART} width={20} height={20} color="inherit" className="icon mr-1" />
        </div>
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
