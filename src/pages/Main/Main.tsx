import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite/dist/index';
import { userStore } from '../../stores';
import { RegistrationSuccessful } from '../../components/RegistrationSuccessful';
import { HeroCarousel } from '../../components/HeroCarousel';

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
  }, [isRegistration]);

  return (
    <div>
      {showSuccessful && <RegistrationSuccessful />}
      {!showSuccessful && <HeroCarousel />}
    </div>
  );
};

export default observer(Main);
