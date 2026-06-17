import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Navigation, Autoplay, EffectFade, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';

import { Button } from '../baseComponents/Button';
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
import slide1Bg from './images/slide1/slide1.png';
import slide1BgMob from './images/slide1/mob/slide1.png';
import slide2Bg from './images/slide2/slide2.png';
import slide2BgMob from './images/slide2/mob/slide2.png';
import slide3Bg from './images/slide3/slide3.png';
import slide3BgMob from './images/slide3/mob/slide3.png';
import saleBg from './images/sale.png';
import newBg from './images/slide3/new.png';
import girl from './images/slide1/girl.png';
import girlMob from './images/slide1/mob/girl.png';

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

// Background images are passed as CSS variables (inline style) so the responsive
// mob/desktop swap can stay declarative (Tailwind md: variant on the var name).
const slide1Style = {
  '--s1m': `url(${slide1BgMob})`,
  '--s1d': `url(${slide1Bg})`,
  '--sale': `url(${saleBg})`,
  '--girlm': `url(${girlMob})`,
  '--girld': `url(${girl})`,
} as CSSProperties;
const slide2Style = {
  '--s2m': `url(${slide2BgMob})`,
  '--s2d': `url(${slide2Bg})`,
  '--sale': `url(${saleBg})`,
} as CSSProperties;
const slide3Style = {
  '--s3m': `url(${slide3BgMob})`,
  '--s3d': `url(${slide3Bg})`,
  '--new': `url(${newBg})`,
} as CSSProperties;

const rootClass = 'mb-5 h-[280px] select-none overflow-hidden pb-5 md:h-[420px]';
const slideBg = 'bg-cover bg-center bg-no-repeat';
const containerBase = 'relative mx-auto h-full w-full max-w-[1440px] bg-[length:auto_100%] bg-no-repeat';

const slide1Container = `${containerBase} [background-image:var(--sale)] [background-position:5%_0] lg:[background-position:25%_0] after:absolute after:left-0 after:z-[1] after:h-full after:w-full after:bg-[length:auto_100%] after:bg-no-repeat after:content-[''] after:[background-image:var(--girlm)] after:[background-position:3%_0] md:after:[background-image:var(--girld)] md:after:[background-position:-60%_0] lg:after:[background-position:2%_0]`;
const slide2Container = `${containerBase} [background-image:var(--sale)] [background-position:94%_0] md:[background-position:75%_0]`;
const slide3Container = `${containerBase} flex justify-end [background-image:var(--new)] [background-position:2%_0]`;

const slide1Content =
  'absolute left-1/2 top-[10%] z-10 -translate-x-1/2 rounded-[2px] p-5 text-center font-bold text-white shadow-[0_4px_8px_0px_rgba(0,0,0,0.16)] [background-image:linear-gradient(359deg,#cb0985_0%,#fa811e_100%)] min-[428px]:w-[220px] md:w-[350px] md:px-[35px] md:py-[25px] md:text-2xl';
const sideContent =
  'relative z-[12] flex h-full w-[200px] flex-col text-center font-bold md:w-[470px] md:px-[45px] md:text-2xl';

const descriptionClass = 'm-0 leading-[1.25]';
const buttonSize = 'mt-2.5 text-xl font-bold md:h-[66px] md:w-[180px]';

