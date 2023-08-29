import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { RoutePaths } from '../../routes/routes.enum';
import { Breadcrumbs } from '../../components/baseComponents/Breadcrumbs';
import { NumberInput } from '../../components/baseComponents/NumberInput';
import { FilterChip } from '../../components/baseComponents/FilterChip';
import { FilterColorCheckBox } from '../../components/baseComponents/FilterColorCheckBox';
import { ProductCarousel } from '../../components/ProductCarousel';
import { Modal } from '../../components/Modal';

import tShirt from '../../components/Card/images/TShirt.png';
import tShirtSmall from '../../components/Card/images/TShirtSmall.png';
import tShirtBig from '../../components/Card/images/TShirtBig.png';
import styles from './Product.module.scss';
import { productStore } from '../../stores';

const images = [tShirt, tShirt, tShirt];
const imagesBig = [tShirtBig, tShirtBig];
const thumbs = [tShirtSmall, tShirtSmall, tShirtSmall];

type Params = {
  category: string;
  productId: string;
};

const Product: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const { category, productId } = useParams<Params>();
  useEffect(() => {
    if (!productId) {
      return;
    }
    productStore.fetchProduct(productId);
    // console.log(productId);
  }, [category, productId]);
  // const card = cards.find((item) => item.id === id);
  // const { productName, description } = card || {};
  const [count, setCount] = useState<number>(0);

  return (
    <Container maxWidth="xl">
      <Modal images={imagesBig} isOpen={open} onClose={handleClose} />
      <section className={styles.root}>
        <Breadcrumbs
          items={[
            { text: 'Home', path: RoutePaths.MAIN },
            // { text: `${category}`, path: `${RoutePaths.MAIN}${category}` },
            // { text: `${productName}` },
          ]}
          className={styles.breadcrumb}
        />
        <div className={styles.container}>
          <div className={styles.column}>
            <ProductCarousel
              images={images}
              thumbs={thumbs}
              variant={'thumbnails'}
              openModal={handleClickOpen}
              isZoom
            />
          </div>
          <div className={styles.column}>
            {/* <h2 className={styles.title}>{productName}</h2> */}
            {/* <p className={styles.description}>{description}</p> */}
            <p className={styles.facture}>
              <strong>Material:</strong>
              <span>100% Organic Cotton</span>
            </p>
            {/*   //! Фильтр */}
            <FilterChip radioButton />
            <FilterColorCheckBox radioButton />
            <div className={styles.priceInfo}>
              {/* {priceDiscount ? (
                <>
                  <span className={styles.flex}>
                    <Price className={styles.priceOld} variant="old" currency={currency}>
                      {price}
                    </Price>
                    <strong className={styles.sale}>Sale!</strong>
                  </span>

                  <Price className={styles.priceNew} variant="new" currency={currency}>
                    {priceDiscount}
                  </Price>
                </>
              ) : (
                <Price className={styles.price} currency={currency}>
                  {price}
                </Price>
              )} */}
            </div>
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
      </section>
    </Container>
  );
};

export default Product;
