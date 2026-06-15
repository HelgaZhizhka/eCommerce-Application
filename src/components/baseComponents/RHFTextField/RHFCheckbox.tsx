import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { cn } from '../../../shared/lib/cn';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  className?: string;
};

const RHFCheckbox = <T extends FieldValues>({ name, control, label, className }: Props<T>): React.ReactElement => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <label className={cn('inline-flex cursor-pointer items-center gap-2', className)}>
        <input
          type="checkbox"
          checked={!!field.value}
          onChange={(event): void => field.onChange(event.target.checked)}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          className="h-4 w-4 accent-primary"
        />
        {label}
      </label>
    )}
  />
);

export default RHFCheckbox;
