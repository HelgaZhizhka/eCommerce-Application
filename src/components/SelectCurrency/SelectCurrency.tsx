import { currency } from '../../constants';
import styles from './SelectCurrency.module.scss';

const SelectCurrency: React.FC = () => (
  <div className={styles.root}>
    <select
      defaultValue={currency.value}
      aria-label="Select currency"
      className="w-[50px] border-b border-gray bg-transparent outline-none focus:border-primary"
    >
      <option value={currency.value}>{currency.label}</option>
    </select>
  </div>
);

export default SelectCurrency;
