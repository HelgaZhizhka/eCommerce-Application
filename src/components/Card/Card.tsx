import classNames from 'classnames';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { Price } from '../baseComponents/Price';
import holder from './images/holder.png';
import styles from './Card.module.scss';

type Props = {
  productName: string;
  description: string;
  price: string;
  priceDiscount?: string;
  currency: string;
  images: Image[];
  isDiscount?: boolean;
  isInCart?: boolean;
  className?: string;
  onAddToCart: () => void;
};

const Card: React.FC<Props> = ({
  productName,
  description,
  price,
  priceDiscount,
  currency,
  images,
  isDiscount = false,
  className,
  isInCart,
  onAddToCart,
}) => {
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart();
  };

  const priceValue = price ? (+price / 100).toFixed(2) : undefined;
  const discountPriceValue = priceDiscount ? (+priceDiscount / 100).toFixed(2) : undefined;

  let priceComponent = null;
  const image = images.filter((img) => img.label === 'average')[0]?.url;

  if (priceDiscount && discountPriceValue) {
    priceComponent = (
      <>
        <Price variant="old" currency={currency}>
          {priceValue}
        </Price>
        <Price variant="new" currency={currency}>
          {discountPriceValue}
        </Price>
      </>
    );
  } else if (priceValue) {
    priceComponent = <Price currency={currency}>{priceValue}</Price>;
  }

  return (
    <div className={classes}>
      {isDiscount && <span className={`badge badge_discount ${styles.badge}`}>Sale</span>}
      <div className={styles.cardPoster}>
        {image ? (
          <img className={styles.cardImage} src={image} alt={productName} />
        ) : (
          <img className={styles.cardImage} src={holder} alt={productName} />
        )}
        <button
          className={classNames(styles.cardButton, {
            [styles.disabled]: isInCart,
          })}
          disabled={isInCart}
          onClick={handleAddToCart}
        >
          <Icon name={IconName.CART} width={20} height={20} color="inherit" className="icon mr-1" />
        </button>
      </div>
      <div className={styles.cardBody}>
        {productName && <h4 className={`text-overflow ${styles.cardTitle}`}>{productName}</h4>}
        {description && description !== 'undefined' && (
          <p
            className={`text-overflow ${styles.cardDescription}`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        )}
      </div>
      <div className={styles.cardFooter}>{priceComponent}</div>
    </div>
  );
};

export default Card;
