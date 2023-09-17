import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';
import { ProductVariant } from '@commercetools/platform-sdk';

import { RoutePaths } from '../../routes/routes.enum';
import { cartStore } from '../../stores';
import { extractSizesWithVariantId, getPriceValue, getSku } from '../../stores/productHelpers';
import { IconName } from '../baseComponents/Icon/Icon.enum';
import { Icon } from '../baseComponents/Icon';
import { Price } from '../baseComponents/Price';
import { SizeWithVariantId } from '../baseComponents/SelectSize/SelectSize.types';
import { SelectSize } from '../baseComponents/SelectSize';

import holder from './images/holder.png';
import styles from './Card.module.scss';

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
  productSku?: string;
  isDiscount?: boolean;
  isInCart?: boolean;
  variants?: ProductVariant[];
  className?: string;
};

const Card: React.FC<Props> = ({
  productKey,
  productId,
  productSku,
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
  const classes = classNames(styles.root, {
    [styles.isDiscount]: isDiscount,
    className,
  });

  const { addToCart, isProductInCart } = cartStore;

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

    if (variants && variants.length > 0) {
      initialSku = getSku(variants, variants[0].id);
    }

    if (initialSku) {
      const initialIsInCart = isProductInCart(initialSku);
      setIsInCart(initialIsInCart);
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

    const tempIsInCart = isProductInCart(sku);

    setIsInCart(tempIsInCart);

    // setSelectedVariant(null);
  };

  const handleSizeChange = (value: SizeWithVariantId): void => {
    setSelectedVariant({ size: value.size, variantId: value.variantId });
    setSizeError(null);

    const sku = getSku(variants, value.variantId);

    if (sku) {
      const tempIsInCart = isProductInCart(sku);
      setIsInCart(tempIsInCart);
    }
  };

  return (
    <div className={classes}>
      {isDiscount && <span className={`badge badge_discount ${styles.badge}`}>Sale</span>}
      <div className={styles.cardPoster}>
        <Link to={generateProductPath(categoryId, subcategoryId, productKey)}>
          {image ? (
            <img className={styles.cardImage} src={image} alt={productName} />
          ) : (
            <img className={styles.cardImage} src={holder} alt={productName} />
          )}
        </Link>
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
        <Link to={generateProductPath(categoryId, subcategoryId, productKey)}>
          {productName && <h4 className={`text-overflow ${styles.cardTitle}`}>{productName}</h4>}
          {description && description !== 'undefined' && (
            <p
              className={`text-overflow ${styles.cardDescription}`}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          )}
        </Link>
      </div>
      <div className={styles.cardFooter}>
        {isInCart && <span className={styles.error}>Already in the cart.</span>}
        <div>{priceComponent}</div>
        {variantsProduct.length > 0 && (
          <>
            {sizeError && <span className={styles.error}>{sizeError}</span>}
            <SelectSize
              className={styles.select}
              value={selectedVariant}
              options={variantsProduct}
              variant={'small'}
              onChange={handleSizeChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
