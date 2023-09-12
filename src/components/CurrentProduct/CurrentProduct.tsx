import React, { useState } from 'react';
import { ProductVariant } from '@commercetools/platform-sdk';
import { observer } from 'mobx-react-lite';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { cartStore, productStore } from '../../stores';
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

function extractSizesWithVariantId(variants: ProductVariant[]): SizeWithVariantId[] {
  const sizesMap: Map<string, number> = new Map();

  variants.forEach((variant) => {
    if (variant.attributes) {
      const sizeAttribute = variant.attributes.find((attr) => attr.name === 'size-clothes');
      if (sizeAttribute) {
        sizesMap.set(sizeAttribute.value.label, variant.id);
      }
    }
  });

  return Array.from(sizesMap.entries()).map(([size, variantId]) => ({ size, variantId }));
}

const CurrentProduct: React.FC<Props> = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { currentProduct, isProductLoading } = productStore;

  const [open, setOpen] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [quantity, setQuantity] = useState<number>(1);

  const [selectedVariant, setSelectedVariant] = useState<SizeWithVariantId | null>(null);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

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
    variantsProduct = extractSizesWithVariantId(currentProduct.variants);
  }

  const { addToCart } = cartStore;

  const isInCart = cartStore.isProductInCart(productId);

  const priceValue = price ? (+price / 100).toFixed(2) : undefined;
  const discountPriceValue = priceDiscount ? (+priceDiscount / 100).toFixed(2) : undefined;

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

  const handleInputChange = (value: number): void => {
    setQuantity(value);
  };

  const handleSizeChange = (value: SizeWithVariantId): void => {
    setSelectedVariant({ size: value.size, variantId: value.variantId });
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
                  {!isInCart ? (
                    <>
                      {variantsProduct.length > 0 && (
                        <SelectSize options={variantsProduct} onChange={handleSizeChange} />
                      )}
                      <NumberInput value={quantity} onChange={handleInputChange} min={1} label="Quantity:" />
                      <Button
                        size="large"
                        sx={{ minWidth: '300px', height: '60px', fontSize: '1.25rem' }}
                        variant="contained"
                        color="primary"
                        onClick={(): Promise<void> => addToCart(productId, quantity, selectedVariant?.variantId)}
                      >
                        Add to cart
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="large"
                      sx={{ minWidth: '300px', height: '60px', fontSize: '1.25rem' }}
                      variant="contained"
                      color="primary"
                    >
                      Remove from cart
                    </Button>
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
                  {!isInCart ? (
                    <>
                      {variantsProduct.length > 0 && (
                        <SelectSize options={variantsProduct} onChange={handleSizeChange} />
                      )}
                      <NumberInput value={1} onChange={handleInputChange} min={0} label="Quantity:" />
                      <Button
                        size="large"
                        sx={{ minWidth: '300px', height: '60px', fontSize: '1.25rem' }}
                        variant="contained"
                        color="primary"
                        onClick={(): Promise<void> => addToCart(productId, quantity, selectedVariant?.variantId)}
                      >
                        Add to cart
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="large"
                      sx={{ minWidth: '300px', height: '60px', fontSize: '1.25rem' }}
                      variant="contained"
                      color="primary"
                    >
                      Remove from cart
                    </Button>
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
