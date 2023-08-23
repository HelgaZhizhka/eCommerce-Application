import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { MenuCategories } from '../../MenuCategories';

const FilterNestedList: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (): void => {
    setOpen(!open);
  };

  return (
    <List sx={{ borderBottom: '1px solid black' }} component="nav" aria-labelledby="nested-list">
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText sx={{ fontSize: '59px' }} primary="Category" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuCategories theme={'dark'} variant={'filter'} />
        </List>
      </Collapse>
    </List>
  );
};

export default FilterNestedList;
