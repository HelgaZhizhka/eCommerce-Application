import React from 'react';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  mobile?: boolean;
};

const FilterReset: React.FC<Props> = ({ mobile }) => (
  <Button
    endIcon={<ClearIcon />}
    variant="outlined"
    sx={{ width: mobile ? '100%' : 'auto', borderColor: 'orange', color: 'orange', mt: 2 }}
  >
    Reset filters
  </Button>
);

export default FilterReset;
