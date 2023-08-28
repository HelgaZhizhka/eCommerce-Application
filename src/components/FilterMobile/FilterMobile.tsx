import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';
import styles from './FilterMobile.module.scss';

type Props = {
  anchorElFilter: null | HTMLElement;
  handleCloseFilter: () => void;
};

const FilterMobile: React.FC<Props> = ({ anchorElFilter, handleCloseFilter }) => {
  const open = Boolean(anchorElFilter);

  return (
    <Popover
      open={open}
      anchorEl={anchorElFilter}
      onClose={handleCloseFilter}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{ '.MuiPopover-paper': { top: '0', left: '0', transform: 'none', width: '100vw' } }}
    >
      <div className={styles.root}>
        <IconButton
          aria-label="close"
          onClick={handleCloseFilter}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#888',
          }}
        >
          <CloseIcon />
        </IconButton>
        <FilterChip />
        <FilterColorCheckBox />
        <FilterPrice />
        <FilterReset mobile />
      </div>
    </Popover>
  );
};

export default FilterMobile;
