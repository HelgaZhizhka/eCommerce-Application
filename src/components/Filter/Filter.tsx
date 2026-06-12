import { Box } from '@mui/material';

import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';
import styles from './Filter.module.scss';

export type FilterControlsProps = {
  isFilterSize: boolean;
  isFilterColor: boolean;
  sizes: string[];
  colors: string[];
  price: number[];
  onSizesChange: (sizes: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onPriceChange: (price: number[]) => void;
  onReset: () => void;
};

type Props = FilterControlsProps & {
  className?: string;
};

const Filter: React.FC<Props> = ({
  className,
  isFilterSize,
  isFilterColor,
  sizes,
  colors,
  price,
  onSizesChange,
  onColorsChange,
  onPriceChange,
  onReset,
}) => (
  <Box className={`${className} ${styles.root}`} sx={{ maxWidth: 350, padding: 2, bgcolor: 'var(--component-bg)' }}>
    <FilterNestedList />
    {isFilterSize && <FilterChip selected={sizes} onChange={onSizesChange} />}
    {isFilterColor && <FilterColorCheckBox selected={colors} onChange={onColorsChange} />}
    <FilterPrice value={price} onChange={onPriceChange} />
    <FilterReset onClick={onReset} />
  </Box>
);

export default Filter;
