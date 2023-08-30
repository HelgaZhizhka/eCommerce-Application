import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import styles from '../../pages/Catalog/Catalog.module.scss';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';
import { productStore } from '../../stores';

type Props = {
  className?: string;
};

const Filter: React.FC<Props> = ({ className }) => {
  const { isFilterSize, isFilterColor, isColorAttribute, isSizeAttribute } = productStore;

  return (
    <Box className={`${className} ${styles.filter}`} sx={{ maxWidth: 350, padding: 2, bgcolor: 'var(--component-bg)' }}>
      <FilterNestedList />
      {isFilterSize && <FilterChip sizeAtr={isSizeAttribute} />}
      {isFilterColor && <FilterColorCheckBox colorAtr={isColorAttribute} />}
      <FilterPrice />
      <FilterReset />
    </Box>
  );
};

export default observer(Filter);
