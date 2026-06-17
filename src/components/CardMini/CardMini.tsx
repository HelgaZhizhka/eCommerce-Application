import { useCallback, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { ProductVariant } from '@commercetools/platform-sdk';

import { Price } from '../baseComponents/Price';
import { NumberInput } from '../baseComponents/NumberInput';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { getPriceValue } from '../../stores/productHelpers';
import { debounce } from '../../utils/helpers';
import { cn } from '../../shared/lib/cn';
import holder from './images/holder.png';

// color label → swatch background (was SCSS .orange/.green/... classes)
const COLOR_VARS: Record<string, string> = {
  orange: 'var(--filter-orange)',
  green: 'var(--filter-green)',
  blue: 'var(--filter-blue)',
  black: 'var(--filter-black)',
  gray: 'var(--filter-gray)',
  brown: 'var(--filter-brown)',
  purple: 'var(--filter-purple)',
  lightblue: 'var(--filter-lightblue)',
  multicolor: 'var(--multicolor)',
};

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
  isPromo?: boolean;
  promoPrice?: number;
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
  isPromo,
  promoPrice,
  className,
  onDelete,
  onChangeQuantity,
}) => {
  const minQuantity = 1;
  const maxQuantity = 10;

  const [quantityProduct, setQuantityProduct] = useState<number>(quantity || 1);

  const priceValue = getPriceValue(price);
  const discountPriceValue = priceDiscount ? getPriceValue(priceDiscount) : 0;
  const promoPriceValue = promoPrice ? getPriceValue(promoPrice) : 0;
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
  } else if (promoPriceValue && isPromo) {
    priceComponent = (
      <>
        <Price variant="new" currency={currency}>
          {promoPriceValue}
        </Price>
        <Price variant="old" currency={currency}>
          {priceValue}
        </Price>
      </>
    );
  } else if (priceValue) {
    priceComponent = <Price currency={currency}>{priceValue}</Price>;
  }

  const productColor = variant?.attributes?.find((attr) => attr.name.includes('color'))?.value.label as
    | string
    | undefined;
  const productSize = variant?.attributes?.find((attr) => attr.name.includes('size'))?.value.label;
  const swatch = productColor ? COLOR_VARS[productColor.toLowerCase()] : undefined;

  const debouncedOnChangeQuantity = useCallback(
    debounce((value: number) => {
      if (value >= minQuantity && value <= maxQuantity) {
        onChangeQuantity(lineItemId, value);
      }
    }, 500),
    [lineItemId, onChangeQuantity]
  );

  const handleInputChange = (inputValue: number): void => {
    let value = inputValue;
    if (value < minQuantity) value = minQuantity;
    else if (value > maxQuantity) value = maxQuantity;
    setQuantityProduct(value);
    debouncedOnChangeQuantity(value);
  };

  return (
    <div
      className={cn(
        'relative flex min-h-40 flex-col justify-start border-b border-gray py-4 sm:flex-row sm:justify-between sm:pr-9',
        className
      )}
    >
      <div className="relative flex items-center">
        {isDiscount && <span className="badge badge_discount absolute left-2 top-0 z-1">Sale</span>}
        {isPromo && <span className="badge badge_promo absolute left-2 top-0 z-1">Promo</span>}
        <div className="relative mr-6 w-[120px] overflow-hidden bg-component shadow-[0_2px_10px_0_rgba(11,10,10,0.08)]">
          <img className="w-full object-cover" src={image || holder} alt={productName} />
        </div>
        <div className="flex-1">
          {productName && <h4 className="text-overflow m-0 mb-2.5 font-bold text-content">{productName}</h4>}
          <div className="mb-2.5 flex items-center gap-1.5">
            {swatch && (
              <span className="inline-block h-5 w-5 rounded-full border border-gray" style={{ background: swatch }} />
            )}
            {productSize && (
              <span className="inline-block min-w-10 rounded-[10px] border border-gray px-2 py-1 text-center text-sm font-semibold leading-none text-primary">
                {productSize}
              </span>
            )}
          </div>
          {priceComponent && <div className="flex items-center gap-2.5 sm:ml-auto">{priceComponent}</div>}
        </div>
      </div>
      <div className="mt-4 flex items-center sm:mt-0 sm:ml-auto sm:w-[35%]">
        <NumberInput
          className="px-4"
          value={quantityProduct}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
          label="Quantity:"
        />
        <div className="px-4 text-2xl font-medium">
          <Price currency={currency}>{totalPriceValue}</Price>
        </div>
      </div>
      <button
        type="button"
        onClick={(): void => onDelete(lineItemId)}
        aria-label="remove item"
        className="flex justify-end p-0 sm:absolute sm:right-0 sm:top-4 sm:justify-center"
      >
        <Icon name={IconName.DELETE} width={30} height={30} color="var(--state-error)" className="icon" />
      </button>
    </div>
  );
};

export default CardMini;
