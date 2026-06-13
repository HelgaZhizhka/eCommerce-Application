import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { personalSchema, PersonalValues } from '../../schemas/forms';
import { RHFTextField } from '../baseComponents/RHFTextField';
import { StepProps } from './wizard.types';
import styles from './Registration.module.scss';

const RegistrationFormSecondWindow: React.FC<StepProps<PersonalValues>> = ({ defaultValues, onSubmit, onBack }) => {
  const { control, handleSubmit, formState } = useForm<PersonalValues>({
    resolver: zodResolver(personalSchema),
    mode: 'onChange',
    defaultValues: { firstName: '', lastName: '', date: '', ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="firstName" label="First name" variant="standard" fullWidth />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="lastName" label="Last name" variant="standard" fullWidth />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField
          control={control}
          name="date"
          type="date"
          variant="standard"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progress}></div>
        <div className={`${styles.progress} ${styles.progressActive}`}></div>
        <div className={styles.progress}></div>
      </div>

      <div className={styles.btnLogin}>
        <Button variant="contained" color="primary" fullWidth type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>
      <Button sx={{ fontSize: '1rem' }} variant="outlined" fullWidth color="primary" onClick={onBack}>
        Back
      </Button>
      <div className={styles.lineContainer}>
        <div className={styles.line}></div>
        <div className={styles.text}>Or already have an account?</div>
      </div>
      <Link to="/login">
        <Button sx={{ fontSize: '1.2rem' }} variant="text" fullWidth color="primary">
          Sign in
        </Button>
      </Link>
    </form>
  );
};

export default RegistrationFormSecondWindow;
