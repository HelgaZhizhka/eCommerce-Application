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
// import { ProductCarousel } from '../ProductCarousel';
// import { Modal } from '../Modal';
import styles from './CurrentProduct.module.scss';

type Props = {
  className?: string;
};

const CurrentProduct: React.FC<Props> = () => {
  const { currentProduct, isProductLoading } = productStore;

  // const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(0);

  // const handleClickOpen = (): void => {
  //   setOpen(true);
  // };

  // const handleClose = (): void => {
  //   setOpen(false);
  // };

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

  return (
    <>
      {/* <Modal images={[]} isOpen={open} onClose={handleClose} /> */}
      <div className={styles.root}>
        <div className={styles.column}>
          {/* <ProductCarousel images={[]} thumbs={[]} variant={'thumbnails'} openModal={handleClickOpen} isZoom /> */}
        </div>
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
