import { MenuItem } from '@mui/material';

import { SortOption } from './SortList.enum';

type Props = {
  className?: string;
  value: SortOption;
  onSelect: (sort: SortOption) => void;
  handleMenuItemClick?: (sortOption: SortOption) => void;
};

const SortingList: React.FC<Props> = ({ value, onSelect, handleMenuItemClick }) => {
  const handleMenuItemClickWrapper = (sortEnumValue: SortOption): void => {
    onSelect(sortEnumValue);

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
              backgroundColor: sortEnumValue === value ? 'var(--spicy-orange)' : 'transparent',
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

export default SortingList;
