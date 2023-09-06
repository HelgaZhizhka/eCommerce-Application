import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

import { productStore } from '../../../stores';

type Props = {
  className?: string;
  onChange?: (type?: string) => void;
};

enum ColorOptions {
  white = 'var(--filter-white)',
  red = 'var(--filter-red)',
  orange = 'var(--filter-orange)',
  green = 'var(--filter-green)',
  blue = 'var(--filter-blue)',
  black = 'var(--filter-black)',
  gray = 'var(--filter-gray)',
  brown = 'var(--filter-brown)',
  purple = 'var(--filter-purple)',
  lightblue = 'var(--filter-lightblue)',
  multicolor = 'multicolor',
}

const colorOptionValues = Object.values(ColorOptions);
const colorNames = Object.keys(ColorOptions);

const FilterColorCheckBox: React.FC<Props> = ({ onChange }) => {
  const { updateFilterColor, filterColors } = productStore;

  const toggleOptions = (color: string): void => {
    let updatedColors: string[];

    if (filterColors.includes(color)) {
      updatedColors = filterColors.filter((c) => c !== color);
    } else {
      updatedColors = [...filterColors, color];
    }

    updateFilterColor(updatedColors);

    if (onChange) {
      onChange();
    }
  };

  return (
    <>
      <h3>Color</h3>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {colorOptionValues.map((color, index) => (
          <Button
            key={index}
            variant={filterColors.includes(colorNames[index]) ? 'contained' : 'outlined'}
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
            {filterColors.includes(colorNames[index]) && <CheckIcon />}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default observer(FilterColorCheckBox);
