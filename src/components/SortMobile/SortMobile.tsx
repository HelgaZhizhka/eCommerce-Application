import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { SortingList } from '../baseComponents/SortingList';

type Props = {
  anchorElSort: null | HTMLElement;
  handleCloseSort: () => void;
};

const SortMobile: React.FC<Props> = ({ anchorElSort, handleCloseSort }) => {
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
          <SortingList handleMenuItemClick={handleMenuItemClick} />
        </Box>
      </div>
    </Popover>
  );
};

export default SortMobile;
