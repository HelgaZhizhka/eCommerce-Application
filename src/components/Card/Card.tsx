import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@commercetools/platform-sdk';
import { ProductVariant } from '@commercetools/platform-sdk';

import { RoutePaths } from '../../routes/routes.enum';
import { useCartActions } from '../../queries/cart';
import { extractSizesWithVariantId, getPriceValue, getSku } from '../../stores/productHelpers';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { Price } from '../baseComponents/Price';
import { SizeWithVariantId } from '../baseComponents/SelectSize/SelectSize.types';
import { SelectSize } from '../baseComponents/SelectSize';
import { cn } from '../../shared/lib/cn';

import holder from './images/holder.png';

type Props = {
  categoryId: string;
  productKey: string;
  productId: string;
  productName: string;
  description: string;
  price: number;
  currency: string;
  images: Image[];
  priceDiscount?: number;
  subcategoryId?: string | null;
  isDiscount?: boolean;
  isInCart?: boolean;
  variants?: ProductVariant[];
  className?: string;
};

const Card: React.FC<Props> = ({
  productKey,
  productId,
  categoryId,
  subcategoryId,
  productName,
  description,
  price,
  priceDiscount,
  currency,
  images,
  isDiscount = false,
  variants,
  className,
}) => {
  const { addToCart, isProductInCart } = useCartActions();

  const generateProductPath = (catId: string, subCatId: string | null | undefined, prodKey: string): string => {
    let path = RoutePaths.PRODUCT.replace(':categoryId', catId).replace(':productId', prodKey);
    if (subCatId) {
      path = path.replace(':subcategoryId?', subCatId);
    } else {
      path = path.replace(':subcategoryId?/', '');
    }
    return path;
  };

  const [selectedVariant, setSelectedVariant] = useState<SizeWithVariantId | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    let initialSku;

    if (variants && variants.length > 0 && variants.length < 2) {
      initialSku = getSku(variants, variants[0].id);
    }

    if (initialSku) {
      setIsInCart(isProductInCart(initialSku));
    }
  }, []);

  let variantsProduct: SizeWithVariantId[] = [];

  if (variants && variants.length > 0) {
    variantsProduct = extractSizesWithVariantId(variants);
  }

  const priceValue = getPriceValue(price);
  const discountPriceValue = priceDiscount ? getPriceValue(priceDiscount) : 0;

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

  const handleAddToCart = async (): Promise<void> => {
    let sku;
    let variantId;

    if (variants && variants.length > 0) {
      if (!selectedVariant && variants.length > 1) {
        setSizeError('Please select a size before adding to cart.');
        return;
      }

      if (selectedVariant) {
        sku = getSku(variants, selectedVariant.variantId);
        variantId = selectedVariant.variantId;
      } else {
        sku = variants[0].sku;
        variantId = variants[0].id;
      }
    }

    if (!sku) return;

    await addToCart(sku, productId, 1, variantId);
    setIsInCart(isProductInCart(sku));
  };

  const handleSizeChange = (value: SizeWithVariantId): void => {
    setSelectedVariant({ size: value.size, variantId: value.variantId });
    setSizeError(null);

    const sku = getSku(variants, value.variantId);
    if (sku) {
      setIsInCart(isProductInCart(sku));
    }
  };

  const productPath = generateProductPath(categoryId, subcategoryId, productKey);

  return (
    <div className={cn('group relative flex h-full w-40 flex-col', className)}>
      {isDiscount && <span className="badge badge_discount absolute left-2 top-0 z-1">Sale</span>}
      <div className="relative overflow-hidden rounded-sm bg-component pb-[140%] shadow-[0_2px_10px_0_rgba(11,10,10,0.08)]">
        <Link to={productPath}>
          <img
            className="absolute inset-0 m-auto w-[85%] transition-[transform,filter] duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(151,153,153,0.8)]"
            src={image || holder}
            alt={productName}
          />
        </Link>
        <button
          type="button"
          className={cn(
            'absolute bottom-0 right-0 z-10 block h-8 w-8 rounded-sm bg-primary px-1.5 py-0.5 text-light-white transition-colors group-hover:bg-orange-light',
            isInCart && 'pointer-events-none opacity-50'
          )}
          disabled={isInCart}
          onClick={handleAddToCart}
        >
          <Icon name={IconName.CART} width={20} height={20} color="inherit" className="icon mr-1" />
        </button>
      </div>
      <div className="py-2">
        <Link to={productPath}>
          {productName && <h4 className="text-overflow m-0 font-bold text-content">{productName}</h4>}
          {description && description !== 'undefined' && (
            <p className="text-overflow m-0 text-xs text-gray" dangerouslySetInnerHTML={{ __html: description }}></p>
          )}
        </Link>
      </div>
      <div className="relative mt-auto flex items-center justify-between gap-1.5">
        {isInCart && (
          <span className="absolute bottom-full right-0 z-10 rounded border border-red bg-light-white px-1.5 py-0.5 text-red">
            Already in the cart.
          </span>
        )}
        <div>{priceComponent}</div>
        {variantsProduct.length > 0 && (
          <>
            {sizeError && (
              <span className="absolute bottom-full right-0 z-10 rounded border border-red bg-light-white px-1.5 py-0.5 text-red">
                {sizeError}
              </span>
            )}
            <SelectSize value={selectedVariant} options={variantsProduct} variant="small" onChange={handleSizeChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
