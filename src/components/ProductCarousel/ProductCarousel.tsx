import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css/bundle';

import { cn } from '../../shared/lib/cn';
import { VARIANT } from './ProductCarousel.types';

type Props = {
  isZoom?: boolean;
  images: string[];
  thumbs?: string[];
  variant: VARIANT;
  className?: string;
  activeImageIndex?: number;
  openModal?: () => void;
  setActiveImageIndex?: (index: number) => void;
};

const ProductCarousel: React.FC<Props> = ({
  images,
  thumbs,
  isZoom,
  activeImageIndex = 0,
  variant = 'thumbnails',
  className,
  openModal,
  setActiveImageIndex,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const isThumbnails = variant === 'thumbnails';
  const shouldShowNavigation = images.length > 1;

  const swiperParamsFirst: SwiperOptions = {
    spaceBetween: 10,
    navigation: shouldShowNavigation,
    initialSlide: activeImageIndex,
    centeredSlides: true,
    autoHeight: true,
    slidesPerView: 1,
    modules: [FreeMode, Navigation, Thumbs],
    slideToClickedSlide: true,
  };

  const [mainSwiperParams, setMainSwiperParams] = useState(swiperParamsFirst);

  useEffect(() => {
    if (thumbsSwiper) {
      setMainSwiperParams({
        ...swiperParamsFirst,
        thumbs: { swiper: thumbsSwiper },
      });
    }
  }, [thumbsSwiper]);

  const swiperParamsSecond: SwiperOptions = {
    spaceBetween: 60,
    slidesPerView: 3,
    grabCursor: true,
    slideToClickedSlide: true,
    modules: [FreeMode, Navigation, Thumbs],
    watchSlidesProgress: true,
    breakpoints: {
      568: {
        slidesPerView: 4,
      },
    },
  };

  const handleImageClick = (index: number): void => {
    if (setActiveImageIndex) {
      setActiveImageIndex(index);
    }

    if (openModal) {
      openModal();
    }
  };

  return (
    <div className={className}>
      <Swiper className={cn(isThumbnails && 'max-w-[500px]')} {...mainSwiperParams}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={cn(isThumbnails && 'mx-auto w-[300px]', isZoom ? 'cursor-zoom-in' : 'cursor-grab text-center')}
            >
              <img
                className={cn(isThumbnails && 'block h-full w-full object-cover')}
                src={img}
                alt="t-Shirt"
                onClick={(): void => handleImageClick(index)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} className={cn(isThumbnails && 'max-w-[500px]')} {...swiperParamsSecond}>
        {thumbs &&
          thumbs.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="mt-5 w-20">
                <img className={cn(isThumbnails && 'block h-full w-full object-cover')} src={img} alt="t-Shirt" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
