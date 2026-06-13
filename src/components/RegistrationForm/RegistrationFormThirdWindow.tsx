import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MenuItem } from '@mui/material';

import { addressesSchema, AddressesValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox } from '../baseComponents/RHFTextField';
import { StepProps } from './wizard.types';
import styles from './Registration.module.scss';

const CountryItems = countries.map((c) => (
  <MenuItem key={c.code} value={c.code}>
    {c.label}
  </MenuItem>
));

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
        <RHFTextField control={control} name="streetShipping" label="Street" variant="standard" fullWidth />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="cityShipping" label="City" variant="standard" fullWidth />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="countryShipping" label="Country" select variant="standard" fullWidth>
          {CountryItems}
        </RHFTextField>
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="postalCodeShipping" label="Postal code" variant="standard" fullWidth />
      </div>

      <RHFCheckbox control={control} name="checkedShippingDefault" label="Use default" />
      <RHFCheckbox control={control} name="checkedAddBillingForm" label="Use this address for billing" />

      {!useShippingForBilling && (
        <>
          <h3>Billing address:</h3>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="streetBilling" label="Street" variant="standard" fullWidth />
          </div>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="cityBilling" label="City" variant="standard" fullWidth />
          </div>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="countryBilling" label="Country" select variant="standard" fullWidth>
              {CountryItems}
            </RHFTextField>
          </div>
          <div className={styles.inputContainer}>
            <RHFTextField control={control} name="postalCodeBilling" label="Postal code" variant="standard" fullWidth />
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
        <Button variant="contained" color="primary" fullWidth type="submit" disabled={!formState.isValid}>
          Sign up
        </Button>
      </div>
      <Button sx={{ fontSize: '1rem' }} variant="outlined" fullWidth color="primary" onClick={onBack}>
        Back
      </Button>
    </form>
  );
};

export default RegistrationFormThirdWindow;
