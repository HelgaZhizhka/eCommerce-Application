import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  mobile?: boolean;
  onClick?: () => void;
};

const FilterReset: React.FC<Props> = ({ mobile, onClick }) => (
  <Button
    endIcon={<ClearIcon />}
    variant="outlined"
    onClick={onClick}
    sx={{ width: mobile ? '100%' : 'auto', borderColor: 'orange', color: 'orange', mt: 2 }}
  >
    Reset filters
  </Button>
);

export default FilterReset;
