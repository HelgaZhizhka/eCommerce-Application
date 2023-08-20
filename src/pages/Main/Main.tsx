import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite/dist/index';

import { userStore } from '../../stores';
import { RegistrationSuccessful } from '../../components/RegistrationSuccessful';
import { HeroCarousel } from '../../components/HeroCarousel';
import Card from '../../components/Card/Card';

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
          {/* <Card /> */}
        </>
      )}
    </>
  );
};

export default observer(Main);
