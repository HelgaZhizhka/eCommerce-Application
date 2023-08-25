import classNames from 'classnames';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import styles from './Card.module.scss';
import { Price } from '../baseComponents/Price';

type Props = {
  id: string;
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  cardImages: Image[];
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
  cardImages,
  isDiscount = false,
  className,
}) => {
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  const image = cardImages.length ? cardImages[0].url : '';
  const priceValue = (+price / 100).toFixed(2);
  let discountPriceValue;
  if (priceDiscount) discountPriceValue = (+priceDiscount / 100).toFixed(2);

  return (
    <div className={classes}>
      {isDiscount && <span className={`badge badge_discount ${styles.badge}`}>Sale</span>}
      <div className={styles.cardPoster}>
        <img className={styles.cardImage} src={image} alt={productName} />
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
              {priceValue}
            </Price>
            <Price variant="new" currency={currency}>
              {discountPriceValue}
            </Price>
          </>
        ) : (
          <Price currency={currency}>{priceValue}</Price>
        )}
      </div>
    </div>
  );
};

export default Card;
