import { Box } from '@mui/material';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterNestedList } from '../baseComponents/FilterNestedList';

const Filter: React.FC = () => {
  console.log('1');
  return (
    <Box sx={{ maxWidth: 350, padding: 1, bgcolor: 'var(--component-bg)' }}>
      <FilterNestedList />
      <FilterChip />
      <FilterColorCheckBox />
    </Box>
  );
};

export default Filter;
