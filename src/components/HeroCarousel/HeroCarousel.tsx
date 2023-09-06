import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { Navigation, Autoplay, EffectFade, Scrollbar } from 'swiper/modules';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import 'swiper/css/bundle';

import { lightTheme } from '../../theme';
import fon1 from './images/slide1/TShirt1.png';
import fon1Mob from './images/slide1/mob/TShirt1.png';
import fon2 from './images/slide1/TShirt2.png';
import fon2Mob from './images/slide1/mob/TShirt2.png';
import label1 from './images/slide1/label.png';
import label1Mob from './images/slide1/mob/label.png';
import fon3 from './images/slide2/mug1.png';
import fon3Mob from './images/slide2/mob/mug1.png';
import fon4 from './images/slide2/mug2.png';
import fon5 from './images/slide2/mug3.png';
import fon5Mob from './images/slide2/mob/mug3.png';
import fon6 from './images/slide2/mug4.png';
import fon6Mob from './images/slide2/mob/mug4.png';
import fon7 from './images/slide2/mug5.png';
import fon8 from './images/slide3/notebook.png';
import fon8Mob from './images/slide3/mob/notebook.png';
import label2 from './images/slide2/label.png';
import label2Mob from './images/slide2/mob/label.png';
import label3 from './images/slide3/label.png';
import label3Mob from './images/slide3/mob/label.png';
import styles from './HeroCarousel.module.scss';

const swiperParams: SwiperOptions = {
  modules: [Navigation, EffectFade, Scrollbar, Autoplay],
  effect: 'fade',
  slidesPerView: 1,
  grabCursor: true,
  navigation: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  scrollbar: { draggable: true },
};

const HeroCarousel: React.FC = () => (
  <Swiper className={styles.root} {...swiperParams}>
    <SwiperSlide className={styles.slide1}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>-15%</h2>
          <p className={styles.description}>Hot discounts on t-shirts this month!</p>
          <Link to="/category/clothes/t-shirts">
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              sx={{ mt: '10px', fontWeight: '700', fontSize: '1.25rem' }}
            >
              Want
            </Button>
          </Link>
        </div>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon1Mob} />
          <img className={styles.fon1} src={fon1} alt="T-Shirt with label" />
        </picture>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon2Mob} />
          <img className={styles.fon2} src={fon2} alt="T-Shirt with label" />
        </picture>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={label1Mob} />
          <img className={styles.label1} src={label1} alt="label for sale" />
        </picture>
      </Container>
    </SwiperSlide>
    <SwiperSlide className={styles.slide2}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>-30%</h2>
            <p className={styles.description}>SuperHot discounts on Mugs this week!</p>
            <Link to="/category/drinkware/mugs">
              <Button
                className={styles.button}
                variant="contained"
                sx={{ color: 'var(--white)', mt: '10px', fontWeight: '700', fontSize: '1.25rem' }}
              >
                Want
              </Button>
            </Link>
          </div>
        </div>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon3Mob} />
          <img className={styles.fon3} src={fon3} alt="Cup with label" />
        </picture>
        <img className={styles.fon4} src={fon4} alt="Cup with label" />
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon5Mob} />
          <img className={styles.fon5} src={fon5} alt="Cup with label" />
        </picture>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon6Mob} />
          <img className={styles.fon6} src={fon6} alt="Cup with label" />
        </picture>
        <img className={styles.fon7} src={fon7} alt="Cup with label" />
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={label2Mob} />
          <img className={styles.label2} src={label2} alt="label for sale" />
        </picture>
      </Container>
    </SwiperSlide>
    <SwiperSlide className={styles.slide3}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>New</h2>
            <p className={styles.description}>Don&apos;t miss the new stickers for your creativity!</p>
            <Link to="/category/office/stickers">
              <Button
                className={styles.button}
                variant="contained"
                sx={{ color: 'var(--white)', mt: '10px', fontWeight: '700', fontSize: '1.25rem' }}
              >
                Want
              </Button>
            </Link>
          </div>
        </div>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={fon8Mob} />
          <img className={styles.fon8} src={fon8} alt="Cup with label" />
        </picture>
        <picture>
          <source media={`(max-width: ${lightTheme.breakpoints.values.md - 1}px)`} srcSet={label3Mob} />
          <img className={styles.label3} src={label3} alt="label for sale" />
        </picture>
      </Container>
    </SwiperSlide>
  </Swiper>
);

export default HeroCarousel;
