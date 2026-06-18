import React, { useEffect, useState } from 'react';

import { useMediaQuery } from '../../shared/lib/useMediaQuery';
import { Button } from '../baseComponents/Button';
import { useCartActions } from '../../queries/cart';
import { ProductType } from '../../stores/Store.types';
import { extractSizesWithVariantId, getPriceValue, getSku } from '../../stores/productHelpers';
import { Price } from '../baseComponents/Price';
import { NumberInput } from '../baseComponents/NumberInput';
import { SelectSize } from '../baseComponents/SelectSize';
import { SizeWithVariantId } from '../baseComponents/SelectSize/SelectSize.types';
import { ProductCarousel } from '../ProductCarousel';
import { Modal } from '../Modal';
import holder from './images/holder.png';

type Props = {
  className?: string;
  product: ProductType | undefined;
  isLoading: boolean;
};

const rootClass = 'mt-10 md:grid md:grid-cols-[1fr_2fr] md:gap-10 lg:gap-[120px]';
const titleClass = 'mb-5 mt-0 text-[2rem]';
const descriptionClass = 'mb-5 pt-5 max-md:border-t max-md:border-content lg:w-4/5';
const footerClass = 'my-5';
const flexClass = 'relative flex flex-wrap items-center gap-[5px]';
const saleClass = 'text-[30px] font-medium text-danger';
const selectClass = 'min-w-[120px]';
const errorClass = 'absolute left-0 top-full z-10 rounded border border-red bg-light-white px-[5px] py-0.5 text-red';

