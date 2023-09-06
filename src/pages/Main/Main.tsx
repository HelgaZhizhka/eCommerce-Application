import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite/dist/index';
import Container from '@mui/material/Container';

import { userStore } from '../../stores';
import { RegistrationSuccessful } from '../../components/RegistrationSuccessful';
import { HeroCarousel } from '../../components/HeroCarousel';
import { Features } from '../../components/Features';
import { Categories } from '../../components/Categories';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const { isRegistration, resetRegistration } = userStore;
  const [showSuccessful, setShowSuccessful] = useState(false);

  useEffect((): (() => void) => {
    let timeoutId: NodeJS.Timeout;

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
          <Container maxWidth="xl">
            <section className={styles.section}>
              <h2 className={styles.title}>
                Shopping easy with <span>YES CODE!</span>
              </h2>
              <Features />
            </section>
          </Container>
          <Container className={styles.container} maxWidth="xl">
            <section className={styles.section}>
              <h2 className={styles.title}> Shop by category</h2>
              <Categories className={styles.categories} size={'l'} theme={'dark'} variant={'rounded'} />
            </section>
          </Container>
        </>
      )}
    </>
  );
};

export default observer(Main);
