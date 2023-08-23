import React from 'react';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

const FilterReset: React.FC = () => (
  <Button endIcon={<ClearIcon />} variant="outlined" sx={{ borderColor: 'orange', color: 'orange', mt: 2 }}>
    Reset filters
  </Button>
);

export default FilterReset;
