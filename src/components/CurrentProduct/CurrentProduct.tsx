import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { productStore } from '../../stores';
import { Price } from '../baseComponents/Price';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { NumberInput } from '../baseComponents/NumberInput';
import { ProductCarousel } from '../ProductCarousel';
import { Modal } from '../Modal';
import holder from './images/holder.png';
import styles from './CurrentProduct.module.scss';

type Props = {
  className?: string;
};

const CurrentProduct: React.FC<Props> = () => {
  const { currentProduct, isProductLoading } = productStore;

  const [open, setOpen] = useState(false);

  const [count, setCount] = useState<number>(0);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const { productName, description, price, priceDiscount, currency } = currentProduct;

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

  return (
    <>
      {bigImages?.length > 0 && (
        <Modal images={bigImages} activeImageIndex={activeImageIndex} isOpen={open} onClose={handleClose} />
      )}
      <div className={styles.root}>
        {carouselComponent}
        <div className={styles.column}>
          <h2 className={styles.title}>{productName}</h2>
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></p>
          <FilterChip radioButton />
          <FilterColorCheckBox radioButton />
          <div className={styles.footer}>
            {priceComponent}
            <div className={styles.flex}>
              <NumberInput
                value={count}
                onChange={(newValue): void => setCount(newValue)}
                min={0}
                max={10}
                label="Quantity:"
              />
              <Button
                size="large"
                sx={{ minWidth: '300px', height: '60px', fontSize: '1.25rem' }}
                variant="contained"
                color="primary"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(CurrentProduct);
