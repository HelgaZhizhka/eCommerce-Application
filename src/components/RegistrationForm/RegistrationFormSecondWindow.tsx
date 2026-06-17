import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { personalSchema, PersonalValues } from '../../schemas/forms';
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

const RegistrationFormSecondWindow: React.FC<StepProps<PersonalValues>> = ({ defaultValues, onSubmit, onBack }) => {
  const { control, handleSubmit, formState } = useForm<PersonalValues>({
    resolver: zodResolver(personalSchema),
    mode: 'onChange',
    defaultValues: { firstName: '', lastName: '', date: '', ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFTextField control={control} name="firstName" label="First name" />
      </div>
      <div>
        <RHFTextField control={control} name="lastName" label="Last name" />
      </div>
      <div>
        <RHFTextField control={control} name="date" type="date" />
      </div>

      <div className={progressContainerClass}>
        <div className={progressClass}></div>
        <div className={cn(progressClass, progressActiveClass)} style={progressActiveStyle}></div>
        <div className={progressClass}></div>
      </div>

      <div className={btnLoginClass}>
        <Button variant="contained" fullWidth type="submit" disabled={!formState.isValid}>
          Continue
        </Button>
      </div>
      <Button variant="outlined" fullWidth onClick={onBack}>
        Back
      </Button>
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

export default RegistrationFormSecondWindow;
