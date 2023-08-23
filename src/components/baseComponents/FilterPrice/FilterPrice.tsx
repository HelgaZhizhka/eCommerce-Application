import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function valueText(value: number): string {
  return `${value}`;
}

const FilterPrice: React.FC = () => {
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Price</h3>
        <Box
          sx={{
            color: 'var(--basic-gray, #979999)',
            fontSize: '20px',
            letterSpacing: '0.4px',
          }}
        >
          EUR {value[0]} - {value[1]}
        </Box>
      </Box>
      <Box style={{ width: '100%' }}>
        <Slider
          getAriaLabel={(): string => 'Price range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          // min={15} // Минимальное значение
          // max={45} // Максимальное значение
        />
      </Box>
    </>
  );
};

export default FilterPrice;
