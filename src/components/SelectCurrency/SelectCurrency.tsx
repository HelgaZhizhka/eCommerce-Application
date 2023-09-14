import TextField from '@mui/material/TextField';

import { currencies } from '../../constants';
import styles from './SelectCurrency.module.scss';

const SelectCurrency: React.FC = () => (
  <div className={styles.root}>
    <span className={styles.value}>0.00</span>
    <TextField
      select
      label="Select"
      defaultValue={currencies[0].value}
      sx={{ width: '50px' }}
      SelectProps={{
        native: true,
      }}
      helperText=""
      variant="standard"
    >
      {currencies.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  </div>
);

export default SelectCurrency;
