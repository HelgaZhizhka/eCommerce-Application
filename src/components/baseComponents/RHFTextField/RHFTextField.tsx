import { useId, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '../../../shared/lib/cn';

// react-hook-form text input (underline style, mirrors the old MUI "standard"
// variant). `password` adds the show/hide toggle. The helper line keeps a fixed
// height so validation messages don't shift layout.
type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  password?: boolean;
  type?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  label,
  password = false,
  type = 'text',
  className,
  placeholder,
  autoComplete,
  onFocus,
}: Props<T>): React.ReactElement => {
  const [show, setShow] = useState(false);
  const id = useId();
  const errorId = useId();
  const inputType = password ? (show ? 'text' : 'password') : type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn('w-full', className)}>
          {label && (
            <label htmlFor={id} className="mb-1 block text-sm text-gray">
              {label}
            </label>
          )}
          <div className="relative">
            <input
              {...field}
              id={id}
              type={inputType}
              placeholder={placeholder}
              autoComplete={autoComplete}
              onFocus={onFocus}
              value={field.value ?? ''}
              aria-label={label ? undefined : placeholder}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? errorId : undefined}
              className={cn(
                'w-full border-b bg-transparent py-1 pr-9 outline-none transition-colors',
                fieldState.error ? 'border-red focus:border-red' : 'border-gray focus:border-primary'
              )}
            />
            {password && (
              <button
                type="button"
                aria-label="toggle password visibility"
                onClick={(): void => setShow((prev) => !prev)}
                className="absolute top-1/2 right-1 -translate-y-1/2 text-gray"
              >
                {show ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>
          <p id={errorId} className="mt-1 min-h-5 text-xs text-red">
            {fieldState.error?.message ?? ' '}
          </p>
        </div>
      )}
    />
  );
};

export default RHFTextField;
