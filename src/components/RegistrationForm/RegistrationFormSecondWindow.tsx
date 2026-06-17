import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { personalSchema, PersonalValues } from '../../schemas/forms';
import { RHFTextField } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';
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
        <RHFTextField control={control} name="firstName" label="First name" />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="lastName" label="Last name" />
      </div>
      <div className={styles.inputContainer}>
        <RHFTextField control={control} name="date" type="date" />
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progress}></div>
        <div className={`${styles.progress} ${styles.progressActive}`}></div>
        <div className={styles.progress}></div>
      </div>

      <div className={styles.btnLogin}>
        <Button variant="contained" fullWidth type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>
      <Button variant="outlined" fullWidth onClick={onBack}>
        Back
      </Button>
      <div className={styles.lineContainer}>
        <div className={styles.line}></div>
        <div className={styles.text}>Or already have an account?</div>
      </div>
      <Link to="/login">
        <Button className="text-[1.2rem]" variant="text" fullWidth>
          Sign in
        </Button>
      </Link>
    </form>
  );
};

export default RegistrationFormSecondWindow;
