import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FilterChip } from '../baseComponents/FilterChip';
import { FilterColorCheckBox } from '../baseComponents/FilterColorCheckBox';
import { FilterPrice } from '../baseComponents/FilterPrice';
import { FilterReset } from '../baseComponents/FilterReset';

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
