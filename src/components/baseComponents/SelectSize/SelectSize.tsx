import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { SizeWithVariantId } from './SelectSize.types';
import styles from './SelectSize.module.scss';

type Props = {
  options: SizeWithVariantId[];
  variant?: string;
  className?: string;
  onChange?: (value: SizeWithVariantId) => void;
};

const NumberInput: React.FC<Props> = ({ options, onChange, variant, className }) => {
  const [size, setSize] = useState<SizeWithVariantId | null>(null);

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedOption = options.find((option) => option.size === event.target.value);

    if (selectedOption) {
      setSize(selectedOption);
      if (onChange) {
        onChange(selectedOption);
      }
    }
  };

  return (
    <Box className={className} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Size</InputLabel>
        <Select
          className={variant === 'small' ? styles[variant] : ''}
          value={size?.size || ''}
          label="Size"
          onChange={handleChange}
        >
          {options.map((sizeProduct) => (
            <MenuItem key={sizeProduct.variantId} value={sizeProduct.size}>
              {sizeProduct.size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NumberInput;
