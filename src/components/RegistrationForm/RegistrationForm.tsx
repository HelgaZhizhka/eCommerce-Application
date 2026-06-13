import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { credentialsSchema, CredentialsValues } from '../../schemas/forms';
import { emailRules, passwordRules } from '../../schemas/rules';
import { ShowValidate } from '../ShowValidate';
import { RHFTextField } from '../baseComponents/RHFTextField';
import { StepProps } from './wizard.types';
import styles from './Registration.module.scss';

const RegistrationForm: React.FC<StepProps<CredentialsValues>> = ({ defaultValues, onSubmit }) => {
  const [touched, setTouched] = useState({ email: false, password: false });

  const { control, handleSubmit, watch, formState } = useForm<CredentialsValues>({
    resolver: zodResolver(credentialsSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '', checkPassword: '', ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <RHFTextField
          control={control}
          name="email"
          label="Email"
          variant="standard"
          fullWidth
          onFocus={(): void => setTouched((t) => ({ ...t, email: true }))}
        />
        {touched.email && <ShowValidate value={watch('email')} rules={emailRules} />}
      </div>

      <div className={styles.inputContainer}>
        <RHFTextField
          control={control}
          name="password"
          label="Password"
          password
          variant="standard"
          fullWidth
          onFocus={(): void => setTouched((t) => ({ ...t, password: true }))}
        />
        {touched.password && <ShowValidate value={watch('password')} rules={passwordRules} />}
      </div>

      <div className={styles.inputContainer}>
        <RHFTextField
          control={control}
          name="checkPassword"
          label="Repeat password"
          password
          variant="standard"
          fullWidth
        />
      </div>

      <div className={styles.progressContainer}>
        <div className={`${styles.progress} ${styles.progressActive}`}></div>
        <div className={styles.progress}></div>
        <div className={styles.progress}></div>
      </div>

      <div className={styles.btnLogin}>
        <Button variant="contained" color="primary" fullWidth type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>

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

export default RegistrationForm;
