import { sizes } from '../../../constants';
import { cn } from '../../../shared/lib/cn';

type Props = {
  className?: string;
  selected: string[];
  onChange: (updated: string[]) => void;
};

const FilterChip: React.FC<Props> = ({ selected, onChange }) => {
  const handleChipClick = (label: string): void => {
    const isAlreadySelected = selected.includes(label);
    onChange(isAlreadySelected ? selected.filter((size) => size !== label) : [...selected, label]);
  };

  return (
    <>
      <h3>Size</h3>
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={selected.includes(size)}
            onClick={(): void => handleChipClick(size)}
            className={cn(
              'rounded-2xl border px-3 py-1.5 text-sm font-semibold leading-tight transition-colors',
              selected.includes(size)
                ? 'border-primary bg-primary text-white'
                : 'border-gray text-primary hover:bg-primary/5'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterChip;
