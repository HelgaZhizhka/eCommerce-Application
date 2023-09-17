import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { cartStore, productStore } from '../../stores';
import { extractSizesWithVariantId, getPriceValue, getSku } from '../../stores/productHelpers';
import { Price } from '../baseComponents/Price';
import { NumberInput } from '../baseComponents/NumberInput';
import { SelectSize } from '../baseComponents/SelectSize';
import { SizeWithVariantId } from '../baseComponents/SelectSize/SelectSize.types';
import { ProductCarousel } from '../ProductCarousel';
import { Modal } from '../Modal';
import holder from './images/holder.png';
import styles from './CurrentProduct.module.scss';

type Props = {
  className?: string;
};

const CurrentProduct: React.FC<Props> = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { currentProduct, isProductLoading } = productStore;

  const { addToCart, isProductInCart, removeProductFromCart } = cartStore;

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

    if (currentProduct?.variants && currentProduct.variants.length > 0) {
      initialSku = getSku(currentProduct.variants, currentProduct.variants[0].id);
    }

    if (initialSku) {
      const initialIsInCart = isProductInCart(initialSku);
      setIsInCart(initialIsInCart);
    }
  }, [currentProduct]);

  if (isProductLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
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
        <span className={styles.flex}>
          <Price className={styles.priceOld} variant="old" currency={currency}>
            {priceValue}
          </Price>
          <span className={styles.sale}>Sale!</span>
        </span>
        <Price className={styles.priceNew} variant="new" currency={currency}>
          {discountPriceValue}
        </Price>
      </>
    );
  } else if (priceValue) {
    priceComponent = (
      <Price className={styles.priceInfo} currency={currency}>
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
        className={styles.carousel}
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

    await addToCart(sku, productId, 1, variantId);

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
      <div className={styles.root}>
        {!isMobile ? (
          <>
            {carouselComponent}
            <div className={styles.column}>
              <h2 className={styles.title}>{productName}</h2>
              <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>
              <div className={styles.footer}>
                {priceComponent}
                <div className={styles.flex}>
                  {variantsProduct.length > 0 && (
                    <>
                      {sizeError && <p className={styles.error}>{sizeError}</p>}
                      <SelectSize
                        className={styles.select}
                        value={selectedVariant}
                        options={variantsProduct}
                        onChange={handleSizeChange}
                      />
                    </>
                  )}
                  <NumberInput
                    value={quantity}
                    onChange={handleInputChange}
                    min={minQuantity}
                    max={maxQuantity}
                    label="Quantity:"
                  />
                  {!isInCart ? (
                    <Button
                      size="large"
                      sx={{ height: '60px', fontSize: '1.25rem' }}
                      variant="contained"
                      color="primary"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </Button>
                  ) : (
                    <>
                      <span className={styles.error}>Already in the cart.</span>
                      <Button
                        size="large"
                        sx={{ height: '60px', fontSize: '1.25rem' }}
                        variant="contained"
                        color="primary"
                        onClick={handleRemoveFromCart}
                      >
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
            <h2 className={styles.title}>{productName}</h2>
            {carouselComponent}
            <div className={styles.footer}>
              {priceComponent}
              <div className={styles.footer}>
                <div className={styles.flex}>
                  {variantsProduct.length > 0 && (
                    <>
                      {sizeError && <span className={styles.error}>{sizeError}</span>}
                      <SelectSize
                        className={styles.select}
                        value={selectedVariant}
                        options={variantsProduct}
                        onChange={handleSizeChange}
                      />
                    </>
                  )}
                  <NumberInput
                    value={quantity}
                    onChange={handleInputChange}
                    min={minQuantity}
                    max={maxQuantity}
                    label="Quantity:"
                  />
                  {!isInCart ? (
                    <Button
                      size="large"
                      sx={{ minWidth: '300px', height: '60px', fontSize: '1.25rem' }}
                      variant="contained"
                      color="primary"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </Button>
                  ) : (
                    <>
                      <span className={styles.error}>Already in the cart.</span>
                      <Button
                        size="large"
                        sx={{ height: '60px', fontSize: '1.25rem' }}
                        variant="contained"
                        color="primary"
                        onClick={handleRemoveFromCart}
                      >
                        Remove from cart
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>
          </>
        )}
      </div>
    </>
  );
};

export default observer(CurrentProduct);
