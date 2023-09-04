import { observer } from 'mobx-react-lite';
import { MenuItem } from '@mui/material';

import { productStore } from '../../../stores';
import { SortOption } from './SortList.enum';

type Props = {
  className?: string;
  handleMenuItemClick?: (sortOption: SortOption) => void;
  onChange?: (type?: string) => void;
};

const SortingList: React.FC<Props> = ({ handleMenuItemClick, onChange }) => {
  const { sortState, setSortState } = productStore;

  const handleMenuItemClickWrapper = (sortEnumValue: SortOption): void => {
    setSortState(sortEnumValue);

    if (handleMenuItemClick) {
      handleMenuItemClick(sortEnumValue);
    }

    if (onChange) {
      onChange('sort');
    }
  };

  return (
    <>
      {Object.values(SortOption).map((sort, index) => {
        const sortEnumValue = sort as SortOption;
        return (
          <MenuItem
            sx={{
              width: '100%',
              backgroundColor: sortEnumValue === sortState ? 'var(--spicy-orange)' : 'transparent',
            }}
            key={index}
            onClick={(): void => handleMenuItemClickWrapper(sortEnumValue)}
          >
            {sort}
          </MenuItem>
        );
      })}
    </>
  );
};

export default observer(SortingList);
