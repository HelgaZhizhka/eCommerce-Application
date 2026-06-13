import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, MenuItem } from '@mui/material';

import { profileAddressSchema, ProfileAddressValues } from '../../schemas/forms';
import { countries } from '../../schemas/countries';
import { RHFTextField, RHFCheckbox } from '../baseComponents/RHFTextField';
import styles from './ProfileAddress.module.scss';

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
    <Box sx={{ p: '40px 0', borderBottom: '3px solid grey' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{initialValues.name} address:</h3>
        <Button
          onClick={(): void => onSaveChange({ ...initialValues, action: 'removeAddress' })}
          sx={{ fontSize: '20px' }}
        >
          Delete address
        </Button>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          <RHFCheckbox control={control} name="checkBox" label="Use default" />
          <Button type="submit" disabled={!formState.isValid} sx={{ fontSize: '20px' }}>
            Change address
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileAddress;
