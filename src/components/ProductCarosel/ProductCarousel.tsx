import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css/bundle';

import styles from './ProductCarousel.module.scss';
import tShirt from '../Card/images/TShirt.png';

const imgages = [tShirt, tShirt, tShirt, tShirt, tShirt, tShirt];

const ProductCarousel: React.FC = () => {
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
    spaceBetween: 5,
    slidesPerView: 4,
    slideToClickedSlide: true,
    modules: [FreeMode, Navigation, Thumbs],
    watchSlidesProgress: true,
  };
  return (
    <>
      <Swiper className={styles.root} {...swiperParamsFirst}>
        {imgages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.wrapImg}>
              <img className={styles.wrapImg} src={img} alt="t-Shirt" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} className={styles.rootSecondSwiper} {...swiperParamsSecond}>
        {imgages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.wrapImgSecond}>
              <img className={styles.wrapImg} src={img} alt="t-Shirt" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
