import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { Navigation, EffectFade, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';

import styles from './ProductCarousel.module.scss';
import tShirt from '../Card/images/TShirt.png';

const swiperParams: SwiperOptions = {
  modules: [Navigation, EffectFade, Scrollbar],
  spaceBetween: 50,
  slidesPerView: 1,
  // effect: 'fade',
  navigation: true,
  centeredSlides: true,
  scrollbar: { draggable: true },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  // onSlideChange={() => console.log('slide change')}
  // onSwiper={(swiper) => console.log(swiper)}
};

const imgages = [tShirt, tShirt, tShirt, tShirt, tShirt, tShirt];

const ProductCarousel: React.FC = () => (
  <Swiper
    onSlideChange={(): void => console.log('slide change')}
    onSwiper={(swiper): void => console.log(swiper)}
    className={styles.root}
    {...swiperParams}
  >
    {imgages.map((img, index) => (
      <SwiperSlide key={index}>
        <div className={styles.wrapImg}>
          <img className={styles.wrapImg} src={img} alt="t-Shirt" />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default ProductCarousel;
