import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addressesSchema, AddressesValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox, RHFSelect } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';
import { cn } from '../../shared/lib/cn';
import { StepProps } from './wizard.types';
import {
  btnLoginClass,
  progressActiveClass,
  progressActiveStyle,
  progressClass,
  progressContainerClass,
} from './registrationClasses';

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
      <div>
        <RHFTextField control={control} name="streetShipping" label="Street" />
      </div>
      <div>
        <RHFTextField control={control} name="cityShipping" label="City" />
      </div>
      <div>
        <RHFSelect control={control} name="countryShipping" label="Country" options={countryOptions} />
      </div>
      <div>
        <RHFTextField control={control} name="postalCodeShipping" label="Postal code" />
      </div>

      <RHFCheckbox control={control} name="checkedShippingDefault" label="Use default" />
      <RHFCheckbox control={control} name="checkedAddBillingForm" label="Use this address for billing" />

      {!useShippingForBilling && (
        <>
          <h3>Billing address:</h3>
          <div>
            <RHFTextField control={control} name="streetBilling" label="Street" />
          </div>
          <div>
            <RHFTextField control={control} name="cityBilling" label="City" />
          </div>
          <div>
            <RHFSelect control={control} name="countryBilling" label="Country" options={countryOptions} />
          </div>
          <div>
            <RHFTextField control={control} name="postalCodeBilling" label="Postal code" />
          </div>
          <RHFCheckbox control={control} name="checkedBillingDefault" label="Use default" />
        </>
      )}

      <div className={progressContainerClass}>
        <div className={progressClass}></div>
        <div className={progressClass}></div>
        <div className={cn(progressClass, progressActiveClass)} style={progressActiveStyle}></div>
      </div>

      <div className={btnLoginClass}>
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
