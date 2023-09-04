// import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

import { initialPriceRange } from '../../../constants';
import { productStore } from '../../../stores';
import styles from './FilterPrice.module.scss';

const valueText = (value: number): string => `${value}`;

type Props = {
  className?: string;
  onChange?: (type?: string) => void;
};

const FilterPrice: React.FC<Props> = ({ onChange }) => {
  const { updateFilterPrice, filterPrice } = productStore;
  const handleChange = (event: Event, newValue: number | number[]): void => {
    updateFilterPrice(newValue as number[]);
  };

  const handleChangeCommit = (): void => {
    if (onChange) {
      onChange('price');
    }
  };

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
          EUR {filterPrice[0]} - {filterPrice[1]}
        </Box>
      </Box>
      <Box style={{ width: '100%' }}>
        <Slider
          getAriaLabel={(): string => 'Price range'}
          value={filterPrice}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommit}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          min={initialPriceRange.min}
          max={initialPriceRange.max}
        />
      </Box>
    </div>
  );
};

export default observer(FilterPrice);
