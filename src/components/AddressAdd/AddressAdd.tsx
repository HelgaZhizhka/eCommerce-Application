import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

import { addressAddSchema, AddressAddValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox, RHFSelect } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';
import styles from './AddressAdd.module.scss';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};

const countryOptions = countries.map((c) => ({ value: c.code, label: c.label }));
const addressTypeOptions = [
  { value: 'Shipping', label: 'Shipping' },
  { value: 'Billing', label: 'Billing' },
];

const AddressAdd: React.FC<Props> = ({ onSaveChange }) => {
  const { control, handleSubmit, formState } = useForm<AddressAddValues>({
    resolver: zodResolver(addressAddSchema),
    mode: 'onChange',
    defaultValues: { address: '', street: '', city: '', postalCode: '', country: '', checkBox: false },
  });

  const onSubmit = (values: AddressAddValues): void => {
    onSaveChange({ ...values, action: 'addAddress' });
  };

  return (
    <div className="border-b-[3px] border-gray p-[30px]">
      <div className="flex justify-between">
        <h3>Add new address</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <RHFSelect control={control} name="address" label="Address type" options={addressTypeOptions} />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="street" label="Street" />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="city" label="City" />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="postalCode" label="Postal code" />
        </div>
        <div className={styles.inputContainer}>
          <RHFSelect control={control} name="country" label="Country" options={countryOptions} />
        </div>
        <div className="flex justify-between">
          <RHFCheckbox control={control} name="checkBox" label="Use default" className={styles.nowrap} />
          <Button className={`${styles.nowrap} text-xl`} type="submit" disabled={!formState.isValid}>
            Add address
            <Plus size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressAdd;