const HeroCarousel: React.FC = () => (
  <Swiper className={rootClass} {...swiperParams}>
    <SwiperSlide
      className={`${slideBg} [background-image:var(--s1m)] md:[background-image:var(--s1d)]`}
      style={slide1Style}
    >
      <div className={slide1Container}>
        <div className={slide1Content}>
          <h2 className="m-0 text-[56px] leading-none md:text-[94px]">-15%</h2>
          <p className={descriptionClass}>Hot discounts on t-shirts this month!</p>
          <Link to="/category/clothes/t-shirts">
            <Button className={buttonSize} variant="contained">
              Want
            </Button>
          </Link>
        </div>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={fon1Mob} />
          <img
            className="absolute bottom-[-5%] right-0 sm:right-[22%] md:bottom-0 md:right-[12%] lg:right-[22%]"
            src={fon1}
            alt="T-Shirt with label"
          />
        </picture>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={fon2Mob} />
          <img
            className="absolute right-0 top-0 sm:right-[22%] md:right-[18%] lg:right-[26%]"
            src={fon2}
            alt="T-Shirt with label"
          />
        </picture>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={label1Mob} />
          <img
            className="absolute right-[5%] top-[5%] sm:right-[23%] md:right-[15%] md:top-0 lg:right-[23%]"
            src={label1}
            alt="label for sale"
          />
        </picture>
      </div>
    </SwiperSlide>
    <SwiperSlide
      className={`${slideBg} [background-image:var(--s2m)] md:[background-image:var(--s2d)]`}
      style={slide2Style}
    >
      <div className={slide2Container}>
        <div className={`${sideContent} ml-2 text-white md:ml-0`}>
          <div className="my-auto">
            <h2 className="m-0 text-[72px] leading-none md:text-[130px]">-30%</h2>
            <p className={descriptionClass}>SuperHot discounts on Mugs this week!</p>
            <Link to="/category/drinkware/mugs">
              <Button className={`${buttonSize} bg-black text-white hover:bg-dark`} variant="contained">
                Want
              </Button>
            </Link>
          </div>
        </div>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={fon3Mob} />
          <img className="absolute right-[20%] top-0 lg:right-[10%]" src={fon3} alt="Cup with label" />
        </picture>
        <img className="absolute bottom-0 right-[24%] max-md:hidden lg:right-[14%]" src={fon4} alt="Cup with label" />
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={fon5Mob} />
          <img
            className="absolute bottom-0 right-[20%] sm:right-[25%] md:right-[32%] lg:right-[20%]"
            src={fon5}
            alt="Cup with label"
          />
        </picture>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={fon6Mob} />
          <img
            className="absolute right-0 top-[20%] sm:right-[12%] md:right-[-80px] md:top-0 lg:right-[-140px]"
            src={fon6}
            alt="Cup with label"
          />
        </picture>
        <img className="absolute bottom-0 hidden xl:right-[-10%] xl:block" src={fon7} alt="Cup with label" />
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={label2Mob} />
          <img
            className="absolute right-0 top-[10%] sm:right-[10%] md:bottom-0 md:right-[20%] md:top-auto lg:right-[10%]"
            src={label2}
            alt="label for sale"
          />
        </picture>
      </div>
    </SwiperSlide>
    <SwiperSlide
      className={`${slideBg} [background-image:var(--s3m)] md:[background-image:var(--s3d)]`}
      style={slide3Style}
    >
      <div className={slide3Container}>
        <div className={`${sideContent} mr-2 text-blue md:mr-0`}>
          <div className="my-auto">
            <h2 className="m-0 bg-clip-text text-[56px] leading-none text-transparent [-webkit-text-fill-color:transparent] [background-image:linear-gradient(180deg,#3e17ff_0%,rgba(62,23,255,0)_100%)] md:text-[130px]">
              New
            </h2>
            <p className={descriptionClass}>Don&apos;t miss the new stickers for your creativity!</p>
            <Link to="/category/office/stickers">
              <Button className={`${buttonSize} bg-blue text-white hover:bg-blue-hover`} variant="contained">
                Want
              </Button>
            </Link>
          </div>
        </div>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={fon8Mob} />
          <img
            className="absolute left-[-10%] top-0 sm:left-0 md:left-[-28%] lg:left-[-10%]"
            src={fon8}
            alt="Cup with label"
          />
        </picture>
        <picture>
          <source media={`(max-width: 1023px)`} srcSet={label3Mob} />
          <img
            className="absolute left-[10%] top-[10%] md:bottom-0 md:left-[42%] md:top-auto"
            src={label3}
            alt="label for sale"
          />
        </picture>
      </div>
    </SwiperSlide>
  </Swiper>
);

export default HeroCarousel;