const CurrentProduct: React.FC<Props> = ({ product: currentProduct, isLoading }) => {
  const isMobile = useMediaQuery('(max-width: 1023.95px)');

  const { addToCart, isProductInCart, removeProductFromCart } = useCartActions();

  const [open, setOpen] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [quantity, setQuantity] = useState<number>(1);

  const [selectedVariant, setSelectedVariant] = useState<SizeWithVariantId | null>(null);

  const [sizeError, setSizeError] = useState<string | null>(null);

  const [isInCart, setIsInCart] = useState<boolean>(false);

  const minQuantity = 1;
  const maxQuantity = 10;

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    let initialSku;

    if (currentProduct?.variants && currentProduct.variants.length > 0 && currentProduct.variants.length < 2) {
      initialSku = getSku(currentProduct.variants, currentProduct.variants[0].id);
    }

    if (initialSku) {
      const initialIsInCart = isProductInCart(initialSku);
      setIsInCart(initialIsInCart);
    }
  }, [currentProduct]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div
          role="status"
          aria-label="Loading"
          className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"
        />
      </div>
    );
  }

  if (!currentProduct) {
    return null;
  }

  const { productId, productName, description, price, priceDiscount, currency, variants } = currentProduct;

  let variantsProduct: SizeWithVariantId[] = [];

  if (variants && variants.length > 0) {
    variantsProduct = extractSizesWithVariantId(variants);
  }

  const priceValue = getPriceValue(price);
  const discountPriceValue = priceDiscount ? getPriceValue(priceDiscount) : 0;

  let priceComponent = null;
  let bigImages: string[] = [];
  let smallImages: string[] = [];
  let averageImages: string[] = [];

  if (priceDiscount && discountPriceValue) {
    priceComponent = (
      <>
        <span className={flexClass}>
          <Price className="text-[24px]" variant="old" currency={currency}>
            {priceValue}
          </Price>
          <span className={saleClass}>Sale!</span>
        </span>
        <Price className="mb-5 text-[2rem]" variant="new" currency={currency}>
          {discountPriceValue}
        </Price>
      </>
    );
  } else if (priceValue) {
    priceComponent = (
      <Price className="mb-5 mt-5" currency={currency}>
        {priceValue}
      </Price>
    );
  }

  if (currentProduct?.images?.length > 0) {
    bigImages = currentProduct.images.filter((image) => image.label === 'big').map((image) => image.url);

    smallImages = currentProduct.images.filter((image) => image.label === 'small').map((image) => image.url);

    averageImages = currentProduct.images.filter((image) => image.label === 'average').map((image) => image.url);
  }

  let carouselComponent;

  if (smallImages.length > 0) {
    carouselComponent = (
      <ProductCarousel
        images={averageImages}
        thumbs={smallImages}
        variant={'thumbnails'}
        setActiveImageIndex={setActiveImageIndex}
        openModal={handleClickOpen}
        isZoom
      />
    );
  } else if (averageImages.length > 0) {
    carouselComponent = <ProductCarousel images={averageImages} variant={'full'} openModal={handleClickOpen} isZoom />;
  } else {
    carouselComponent = <img src={holder} alt="Product placeholder" />;
  }

  const handleInputChange = (inputValue: number): void => {
    let value = inputValue;

    if (value < minQuantity) {
      value = minQuantity;
    } else if (value > maxQuantity) {
      value = maxQuantity;
    }

    setQuantity(value);
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

  const handleAddToCart = async (): Promise<void> => {
    let sku;
    let variantId;

    if (variants && variants.length > 0) {
      if (!selectedVariant && variants.length > 1) {
        setSizeError('Please select a size before adding to cart.');
        return;
      }
    }

    if (selectedVariant) {
      sku = getSku(variants, selectedVariant.variantId);
      variantId = selectedVariant.variantId;
    } else {
      sku = variants[0].sku;
      variantId = variants[0].id;
    }

    if (!sku) return;

    await addToCart(sku, productId, quantity, variantId);

    const tempIsInCart = isProductInCart(sku);

    setIsInCart(tempIsInCart);
  };

  const handleRemoveFromCart = async (): Promise<void> => {
    let sku;

    if (selectedVariant) {
      sku = getSku(variants, selectedVariant.variantId);
    } else {
      sku = variants[0].sku;
    }

    if (sku) {
      await removeProductFromCart(sku);

      const tempIsInCart = isProductInCart(sku);

      setIsInCart(tempIsInCart);
    }
  };

  return (
    <>
      {bigImages?.length > 0 && (
        <Modal images={bigImages} activeImageIndex={activeImageIndex} isOpen={open} onClose={handleClose} />
      )}
      <div className={rootClass}>
        {!isMobile ? (
          <>
            {carouselComponent}
            <div>
              <h2 className={titleClass}>{productName}</h2>
              <p className={descriptionClass} dangerouslySetInnerHTML={{ __html: description }}></p>
              <div className={footerClass}>
                {priceComponent}
                <div className={flexClass}>
                  {variantsProduct.length > 0 && (
                    <>
                      {sizeError && <p className={errorClass}>{sizeError}</p>}
                      <SelectSize
                        className={selectClass}
                        value={selectedVariant}
                        options={variantsProduct}
                        onChange={handleSizeChange}
                      />
                    </>
                  )}
                  {!isInCart ? (
                    <>
                      <NumberInput
                        value={quantity}
                        onChange={handleInputChange}
                        min={minQuantity}
                        max={maxQuantity}
                        label="Quantity:"
                      />
                      <Button className="h-[60px] text-xl" variant="contained" onClick={handleAddToCart}>
                        Add to cart
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className={errorClass}>Already in the cart.</span>
                      <Button className="h-[60px] text-xl" variant="contained" onClick={handleRemoveFromCart}>
                        Remove from cart
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className={titleClass}>{productName}</h2>
            {carouselComponent}
            <div className={footerClass}>
              {priceComponent}
              <div className={footerClass}>
                <div className={flexClass}>
                  {variantsProduct.length > 0 && (
                    <>
                      {sizeError && <span className={errorClass}>{sizeError}</span>}
                      <SelectSize
                        className={selectClass}
                        value={selectedVariant}
                        options={variantsProduct}
                        onChange={handleSizeChange}
                      />
                    </>
                  )}
                  {!isInCart ? (
                    <>
                      <NumberInput
                        value={quantity}
                        onChange={handleInputChange}
                        min={minQuantity}
                        max={maxQuantity}
                        label="Quantity:"
                      />
                      <Button className="h-[60px] min-w-[300px] text-xl" variant="contained" onClick={handleAddToCart}>
                        Add to cart
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className={errorClass}>Already in the cart.</span>
                      <Button className="h-[60px] text-xl" variant="contained" onClick={handleRemoveFromCart}>
                        Remove from cart
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className={descriptionClass} dangerouslySetInnerHTML={{ __html: description }}></p>
          </>
        )}
      </div>
    </>
  );
};

export default CurrentProduct;
