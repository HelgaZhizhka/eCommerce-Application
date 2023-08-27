import { observer } from 'mobx-react-lite';
import { MenuItem } from '@mui/material';

import { productStore } from '../../../stores';
import { SortOption } from './SortList.enum';

type Props = {
  handleMenuItemClick?: (sortOption: SortOption) => void;
  className?: string;
};

const SortingList: React.FC<Props> = ({ handleMenuItemClick }) => {
  const { sortState, setSortState } = productStore;

  const handleMenuItemClickWrapper = (sortEnumValue: SortOption): void => {
    setSortState(sortEnumValue);
    if (handleMenuItemClick) {
      handleMenuItemClick(sortEnumValue);
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
