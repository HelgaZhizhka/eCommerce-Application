import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from '../../pages/Catalog/Catalog.module.scss';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';

type Props = {
  className?: string;
  isFilterSize: boolean;
  isFilterColor: boolean;
  categoryId: string;
  subcategoryId?: string;
};

const Filter: React.FC<Props> = ({ className, isFilterSize, isFilterColor, categoryId, subcategoryId }) => (
  <Box className={`${className} ${styles.filter}`} sx={{ maxWidth: 350, padding: 2, bgcolor: 'var(--component-bg)' }}>
    <FilterNestedList />
    {isFilterSize && <FilterChip categoryId={categoryId} subcategoryId={subcategoryId} />}
    {isFilterColor && <FilterColorCheckBox categoryId={categoryId} subcategoryId={subcategoryId} />}
    <FilterPrice />
    <FilterReset />
  </Box>
);

export default observer(Filter);
