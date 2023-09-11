import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { sizes } from '../../../constants';

type Props = {
  onChange?: (value: string) => void;
  className?: string;
};

const NumberInput: React.FC<Props> = ({ onChange, className }) => {
  const [size, setSize] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setSize(event.target.value);

    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Box className={className} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Size</InputLabel>
        <Select value={size} label="Size" onChange={handleChange}>
          {sizes.map((sizeProduct) => (
            <MenuItem key={sizeProduct} value={sizeProduct}>
              {sizeProduct}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NumberInput;
