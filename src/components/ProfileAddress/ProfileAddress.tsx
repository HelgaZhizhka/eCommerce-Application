import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { profileAddressSchema, ProfileAddressValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox, RHFSelect } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  initialValues: {
    name: string;
    id: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    checkBox: boolean;
  };
};

const countryOptions = countries.map((c) => ({ value: c.code, label: c.label }));

const ProfileAddress: React.FC<Props> = ({ initialValues, onSaveChange }) => {
  const { control, handleSubmit, formState } = useForm<ProfileAddressValues>({
    resolver: zodResolver(profileAddressSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const onSubmit = (values: ProfileAddressValues): void => {
    onSaveChange({ ...values, action: 'changeAddress' });
  };

  return (
    <div className="border-b-[3px] border-gray py-10">
      <div className="flex justify-between">
        <h3>{initialValues.name} address:</h3>
        <Button className="text-xl" onClick={(): void => onSaveChange({ ...initialValues, action: 'removeAddress' })}>
          Delete address
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex">
          <RHFTextField control={control} name="street" label="Street" />
        </div>
        <div className="mb-5 flex">
          <RHFTextField control={control} name="city" label="City" />
        </div>
        <div className="mb-5 flex">
          <RHFTextField control={control} name="postalCode" label="Postal code" />
        </div>
        <div className="mb-5 flex">
          <RHFSelect control={control} name="country" label="Country" options={countryOptions} />
        </div>
        <div className="flex justify-between">
          <RHFCheckbox control={control} name="checkBox" label="Use default" />
          <Button className="text-xl" type="submit" disabled={!formState.isValid}>
            Change address
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAddress;
