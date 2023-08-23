import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { MenuCategories } from '../../MenuCategories';

const FilterNestedList: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = (): void => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse sx={{ pl: 8 }} in={open} timeout="auto" unmountOnExit>
        <MenuCategories theme={'dark'} variant={'filter'} />
      </Collapse>
    </List>
  );
};

export default FilterNestedList;
