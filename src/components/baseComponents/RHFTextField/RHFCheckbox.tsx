import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

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
      <FormControlLabel
        className={className}
        control={<Checkbox checked={!!field.value} onChange={(e): void => field.onChange(e.target.checked)} />}
        label={label}
      />
    )}
  />
);

export default RHFCheckbox;
