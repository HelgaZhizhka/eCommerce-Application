import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

import { productStore } from '../../../stores';

function valueText(value: number): string {
  return `${value}`;
}

type Props = {
  className?: string;
  onChangePrice?: () => void;
};

const FilterPrice: React.FC<Props> = ({ onChangePrice }) => {
  const { updateFilterPrice, filterPrice } = productStore;

  const [value, setValue] = useState<number[]>(filterPrice as number[]);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (!active) {
      setActive(true);
      return;
    }

    setValue(filterPrice as number[]);
  }, [filterPrice, active]);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
    updateFilterPrice(newValue as number[]);
  };

  const handleChangeCommit = (): void => {
    if (onChangePrice) {
      onChangePrice();
    }
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
          onChangeCommitted={handleChangeCommit}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          min={5}
          max={100}
        />
      </Box>
    </>
  );
};

export default observer(FilterPrice);
