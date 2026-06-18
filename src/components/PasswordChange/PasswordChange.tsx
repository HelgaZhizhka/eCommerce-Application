import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { passwordChangeSchema, PasswordChangeValues } from '../../schemas/forms';
import { RHFTextField } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';

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
    <div className="border-b-[3px] border-gray p-[30px]">
      <div className="flex justify-between">
        <h3>Change password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex">
          <RHFTextField control={control} name="currentPassword" label="Current password" password />
        </div>
        <div className="mb-5 flex">
          <RHFTextField control={control} name="newPassword" label="New password" password />
        </div>
        <div className="mb-5 flex">
          <RHFTextField control={control} name="repeatNewPassword" label="Repeat new password" password />
        </div>

        <div className="flex justify-center">
          <Button variant="contained" type="submit" disabled={!formState.isValid} className="text-xl">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
