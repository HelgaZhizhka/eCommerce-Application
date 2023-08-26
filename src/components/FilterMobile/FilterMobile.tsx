import { Box } from '@mui/material';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';

const FilterMobile: React.FC = () => (
  <Box sx={{ maxWidth: '400px' }}>
    <FilterChip />
    <FilterColorCheckBox />
    <FilterPrice />
    <FilterReset mobile />
  </Box>
);

export default FilterMobile;
