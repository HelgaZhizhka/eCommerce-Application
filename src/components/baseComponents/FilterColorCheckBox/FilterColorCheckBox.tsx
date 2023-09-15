import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

import { productStore } from '../../../stores';
import { ColorOptions } from './FilterColor.enum';

type Props = {
  className?: string;
  onChange?: (type?: string) => void;
};

// const colorOptionValues = Object.values(ColorOptions);
// const colorNames = Object.keys(ColorOptions);
const colorEntries = Object.entries(ColorOptions);

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
        {colorEntries.map(([colorName, colorValue], index) => (
          <Button
            key={index}
            variant={filterColors.includes(colorName) ? 'contained' : 'outlined'}
            onClick={(): void => toggleOptions(colorName)}
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              width: '2.3rem',
              height: '2.3rem',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colorValue,
              color: colorValue === 'var(--filter-black)' ? 'white' : 'black',
              '&:hover': {
                backgroundColor: colorValue,
              },
              '&:active': {
                backgroundColor: colorValue,
              },
              backgroundImage: colorValue === 'multicolor' ? 'var(--multicolor)' : 'none',
              border: '1px solid grey',
            }}
          >
            {filterColors.includes(colorName) && <CheckIcon />}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default observer(FilterColorCheckBox);
