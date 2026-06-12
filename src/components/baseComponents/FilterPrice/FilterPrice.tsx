import { useEffect, useState } from 'react';
import { Slider, Box } from '@mui/material';

import { initialPriceRange } from '../../../constants';
import styles from './FilterPrice.module.scss';

const valueText = (value: number): string => `${value}`;

type Props = {
  className?: string;
  value: number[];
  onChange: (committed: number[]) => void;
};

const FilterPrice: React.FC<Props> = ({ value, onChange }) => {
  // local state while dragging; the URL/query updates on commit only
  const [draft, setDraft] = useState<number[]>(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <div className={styles.root}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Price</h3>
        <Box
          sx={{
            color: 'var(--basic-gray, #979999)',
            fontSize: '20px',
            letterSpacing: '0.4px',
          }}
        >
          EUR {draft[0]} - {draft[1]}
        </Box>
      </Box>
      <Box style={{ width: '100%' }}>
        <Slider
          getAriaLabel={(): string => 'Price range'}
          value={draft}
          onChange={(event, newValue): void => setDraft(newValue as number[])}
          onChangeCommitted={(): void => onChange(draft)}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          min={initialPriceRange.min}
          max={initialPriceRange.max}
        />
      </Box>
    </div>
  );
};

export default FilterPrice;
