import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { addressAddSchema, AddressAddValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox } from '../baseComponents/RHFTextField';
import styles from './AddressAdd.module.scss';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};

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
    <Box sx={{ p: '30px', borderBottom: '3px solid grey' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Add new address</h3>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="address" select variant="standard" fullWidth label="Address type">
            <MenuItem value="Shipping">Shipping</MenuItem>
            <MenuItem value="Billing">Billing</MenuItem>
          </RHFTextField>
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="street" label="Street" variant="standard" fullWidth />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="city" label="City" variant="standard" fullWidth />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="postalCode" label="Postal code" variant="standard" fullWidth />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField control={control} name="country" select variant="standard" fullWidth label="Country">
            {countries.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.label}
              </MenuItem>
            ))}
          </RHFTextField>
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <RHFCheckbox control={control} name="checkBox" label="Use default" className={styles.nowrap} />
          <Button className={styles.nowrap} type="submit" disabled={!formState.isValid} sx={{ fontSize: '20px' }}>
            Add address
            <AddIcon />
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddressAdd;
