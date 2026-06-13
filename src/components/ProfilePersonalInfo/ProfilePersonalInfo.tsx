import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';

import { profilePersonalSchema, ProfilePersonalValues } from '../../schemas/forms';
import { RHFTextField } from '../baseComponents/RHFTextField';

type Props = {
  onSaveChange: (data: Record<string, string | boolean | number>) => void;
  initialValues: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
  };
};

const ProfilePersonalInfo: React.FC<Props> = ({ initialValues, onSaveChange }) => {
  const { control, handleSubmit, formState } = useForm<ProfilePersonalValues>({
    resolver: zodResolver(profilePersonalSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const onSubmit = (values: ProfilePersonalValues): void => {
    onSaveChange({ ...values, action: 'changePersonalData' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField control={control} name="firstName" label="First Name" variant="standard" fullWidth />
      <RHFTextField control={control} name="lastName" label="Last Name" variant="standard" fullWidth />
      <RHFTextField control={control} name="email" label="Email" variant="standard" fullWidth />
      <RHFTextField
        control={control}
        name="dateOfBirth"
        label="Date of birth"
        type="date"
        variant="standard"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button sx={{ fontSize: '20px' }} variant="contained" type="submit" disabled={!formState.isValid}>
        Save
      </Button>
    </form>
  );
};

export default ProfilePersonalInfo;
