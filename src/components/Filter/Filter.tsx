import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';
import styles from './Filter.module.scss';

type Props = {
  className?: string;
  isFilterSize: boolean;
  isFilterColor: boolean;
  onReset: () => void;
  onChange?: (type?: string) => void;
  onChangePrice?: () => void;
};

const Filter: React.FC<Props> = ({ className, isFilterSize, isFilterColor, onReset, onChange, onChangePrice }) => (
  <Box className={`${className} ${styles.root}`} sx={{ maxWidth: 350, padding: 2, bgcolor: 'var(--component-bg)' }}>
    <FilterNestedList />
    {isFilterSize && <FilterChip onChange={onChange} />}
    {isFilterColor && <FilterColorCheckBox onChange={onChange} />}
    <FilterPrice onChange={onChange} />
    <FilterReset onClick={onReset} />
  </Box>
);

export default observer(Filter);
