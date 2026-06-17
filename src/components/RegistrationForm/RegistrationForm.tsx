import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { credentialsSchema, CredentialsValues } from '../../schemas/forms';
import { emailRules, passwordRules } from '../../schemas/rules';
import { ShowValidate } from '../ShowValidate';
import { RHFTextField } from '../baseComponents/RHFTextField';
import { Button } from '../baseComponents/Button';
import { cn } from '../../shared/lib/cn';
import { StepProps } from './wizard.types';
import {
  btnLoginClass,
  lineClass,
  lineContainerClass,
  progressActiveClass,
  progressActiveStyle,
  progressClass,
  progressContainerClass,
  textClass,
} from './registrationClasses';

const RegistrationForm: React.FC<StepProps<CredentialsValues>> = ({ defaultValues, onSubmit }) => {
  const [touched, setTouched] = useState({ email: false, password: false });

  const { control, handleSubmit, watch, formState } = useForm<CredentialsValues>({
    resolver: zodResolver(credentialsSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '', checkPassword: '', ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFTextField
          control={control}
          name="email"
          label="Email"
          onFocus={(): void => setTouched((t) => ({ ...t, email: true }))}
        />
        {touched.email && <ShowValidate value={watch('email')} rules={emailRules} />}
      </div>

      <div>
        <RHFTextField
          control={control}
          name="password"
          label="Password"
          password
          onFocus={(): void => setTouched((t) => ({ ...t, password: true }))}
        />
        {touched.password && <ShowValidate value={watch('password')} rules={passwordRules} />}
      </div>

      <div>
        <RHFTextField control={control} name="checkPassword" label="Repeat password" password />
      </div>

      <div className={progressContainerClass}>
        <div className={cn(progressClass, progressActiveClass)} style={progressActiveStyle}></div>
        <div className={progressClass}></div>
        <div className={progressClass}></div>
      </div>

      <div className={btnLoginClass}>
        <Button variant="contained" fullWidth type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>

      <div className={lineContainerClass}>
        <div className={lineClass}></div>
        <div className={textClass}>Or already have an account?</div>
      </div>
      <Link to="/login">
        <Button className="text-[1.2rem]" variant="text" fullWidth>
          Sign in
        </Button>
      </Link>
    </form>
  );
};

export default RegistrationForm;
