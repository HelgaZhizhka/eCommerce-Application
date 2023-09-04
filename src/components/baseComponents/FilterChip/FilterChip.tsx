import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { productStore } from '../../../stores';

const CustomChip = styled(Chip)({
  borderRadius: '16px',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '1.2',
  border: '1px solid grey',
});

const sizes = ['xs', 's', 'm', 'l', 'xl', 'one-size'];

type Props = {
  className?: string;
  onChange?: (type?: string) => void;
};

const FilterChip: React.FC<Props> = ({ onChange }) => {
  const { updateFilterSize, filterSizes } = productStore;
  const handleChipClick = (label: string): void => {
    const isAlreadySelected = filterSizes.includes(label);
    const updatedSizes = isAlreadySelected ? filterSizes.filter((size) => size !== label) : [...filterSizes, label];

    updateFilterSize(updatedSizes);

    if (onChange) {
      onChange();
    }
  };

  return (
    <>
      <h3>Size</h3>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((size) => (
          <CustomChip
            key={size}
            label={size}
            color="primary"
            variant={filterSizes.includes(size) ? 'filled' : 'outlined'}
            onClick={(): void => handleChipClick(size)}
          />
        ))}
      </Box>
    </>
  );
};

export default observer(FilterChip);
