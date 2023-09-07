import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { productStore } from '../../../stores';

const CustomPagination: React.FC = () => {
  const { setCurrentPage, currentPage } = productStore;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px' }}>
      <Pagination onChange={handlePageChange} count={10} color="primary" size="large" />
    </Box>
  );
};
export default observer(CustomPagination);
