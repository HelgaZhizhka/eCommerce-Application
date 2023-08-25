import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css/bundle';

import styles from './ProductCarousel.module.scss';
import tShirt from '../Card/images/TShirt.png';

const images = [tShirt, tShirt, tShirt, tShirt, tShirt, tShirt];

type Props = {
  isZoom?: boolean;
  openModal?: () => void;
};

const ProductCarousel: React.FC<Props> = ({ openModal, isZoom }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperParamsFirst: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
    centeredSlides: true,
    slidesPerView: 1,
    thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
    modules: [FreeMode, Navigation, Thumbs],
    slideToClickedSlide: true,
  };

  const swiperParamsSecond: SwiperOptions = {
    spaceBetween: 60,
    slidesPerView: 4,
    grabCursor: true,
    slideToClickedSlide: true,
    modules: [FreeMode, Navigation, Thumbs],
    watchSlidesProgress: true,
  };
  return (
    <div className={styles.root}>
      <Swiper className={styles.rootFirstSwiper} {...swiperParamsFirst}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={`${styles.wrapImg} ${isZoom ? styles.zoom : styles.grab}`} onClick={openModal}>
              <img className={styles.img} src={img} alt="t-Shirt" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} className={styles.rootSecondSwiper} {...swiperParamsSecond}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.wrapImgSecond}>
              <img className={styles.img} src={img} alt="t-Shirt" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
