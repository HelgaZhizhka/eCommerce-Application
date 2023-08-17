import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { Navigation, Autoplay, EffectFade, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';

import styles from './HeroCarousel.module.scss';

const swiperParams: SwiperOptions = {
  modules: [Navigation, EffectFade, Scrollbar, Autoplay],
  effect: 'fade',
  slidesPerView: 1,
  navigation: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  scrollbar: { draggable: true },
};

const HeroCarousel: React.FC = (): JSX.Element => (
  <Swiper className={classNames(styles.root)} {...swiperParams}>
    <SwiperSlide className={classNames(styles.slide1)}></SwiperSlide>
    <SwiperSlide className={classNames(styles.slide2)}></SwiperSlide>
    <SwiperSlide className={classNames(styles.slide3)}></SwiperSlide>
  </Swiper>
);

export default HeroCarousel;
