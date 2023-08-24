import { Box } from '@mui/material';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';
import styles from '../../pages/Catalog/Catalog.module.scss';

const Filter: React.FC = () => (
  <Box className={styles.filter} sx={{ maxWidth: 350, padding: 2, bgcolor: 'var(--component-bg)' }}>
    <FilterNestedList />
    <FilterChip />
    <FilterColorCheckBox />
    <FilterPrice />
    <FilterReset />
  </Box>
);

export default Filter;
