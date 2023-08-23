import classNames from 'classnames';

import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import styles from './Card.module.scss';
import { Price } from '../baseComponents/Price';

type Props = {
  id: string;
  productName?: string;
  description?: string;
  price?: string;
  priceDiscount?: string;
  currency?: string;
  cardImage?: string;
  isDiscount?: boolean;
  className?: string;
};

const Card: React.FC<Props> = ({
  // id,
  productName,
  description,
  price,
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
        {priceDiscount ? (
          <>
            <Price variant="old" currency={currency}>
              {price}
            </Price>
            <Price variant="new" currency={currency}>
              {priceDiscount}
            </Price>
          </>
        ) : (
          <Price currency={currency}>{price}</Price>
        )}
      </div>
    </div>
  );
};

export default Card;
