import { currency } from '../../constants';

const SelectCurrency: React.FC = () => (
  <div className="flex items-end">
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
