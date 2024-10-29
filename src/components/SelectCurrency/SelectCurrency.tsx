import TextField from '@mui/material/TextField';

import { currency } from '../../constants';
import styles from './SelectCurrency.module.scss';

const SelectCurrency: React.FC = () => (
  <div className={styles.root}>
    <TextField
      select
      label="Select"
      defaultValue={currency.value}
      sx={{ width: '50px' }}
      SelectProps={{
        native: true,
      }}
      helperText=""
      variant="standard"
    >
      <option value={currency.value}>{currency.label}</option>
    </TextField>
  </div>
);

export default SelectCurrency;
