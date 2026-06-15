import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { loginSchema, LoginValues } from '../../schemas/forms';
import { emailRules, passwordRules } from '../../schemas/rules';
import ShowValidate from '../ShowValidate/ShowValidate';
import { RHFTextField } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';
import { useAuthStore } from '../../stores/authStore';
import styles from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { control, handleSubmit, watch, formState } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = (values: LoginValues): void => {
    login(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <RHFTextField
          control={control}
          name="email"
          label="Email"
          onFocus={(): void => setTouched((t) => ({ ...t, email: true }))}
        />
        {touched.email && <ShowValidate value={email} rules={emailRules} />}
      </div>

      <div className={styles.inputContainer}>
        <RHFTextField
          control={control}
          name="password"
          label="Password"
          password
          onFocus={(): void => setTouched((t) => ({ ...t, password: true }))}
        />
        {touched.password && <ShowValidate value={password} rules={passwordRules} />}
      </div>

      <div className={styles.btnLogin}>
        <Button disabled={!formState.isValid} variant="contained" fullWidth type="submit">
          Sign in
        </Button>
      </div>

      <div className={styles.lineContainer}>
        <div className={styles.line}></div>
        <div className={styles.text}>or</div>
      </div>

      <Link to="/registration">
        <Button variant="outlined" fullWidth>
          Sign up
        </Button>
      </Link>
    </form>
  );
};

export default LoginForm;
