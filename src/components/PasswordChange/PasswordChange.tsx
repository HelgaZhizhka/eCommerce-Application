import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';

import { passwordChangeSchema, PasswordChangeValues } from '../../schemas/forms';
import { RHFTextField } from '../baseComponents/RHFTextField';
import styles from './PasswordChange.module.scss';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
};

const PasswordChange: React.FC<Props> = ({ onSaveChange }) => {
  const { control, handleSubmit, formState } = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onChange',
    defaultValues: { currentPassword: '', newPassword: '', repeatNewPassword: '' },
  });

  const onSubmit = (values: PasswordChangeValues): void => {
    onSaveChange({ ...values, action: 'changePassword' });
  };

  return (
    <Box sx={{ p: '30px', borderBottom: '3px solid grey' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Change password</h3>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <RHFTextField
            control={control}
            name="currentPassword"
            label="Current password"
            password
            variant="standard"
            fullWidth
          />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField
            control={control}
            name="newPassword"
            label="New password"
            password
            variant="standard"
            fullWidth
          />
        </div>
        <div className={styles.inputContainer}>
          <RHFTextField
            control={control}
            name="repeatNewPassword"
            label="Repeat new password"
            password
            variant="standard"
            fullWidth
          />
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit" disabled={!formState.isValid} sx={{ fontSize: '20px' }}>
            Save changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PasswordChange;
