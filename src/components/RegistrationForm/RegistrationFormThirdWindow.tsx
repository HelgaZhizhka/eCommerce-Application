import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addressesSchema, AddressesValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox, RHFSelect } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';
import { StepProps } from './wizard.types';
import styles from './Registration.module.scss';

const countryOptions = countries.map((c) => ({ value: c.code, label: c.label }));

const RegistrationFormThirdWindow: React.FC<StepProps<AddressesValues>> = ({ defaultValues, onSubmit, onBack }) => {
  const { control, handleSubmit, watch, formState } = useForm<AddressesValues>({
    resolver: zodResolver(addressesSchema),
    mode: 'onChange',
    defaultValues: {
      streetShipping: '',
      cityShipping: '',
      countryShipping: '',
      postalCodeShipping: '',
      streetBilling: '',
      cityBilling: '',
      countryBilling: '',
      postalCodeBilling: '',
      checkedShippingDefault: false,
      checkedAddBillingForm: false,
      checkedBillingDefault: false,
      ...defaultValues,
    },
  });

  const useShippingForBilling = watch('checkedAddBillingForm');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Shipping address:</h3>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="streetShipping" label="Street" />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="cityShipping" label="City" />
      </div>
      <div className={styles.inputContainer}>
        <RHFSelect control={control} name="countryShipping" label="Country" options={countryOptions} />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="postalCodeShipping" label="Postal code" />
      </div>

      <RHFCheckbox control={control} name="checkedShippingDefault" label="Use default" />
      <RHFCheckbox control={control} name="checkedAddBillingForm" label="Use this address for billing" />

      {!useShippingForBilling && (
        <>
          <h3>Billing address:</h3>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="streetBilling" label="Street" />
          </div>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="cityBilling" label="City" />
          </div>
          <div className={styles.inputContainer}>
            <RHFSelect control={control} name="countryBilling" label="Country" options={countryOptions} />
          </div>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="postalCodeBilling" label="Postal code" />
          </div>
          <RHFCheckbox control={control} name="checkedBillingDefault" label="Use default" />
        </>
      )}

      <div className={styles.progressContainer}>
        <div className={styles.progress}></div>
        <div className={styles.progress}></div>
        <div className={`${styles.progress} ${styles.progressActive}`}></div>
      </div>

      <div className={styles.btnLogin}>
        <Button variant="contained" fullWidth type="submit" disabled={!formState.isValid}>
          Sign up
        </Button>
      </div>
      <Button variant="outlined" fullWidth onClick={onBack}>
        Back
      </Button>
    </form>
  );
};

export default RegistrationFormThirdWindow;
