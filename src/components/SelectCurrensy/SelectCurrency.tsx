import classNames from 'classnames';
import TextField from '@mui/material/TextField';

import { currencies } from '../../constants';
import styles from './SelectCurrency.module.scss';

const SelectCurrency: React.FC = () => (
  <div className={classNames(styles.root)}>
    <span className={classNames(styles.value)}>0.00</span>
    <TextField
      select
      label="Select"
      defaultValue="EUR"
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
