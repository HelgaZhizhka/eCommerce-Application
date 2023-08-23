import * as React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const CustomChip = styled(Chip)({
  borderRadius: '16px',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '1.2',
  border: '1px solid grey',
});

const FilterChip: React.FC = () => {
  const [activeChips, setActiveChips] = React.useState<string[]>([]);

  const handleChipClick = (label: string): void => {
    if (activeChips.includes(label)) {
      setActiveChips(activeChips.filter((chip) => chip !== label));
    } else {
      setActiveChips([...activeChips, label]);
    }
  };

  return (
    <>
      <h3>Size</h3>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <CustomChip
          label="XS"
          color="primary"
          variant={activeChips.includes('XS') ? 'filled' : 'outlined'}
          onClick={(): void => handleChipClick('XS')}
        />
        <CustomChip
          label="S"
          color="primary"
          variant={activeChips.includes('S') ? 'filled' : 'outlined'}
          onClick={(): void => handleChipClick('S')}
        />
        <CustomChip
          label="M"
          color="primary"
          variant={activeChips.includes('M') ? 'filled' : 'outlined'}
          onClick={(): void => handleChipClick('M')}
        />
        <CustomChip
          label="L"
          color="primary"
          variant={activeChips.includes('L') ? 'filled' : 'outlined'}
          onClick={(): void => handleChipClick('L')}
        />
        <CustomChip
          label="XL"
          color="primary"
          variant={activeChips.includes('XL') ? 'filled' : 'outlined'}
          onClick={(): void => handleChipClick('XL')}
        />
        <CustomChip
          label="One size"
          color="primary"
          variant={activeChips.includes('OneSize') ? 'filled' : 'outlined'}
          onClick={(): void => handleChipClick('OneSize')}
        />
      </Box>
    </>
  );
};

export default FilterChip;
