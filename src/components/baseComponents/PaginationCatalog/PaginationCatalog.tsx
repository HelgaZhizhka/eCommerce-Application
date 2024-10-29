import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

type Props = {
  handleChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
};

const CustomPagination: React.FC<Props> = ({ handleChange, totalPages, currentPage }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    handleChange(page);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px' }}>
      <Pagination onChange={handlePageChange} count={totalPages} page={currentPage} color="primary" size="large" />
    </Box>
  );
};
export default CustomPagination;
