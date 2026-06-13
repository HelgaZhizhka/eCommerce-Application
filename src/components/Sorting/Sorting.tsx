import React, { useState } from 'react';
import { Button, Menu, Box, styled } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { SortingList } from '../baseComponents/SortingList';
import { SortOption } from '../baseComponents/SortingList/SortList.enum';

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));

type Props = {
  className?: string;
  value: SortOption;
  onSelect: (sort: SortOption) => void;
};

const Sorting: React.FC<Props> = ({ className, value, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (): void => {
    handleClose();
  };

  return (
    <Box className={className}>
      <CustomButton
        sx={{ width: '100%' }}
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
      >
        Sorting by: {value}
        {isMenuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </CustomButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SortingList value={value} onSelect={onSelect} handleMenuItemClick={handleMenuItemClick} />
      </Menu>
    </Box>
  );
};

export default Sorting;
