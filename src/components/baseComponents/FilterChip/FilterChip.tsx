import { Chip, Box, styled } from '@mui/material';

import { sizes } from '../../../constants';

const CustomChip = styled(Chip)({
  borderRadius: '16px',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '1.2',
  border: '1px solid grey',
});

type Props = {
  className?: string;
  selected: string[];
  onChange: (updated: string[]) => void;
};

const FilterChip: React.FC<Props> = ({ selected, onChange }) => {
  const handleChipClick = (label: string): void => {
    const isAlreadySelected = selected.includes(label);
    onChange(isAlreadySelected ? selected.filter((size) => size !== label) : [...selected, label]);
  };

  return (
    <>
      <h3>Size</h3>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((size) => (
          <CustomChip
            key={size}
            label={size}
            color="primary"
            variant={selected.includes(size) ? 'filled' : 'outlined'}
            onClick={(): void => handleChipClick(size)}
          />
        ))}
      </Box>
    </>
  );
};

export default FilterChip;
