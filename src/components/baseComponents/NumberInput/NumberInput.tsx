import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';

import styles from './NumberInput.module.scss';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
};

const NumberInput: React.FC<Props> = ({ value, onChange, min, max, label, className }) => {
  const [localValue, setLocalValue] = useState(value?.toString() || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalValue(event.target.value);

    if (onChange) {
      onChange(parseInt(event.target.value, 10));
    }
  };

  return (
    <TextField
      label={label}
      sx={{ minWidth: '120px' }}
      type="number"
      value={localValue}
      onChange={handleChange}
      variant="outlined"
      className={classNames(styles.root, className)}
      InputProps={{
        inputProps: {
          min,
          max,
        },
      }}
    />
  );
};

export default NumberInput;
