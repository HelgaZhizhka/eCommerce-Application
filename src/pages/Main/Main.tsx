import { useState, useEffect } from 'react';

import { useAuthStore } from '../../stores/authStore';
import { RegistrationSuccessful } from '../../components/RegistrationSuccessful';
import { HeroCarousel } from '../../components/HeroCarousel';
import { Features } from '../../components/Features';
import { Categories } from '../../components/Categories';
import { GiftsAndPromoCodes } from '../../components/GiftsAndPromoCodes';
import { PageContainer } from '../../components/baseComponents/PageContainer';

const sectionClass = 'pt-[30px] pb-[50px]';
const titleClass = 'mt-0 mb-[45px] text-center text-[2rem] font-semibold [&_span]:whitespace-nowrap';

const Main: React.FC = () => {
  const isRegistration = useAuthStore((state) => state.isRegistration);
  const resetRegistration = useAuthStore((state) => state.resetRegistration);
  const [showSuccessful, setShowSuccessful] = useState(false);

  useEffect((): (() => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isRegistration) {
      setShowSuccessful(true);

      timeoutId = setTimeout(() => {
        setShowSuccessful(false);
        resetRegistration();
      }, 3000);
    }

    return (): void => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRegistration, resetRegistration]);

  return (
    <>
      {showSuccessful && <RegistrationSuccessful />}
      {!showSuccessful && (
        <>
          <HeroCarousel />
          <PageContainer>
            <section className={sectionClass}>
              <h2 className={titleClass}>
                Shopping easy with <span>YES CODE!</span>
              </h2>
              <Features />
            </section>
          </PageContainer>
          <PageContainer>
            <section className={sectionClass}>
              <h2 className={titleClass}>Gifts and promo codes</h2>
              <GiftsAndPromoCodes />
            </section>
          </PageContainer>
          <PageContainer>
            <section className={sectionClass}>
              <h2 className={titleClass}> Shop by category</h2>
              <Categories
                className="flex flex-wrap justify-center gap-6"
                size={'l'}
                theme={'dark'}
                variant={'rounded'}
              />
            </section>
          </PageContainer>
        </>
      )}
    </>
  );
};

export default Main;
