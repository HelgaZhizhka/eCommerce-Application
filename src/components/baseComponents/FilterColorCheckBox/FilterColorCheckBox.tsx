import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  radioButton?: boolean;
  className?: string;
  colorAtr?: string;
};

enum ColorOptions {
  White = 'var(--filter-white)',
  Red = 'var(--filter-red)',
  Orange = 'var(--filter-orange)',
  Green = 'var(--filter-green)',
  Blue = 'var(--filter-blue)',
  Black = 'var(--filter-black)',
  Multicolor = 'multicolor',
}

const colorOptionValues = Object.values(ColorOptions);
const colorNames = Object.keys(ColorOptions);

const FilterColorCheckBox: React.FC<Props> = ({ radioButton, colorAtr }) => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    const sizeFilter = { [colorAtr as string]: values };
    console.log(sizeFilter);
  }, [colorAtr, values]);

  const toggleOptions = (color: string): void => {
    if (values.includes(color)) {
      setValues((val) => val.filter((c) => c !== color));
    } else if (radioButton) {
      setValues([color]);
    } else {
      setValues((val) => [...val, color]);
    }
  };

  return (
    <>
      <h3>Color</h3>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {colorOptionValues.map((color, index) => (
          <Button
            key={index}
            variant={values.includes(colorNames[index]) ? 'contained' : 'outlined'}
            onClick={(): void => toggleOptions(colorNames[index])}
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
              color: color === 'var(--filter-black)' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: color,
              },
              '&:active': {
                backgroundColor: color,
              },
              backgroundImage:
                color === 'multicolor'
                  ? 'linear-gradient(45deg, #D80B0B, #FF8009, #FFDD00, #5CCD3E, #6DC7F7, #0C5ED9, #2723FC)'
                  : 'none',
              border: '1px solid grey',
            }}
          >
            {values.includes(colorNames[index]) && <CheckIcon />}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default FilterColorCheckBox;
