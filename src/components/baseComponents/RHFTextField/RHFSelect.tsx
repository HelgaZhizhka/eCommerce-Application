import { useId } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { cn } from '../../../shared/lib/cn';

type Option = { value: string; label: string };

// react-hook-form <-> Radix Select adapter. Replaces the MUI TextField `select`
// mode; options are passed as data instead of MenuItem children.
type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  label?: string;
  placeholder?: string;
  className?: string;
};

const RHFSelect = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder,
  className,
}: Props<T>): React.ReactElement => {
  const labelId = useId();
  const errorId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn('w-full', className)}>
          {label && (
            <span id={labelId} className="mb-1 block text-sm text-gray">
              {label}
            </span>
          )}
          <Select value={field.value ?? ''} onValueChange={field.onChange}>
            <SelectTrigger
              aria-label={label ? undefined : placeholder}
              aria-labelledby={label ? labelId : undefined}
              aria-invalid={!!fieldState.error}
              aria-describedby={fieldState.error ? errorId : undefined}
              className={cn(fieldState.error && 'border-red')}
            >
              <SelectValue placeholder={placeholder ?? label} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p id={errorId} className="mt-1 min-h-5 text-xs text-red">
            {fieldState.error?.message ?? ' '}
          </p>
        </div>
      )}
    />
  );
};

export default RHFSelect;
