import { Button, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { ColorOptions } from './FilterColor.enum';

type Props = {
  className?: string;
  selected: string[];
  onChange: (updated: string[]) => void;
};

const colorEntries = Object.entries(ColorOptions);

const FilterColorCheckBox: React.FC<Props> = ({ selected, onChange }) => {
  const toggleOptions = (color: string): void => {
    onChange(selected.includes(color) ? selected.filter((c) => c !== color) : [...selected, color]);
  };

  return (
    <>
      <h3>Color</h3>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {colorEntries.map(([colorName, colorValue], index) => (
          <Button
            key={index}
            variant={selected.includes(colorName) ? 'contained' : 'outlined'}
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
            {selected.includes(colorName) && <CheckIcon />}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default FilterColorCheckBox;
