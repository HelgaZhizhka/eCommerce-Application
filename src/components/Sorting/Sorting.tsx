import React, { useState } from 'react';
import { Button, Menu } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Box, styled } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { SortingList } from '../baseComponents/SortingList';
import { productStore } from '../../stores';

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
}));

type Props = {
  className?: string;
  onChange?: (type?: string) => void;
};

const Sorting: React.FC<Props> = ({ className, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { sortState } = productStore;

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
        Sorting by: {sortState}
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
        <SortingList onChange={onChange} handleMenuItemClick={handleMenuItemClick} />
      </Menu>
    </Box>
  );
};

export default observer(Sorting);
