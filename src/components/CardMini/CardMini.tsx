import { useState } from 'react';
import classNames from 'classnames';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import Button from '@mui/material/Button';

import { Price } from '../baseComponents/Price';
import { NumberInput } from '../baseComponents/NumberInput';
import holder from './images/holder.png';
import styles from './CardMini.module.scss';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';

type Props = {
  lineItemId: string;
  productName: string;
  price?: string;
  priceDiscount?: string;
  currency?: string;
  images: Image[];
  isDiscount?: boolean;
  className?: string;
  totalPrice?: string;
  quantity?: number;
  onDelete: (lineItemId: string) => void;
};

function getPriceValue(value: string | undefined): string | undefined {
  return value ? (+value / 100).toFixed(2) : undefined;
}

const CardMini: React.FC<Props> = ({
  lineItemId,
  productName,
  price,
  priceDiscount,
  currency,
  images,
  isDiscount = false,
  totalPrice,
  quantity,
  className,
  onDelete,
}) => {
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  const [quantityProduct, setQuantityProduct] = useState<number>(quantity || 1);

  const priceValue = getPriceValue(price);
  const discountPriceValue = getPriceValue(priceDiscount);
  const totalPriceValue = getPriceValue(totalPrice);

  let priceComponent = null;
  const image = images.filter((img) => img.label === 'average')[0]?.url;

  if (priceDiscount && discountPriceValue) {
    priceComponent = (
      <>
        <Price variant="new" currency={currency}>
          {discountPriceValue}
        </Price>
        <Price variant="old" currency={currency}>
          {priceValue}
        </Price>
      </>
    );
  } else if (priceValue) {
    priceComponent = <Price currency={currency}>{priceValue}</Price>;
  }

  const handleInputChange = (value: number): void => {
    setQuantityProduct(value);
  };

  const handleDelete = (): void => {
    onDelete(lineItemId);
  };

  return (
    <div className={classes}>
      <div className={styles.cardInfo}>
        {isDiscount && <span className={`badge badge_discount ${styles.badge}`}>Sale</span>}
        <div className={styles.cardPoster}>
          {image ? (
            <img className={styles.cardImage} src={image} alt={productName} />
          ) : (
            <img className={styles.cardImage} src={holder} alt={productName} />
          )}
        </div>
        <div className={styles.cardBody}>
          {productName && <h4 className={`text-overflow ${styles.cardTitle}`}>{productName}</h4>}
          <div className={styles.cardPrice}>{priceComponent}</div>
        </div>
      </div>
      <div className={styles.cardActions}>
        <NumberInput
          className={styles.cardQuantity}
          value={quantityProduct}
          onChange={handleInputChange}
          min={1}
          label="Quantity:"
        />
        <div className={styles.cardTotalPrice}>{totalPriceValue}</div>
      </div>
      <Button onClick={handleDelete}>
        <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" className="icon mr-1" />
      </Button>
    </div>
  );
};

export default CardMini;
