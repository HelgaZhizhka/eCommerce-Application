import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Single MUI <-> react-hook-form adapter replacing the abandoned
// formik-material-ui binding. `password` adds the show/hide toggle.

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  password?: boolean;
} & Omit<TextFieldProps, 'name' | 'error' | 'value' | 'onChange' | 'onBlur' | 'ref'>;

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  label,
  password = false,
  ...textFieldProps
}: Props<T>): React.ReactElement => {
  const [show, setShow] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          label={label}
          type={password ? (show ? 'text' : 'password') : textFieldProps.type}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? ' '}
          InputProps={
            password
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={(): void => setShow((s) => !s)}>
                        {show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : textFieldProps.InputProps
          }
        />
      )}
    />
  );
};

export default RHFTextField;
