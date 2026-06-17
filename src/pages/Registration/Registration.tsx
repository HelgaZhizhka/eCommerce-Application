import { useState } from 'react';

import {
  RegistrationForm,
  RegistrationFormSecondWindow,
  RegistrationFormThirdWindow,
} from '../../components/RegistrationForm';
import { WizardData } from '../../components/RegistrationForm/wizard.types';
import { AddressesValues, CredentialsValues, PersonalValues } from '../../schemas/forms';
import { useAuthStore } from '../../stores/authStore';
import { Poster } from '../../components/Poster';
import { PageContainer } from '../../components/baseComponents/PageContainer';

// Typed 3-step state machine. The accumulator (incl. the password) is local
// state — it never reaches a global store (plan §4.4). Final submit is a
// single awaited call: no setTimeout(signup, 0) race.
const Registration: React.FC = () => {
  const signup = useAuthStore((state) => state.signup);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<WizardData>({});

  const next = (values: WizardData): void => {
    setData((prev) => ({ ...prev, ...values }));
    setStep((s) => (s < 3 ? ((s + 1) as 2 | 3) : s));
  };

  const back = (): void => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2) : s));

  const handleFinalSubmit = (values: AddressesValues): void => {
    void signup({ ...data, ...values });
  };

  return (
    <PageContainer>
      <div className="pt-10 pb-[140px] md:flex md:justify-between md:gap-[5%] md:pt-[60px]">
        <div className="flex-[2]">
          {step === 1 && <RegistrationForm defaultValues={data as Partial<CredentialsValues>} onSubmit={next} />}
          {step === 2 && (
            <RegistrationFormSecondWindow
              defaultValues={data as Partial<PersonalValues>}
              onSubmit={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <RegistrationFormThirdWindow
              defaultValues={data as Partial<AddressesValues>}
              onSubmit={handleFinalSubmit}
              onBack={back}
            />
          )}
        </div>
        <div className="flex-[1.7] max-md:mt-[30px]">
          <Poster />
        </div>
      </div>
    </PageContainer>
  );
};

export default Registration;
