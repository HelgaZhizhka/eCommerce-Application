import { cn } from '../../../shared/lib/cn';

type Props = {
  value: number;
  min: number;
  max: number;
  label: string;
  className?: string;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<Props> = ({ value, onChange, min, max, label, className }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(parseInt(event.target.value, 10));
  };

  return (
    <label className={cn('relative inline-flex min-w-[80px] flex-col gap-1 p-2.5', className)}>
      <span className="text-sm text-gray">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        className="w-full rounded border border-gray px-3 py-2 outline-none focus:border-primary"
      />
    </label>
  );
};

export default NumberInput;
