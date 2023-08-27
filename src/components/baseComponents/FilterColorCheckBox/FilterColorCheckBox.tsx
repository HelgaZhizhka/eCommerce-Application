import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  radioButton?: boolean;
  className?: string;
};

const FilterColorCheckBox: React.FC<Props> = ({ radioButton }) => {
  const [values, setValues] = useState<number[]>([]);

  const toggleOptions = (index: number): void => {
    if (values.includes(index)) {
      setValues((val) => val.filter((i) => i !== index));
    } else if (radioButton) {
      setValues([]);
      setValues([index]);
    } else {
      setValues((val) => [...val, index]);
    }
  };

  const colorOptions: string[] = [
    'var(--filter-white)',
    'var(--filter-red)',
    'var(--filter-orange)',
    'var(--filter-green)',
    'var(--filter-blue)',
    'var(--filter-black)',
    'multicolor',
  ];

  return (
    <>
      <h3>Color</h3>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {colorOptions.map((color, index) => (
          <Button
            key={index}
            variant={values.includes(index) ? 'contained' : 'outlined'}
            onClick={(): void => toggleOptions(index)}
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              width: '2.3rem',
              height: '2.3rem',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color,
              '& .MuiSvgIcon-root': {
                color: color === 'var(--filter-black)' ? 'white' : 'black',
              },
              backgroundImage:
                color === 'multicolor'
                  ? 'linear-gradient(45deg, #D80B0B, #FF8009, #FFDD00, #5CCD3E, #6DC7F7, #0C5ED9, #2723FC)'
                  : 'none',

              border: '1px solid grey',
            }}
          >
            {values.includes(index) && <CheckIcon />}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default FilterColorCheckBox;
