import { Box } from '@mui/material';

import styles from '../../pages/Catalog/Catalog.module.scss';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';

type Props = {
  className?: string;
};

const Filter: React.FC<Props> = ({ className }) => (
  <Box className={`${className} ${styles.filter}`} sx={{ maxWidth: 350, padding: 2, bgcolor: 'var(--component-bg)' }}>
    <FilterNestedList />
    <FilterChip />
    <FilterColorCheckBox />
    <FilterPrice />
    <FilterReset />
  </Box>
);

export default Filter;
