import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { ProductVariant } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';
import { debounce } from '@mui/material';

import { Price } from '../baseComponents/Price';
import { NumberInput } from '../baseComponents/NumberInput';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import holder from './images/holder.png';
import styles from './CardMini.module.scss';
import { getPriceValue } from '../../stores/productHelpers';

type Props = {
  lineItemId: string;
  productName: string;
  price: number;
  priceDiscount?: number;
  currency?: string;
  variant?: ProductVariant;
  images: Image[];
  isDiscount?: boolean;
  className?: string;
  totalPrice?: number;
  quantity?: number;
  onDelete: (lineItemId: string) => void;
  onChangeQuantity: (lineItemId: string, quantity: number) => void;
};

const CardMini: React.FC<Props> = ({
  lineItemId,
  productName,
  price,
  priceDiscount,
  currency,
  variant,
  images,
  isDiscount = false,
  totalPrice,
  quantity,
  className,
  onDelete,
  onChangeQuantity,
}) => {
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  const minQuantity = 1;
  const maxQuantity = 10;

  const [quantityProduct, setQuantityProduct] = useState<number>(quantity || 1);

  const priceValue = getPriceValue(price);
  const discountPriceValue = priceDiscount ? getPriceValue(priceDiscount) : 0;
  const totalPriceValue = totalPrice ? getPriceValue(+totalPrice) : 0;

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

  const productColor = variant?.attributes?.find((attr) => attr.name.includes('color'))?.value.label;
  const productSize = variant?.attributes?.find((attr) => attr.name.includes('size'))?.value.label;

  const debouncedOnChangeQuantity = useCallback(
    debounce((value: number) => {
      if (value >= minQuantity && value <= maxQuantity) {
        onChangeQuantity(lineItemId, value);
      }
    }, 500),
    [lineItemId, minQuantity, maxQuantity, onChangeQuantity]
  );

  const handleInputChange = (inputValue: number): void => {
    let value = inputValue;

    if (value < minQuantity) {
      value = minQuantity;
    } else if (value > maxQuantity) {
      value = maxQuantity;
    }
    setQuantityProduct(value);
    debouncedOnChangeQuantity(value);
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
          <div className={styles.flex}>
            {productColor && <span className={`${styles.cardColor} ${styles[productColor]}`}></span>}
            {productSize && <span className={styles.cardSize}>{productSize}</span>}
          </div>
          {priceComponent && <div className={styles.cardPrice}>{priceComponent}</div>}
        </div>
      </div>
      <div className={styles.cardActions}>
        <NumberInput
          className={styles.cardQuantity}
          value={quantityProduct}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
          label="Quantity:"
        />
        <div className={styles.cardTotalPrice}>
          <Price currency={currency}>{totalPriceValue}</Price>
        </div>
      </div>
      <Button
        sx={{ p: 0, justifyContent: { xs: 'flex-end', sm: 'center' } }}
        onClick={handleDelete}
        className={styles.cardDelete}
      >
        <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" className="icon" />
      </Button>
    </div>
  );
};

export default CardMini;
