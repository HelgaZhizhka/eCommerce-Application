import React from 'react';
import classNames from 'classnames';
import TextField from '@mui/material/TextField';

import styles from './NumberInput.module.scss';

type Props = {
  value: number;
  min: number;
  max: number;
  label: string;
  className?: string;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<Props> = ({ value, onChange, min, max, label, className }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(event.target.value, 10);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      variant="outlined"
      className={classNames(styles.root, className)}
      sx={{ minWidth: '80px', p: '10px' }}
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
