import { Box, Popover, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { SortingList } from '../baseComponents/SortingList';
import { SortOption } from '../baseComponents/SortingList/SortList.enum';

type Props = {
  anchorElSort: null | HTMLElement;
  handleCloseSort: () => void;
  value: SortOption;
  onSelect: (sort: SortOption) => void;
};

const SortMobile: React.FC<Props> = ({ anchorElSort, handleCloseSort, value, onSelect }) => {
  const open = Boolean(anchorElSort);

  const handleMenuItemClick = (): void => {
    handleCloseSort();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorElSort}
      onClose={handleCloseSort}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{ padding: '16px', position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={handleCloseSort}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#888',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ mt: '30px' }}>
          <SortingList value={value} onSelect={onSelect} handleMenuItemClick={handleMenuItemClick} />
        </Box>
      </div>
    </Popover>
  );
};

export default SortMobile;
